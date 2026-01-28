import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const API_URL = 'http://localhost:5005/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching from:', API_URL);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('Products loaded:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert(`ไม่สามารถเชื่อมต่อ Backend ที่ ${API_URL}\n\nลองตรวจสอบ:\n1. Backend ทำงานอยู่\n2. MongoDB เชื่อมต่อสำเร็จ`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`${API_URL}/${updatedProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      setProducts(products.map(p => (p._id === data._id ? data : p)));
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts([...products, data]);
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        updateProduct,
        addProduct,
        deleteProduct,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
