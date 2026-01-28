export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    try {
      if (pathname.startsWith("/api/products")) {
        return await handleProducts(request, env);
      }

      if (pathname === "/api/files" && request.method === "POST") {
        return await handleFileUpload(request, env);
      }

      if (pathname.startsWith("/files/") && request.method === "GET") {
        return await handleFileServe(request, env);
      }

      // เสิร์ฟ static assets (ไฟล์ build จาก Vite) และ SPA routes
      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }

      return new Response("Not found", { status: 404 });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

async function handleProducts(request, env) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean); // ["api", "products", ":id?"]
  const id = parts[2];

  if (request.method === "GET" && !id) {
    // List all products
    const result = await env.DB_PRODUCTS.prepare(
      "SELECT id, name, price, condition, carModel, images_json, description, stock, category, createdAt FROM products ORDER BY createdAt DESC"
    ).all();

    const products = (result.results || []).map((row) => ({
      _id: row.id,
      name: row.name,
      price: row.price,
      condition: row.condition,
      carModel: row.carModel,
      images: row.images_json ? JSON.parse(row.images_json) : [],
      description: row.description,
      stock: row.stock,
      category: row.category,
      createdAt: row.createdAt,
    }));

    return json(products);
  }

  if (request.method === "POST" && !id) {
    const body = await readJson(request);
    const now = Date.now();
    const newId = crypto.randomUUID();

    const images = Array.isArray(body.images) ? body.images : [];

    await env.DB_PRODUCTS.prepare(
      `INSERT INTO products
        (id, name, price, condition, carModel, images_json, description, stock, category, createdAt)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
    )
      .bind(
        newId,
        body.name || "",
        Number(body.price) || 0,
        body.condition || "",
        body.carModel || "",
        JSON.stringify(images),
        body.description || "",
        Number(body.stock) || 0,
        body.category || "",
        now
      )
      .run();

    const product = {
      _id: newId,
      name: body.name || "",
      price: Number(body.price) || 0,
      condition: body.condition || "",
      carModel: body.carModel || "",
      images,
      description: body.description || "",
      stock: Number(body.stock) || 0,
      category: body.category || "",
      createdAt: now,
    };

    return json(product, 201);
  }

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  if (request.method === "PUT") {
    const body = await readJson(request);
    const images = Array.isArray(body.images) ? body.images : [];

    await env.DB_PRODUCTS.prepare(
      `UPDATE products
       SET name = ?2,
           price = ?3,
           condition = ?4,
           carModel = ?5,
           images_json = ?6,
           description = ?7,
           stock = ?8,
           category = ?9
       WHERE id = ?1`
    )
      .bind(
        id,
        body.name || "",
        Number(body.price) || 0,
        body.condition || "",
        body.carModel || "",
        JSON.stringify(images),
        body.description || "",
        Number(body.stock) || 0,
        body.category || ""
      )
      .run();

    const row = await env.DB_PRODUCTS.prepare(
      "SELECT id, name, price, condition, carModel, images_json, description, stock, category, createdAt FROM products WHERE id = ?1"
    )
      .bind(id)
      .first();

    if (!row) {
      return new Response("Not found", { status: 404 });
    }

    const product = {
      _id: row.id,
      name: row.name,
      price: row.price,
      condition: row.condition,
      carModel: row.carModel,
      images: row.images_json ? JSON.parse(row.images_json) : [],
      description: row.description,
      stock: row.stock,
      category: row.category,
      createdAt: row.createdAt,
    };

    return json(product);
  }

  if (request.method === "DELETE") {
    await env.DB_PRODUCTS.prepare("DELETE FROM products WHERE id = ?1").bind(id).run();
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
}

async function handleFileUpload(request, env) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return json({ error: "Expected multipart/form-data" }, 400);
  }
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return json({ error: "Missing file field" }, 400);
  }

  const id = crypto.randomUUID();
  const now = Date.now();

  const body = await file.arrayBuffer();
  const contentTypeFile = file.type || "application/octet-stream";
  const filename = file.name || "";

  // เก็บไฟล์ลง R2
  await env.R2_FILES.put(id, body, {
    httpMetadata: {
      contentType: contentTypeFile,
      contentDisposition: `inline; filename="${filename || id}"`,
    },
  });

  const url = new URL(request.url);
  url.pathname = `/files/${id}`;

  return json(
    {
      id,
      url: url.toString(),
      filename: file.name || "",
      mime: file.type || "application/octet-stream",
      createdAt: now,
    },
    201
  );
}

async function handleFileServe(request, env) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const object = await env.R2_FILES.get(id);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  const httpMeta = object.httpMetadata || {};
  headers.set("Content-Type", httpMeta.contentType || "application/octet-stream");
  if (httpMeta.contentDisposition) {
    headers.set("Content-Disposition", httpMeta.contentDisposition);
  }
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, { status: 200, headers });
}

async function readJson(request) {
  const text = await request.text();
  if (!text) return {};
  return JSON.parse(text);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

