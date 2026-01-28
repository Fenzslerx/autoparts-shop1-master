-- D1: Products table (สำหรับเก็บข้อมูลสินค้า)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  condition TEXT,
  carModel TEXT,
  images_json TEXT,
  description TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  createdAt INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_createdAt ON products (createdAt DESC);

