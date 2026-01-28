import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'กันชนหน้า Toyota Vios',
      price: '3,500',
      condition: 'สภาพดี 80%',
      carModel: 'Toyota Vios 2015-2018',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
      description: 'กันชนหน้าแท้จากรถศูนย์ ไม่มีรอยแตก สีเดิมจากโรงงาน',
      stock: 'มีสินค้าพร้อมส่ง',
      category: 'ชิ้นส่วนภายนอก',
      createdAt: '2026-01-15'
    },
    {
      id: 2,
      name: 'ไฟหน้า Honda Civic',
      price: '4,200',
      condition: 'สภาพดี 90%',
      carModel: 'Honda Civic 2016-2020',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
      description: 'ไฟหน้าซ้าย ใสสะอาด ไม่มีรอยร้าว ทำงานปกติ',
      stock: 'เหลือ 2 ชิ้น',
      category: 'ไฟและไฟฟ้า',
      createdAt: '2026-01-20'
    },
    {
      id: 3,
      name: 'ล้อแม็ก 17 นิ้ว',
      price: '8,500',
      condition: 'สภาพดีมาก 95%',
      carModel: 'รถทั่วไป PCD 5x114.3',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      description: 'ล้อแม็กแท้ 17 นิ้ว ชุดละ 4 วง ไม่บิด ไม่ผิดรูป พร้อมใช้งาน',
      stock: 'มีสินค้าพร้อมส่ง',
      category: 'ล้อและยาง',
      createdAt: '2026-01-22'
    },
    {
      id: 4,
      name: 'เบาะหน้า Mazda 3',
      price: '5,800',
      condition: 'สภาพดี 85%',
      carModel: 'Mazda 3 2014-2017',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
      description: 'เบาะคู่หน้า หนังแท้ ไม่ขาด ไม่ฉีก กลไกทำงานปกติ',
      stock: 'เหลือ 1 ชุด',
      category: 'ชิ้นส่วนภายใน',
      createdAt: '2026-01-23'
    },
    {
      id: 5,
      name: 'กระจกมองข้าง Isuzu D-Max',
      price: '1,800',
      condition: 'สภาพดี 90%',
      carModel: 'Isuzu D-Max 2012-2019',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      description: 'กระจกมองข้างขวา ไฟเลี้ยวทำงาน กระจกไม่แตก',
      stock: 'มีสินค้าพร้อมส่ง',
      category: 'กระจกและอุปกรณ์',
      createdAt: '2026-01-24'
    },
    {
      id: 6,
      name: 'เครื่องยนต์ 1NZ Toyota',
      price: '28,000',
      condition: 'ใช้งานได้ดี',
      carModel: 'Toyota Vios/Yaris 1.5L',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop',
      description: 'เครื่องยนต์ 1NZ ไมล์แท้ 80,000 กม. ทดสอบแล้วทำงานปกติ',
      stock: 'เหลือ 1 ตัว',
      category: 'เครื่องยนต์และเกียร์',
      createdAt: '2026-01-25'
    }
  ]);

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, product]);
    return product;
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateProduct, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
