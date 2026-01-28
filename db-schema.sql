-- D1: Products table
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

-- D2: Files table (for storing images/files)
CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  filename TEXT,
  mime TEXT,
  data BYTEA,
  createdAt INTEGER NOT NULL
);

