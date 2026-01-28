import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './pages/Marketplace';
import AdminPanel from './pages/AdminPanel';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
