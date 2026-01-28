import React, { useState, useContext } from 'react';
import { Lock, User, LogOut, Plus, Edit2, Trash2, Save, X, Upload, Package, BarChart3 } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';

const AdminPanel = () => {
  const { products, setProducts, updateProduct, addProduct, deleteProduct } = useContext(ProductContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // ข้อมูล Admin (ในระบบจริงควรเก็บใน backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    condition: '',
    carModel: '',
    images: [],
    description: '',
    stock: '',
    category: ''
  });

  // Stats
  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.stock && p.stock > 0).length,
    lowStock: products.filter(p => p.stock && p.stock > 0 && p.stock < 5).length,
    totalValue: products.reduce((sum, p) => sum + (parseInt(p.price) || 0), 0)
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_CREDENTIALS.username &&
      loginForm.password === ADMIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  // Handle Add/Edit Product
  const handleSaveProduct = async () => {
    try {
      // Validate required fields
      if (!productForm.name || !productForm.price || !productForm.carModel) {
        alert('กรุณากรอกข้อมูลที่จำเป็น: ชื่อ, ราคา, รุ่นรถ');
        return;
      }

      const dataToSave = {
        ...productForm,
        price: parseInt(productForm.price) || 0,
        stock: parseInt(productForm.stock) || 0,
        images: Array.isArray(productForm.images) ? productForm.images : []
      };

      if (editingProduct) {
        // Update existing product
        await updateProduct({ 
          ...dataToSave, 
          _id: editingProduct._id, 
          createdAt: editingProduct.createdAt 
        });
      } else {
        // Add new product
        await addProduct(dataToSave);
      }
      
      // Reset form
      setProductForm({
        name: '',
        price: '',
        condition: '',
        carModel: '',
        images: [],
        description: '',
        stock: '',
        category: ''
      });
      setIsEditing(false);
      setEditingProduct(null);
      alert('บันทึกสินค้าสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message);
      console.error(error);
    }
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setIsEditing(true);
  };

  // Handle Delete
  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setShowDeleteConfirm(null);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-600 mt-2">ระบบจัดการร้านอะไหล่รถยนต์</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Lock size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-sm text-purple-100">ระบบจัดการร้านอะไหล่</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm transition font-medium"
              >
                กลับหน้าหลัก
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
              >
                <LogOut size={18} />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Package size={32} />
              <BarChart3 size={24} className="text-blue-200" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalProducts}</h3>
            <p className="text-blue-100">สินค้าทั้งหมด</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Package size={32} />
              <BarChart3 size={24} className="text-green-200" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.inStock}</h3>
            <p className="text-green-100">พร้อมส่ง</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Package size={32} />
              <BarChart3 size={24} className="text-orange-200" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.lowStock}</h3>
            <p className="text-orange-100">สต็อกต่ำ</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Package size={32} />
              <BarChart3 size={24} className="text-purple-200" />
            </div>
            <h3 className="text-3xl font-bold mb-1">฿{stats.totalValue.toLocaleString()}</h3>
            <p className="text-purple-100">มูลค่ารวม</p>
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">จัดการสินค้า</h2>
            <button
              onClick={() => {
                setIsEditing(true);
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  price: '',
                  condition: '',
                  carModel: '',
                  images: [],
                  description: '',
                  stock: '',
                  category: ''
                });
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-lg"
            >
              <Plus size={20} />
              <span>เพิ่มสินค้าใหม่</span>
            </button>
          </div>

          {/* Add/Edit Form */}
          {isEditing && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-indigo-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
                </h3>
                {editingProduct && (
                  <div className="text-sm text-gray-600">
                    📅 สร้างเมื่อ: {new Date(editingProduct.createdAt).toLocaleDateString('th-TH')}
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อสินค้า</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="เช่น กันชนหน้า Toyota Vios"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ราคา (บาท)</label>
                  <input
                    type="text"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="เช่น 3,500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รุ่นรถ</label>
                  <input
                    type="text"
                    value={productForm.carModel}
                    onChange={(e) => setProductForm({ ...productForm, carModel: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="เช่น Toyota Vios 2015-2018"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">สภาพ</label>
                  <input
                    type="text"
                    value={productForm.condition}
                    onChange={(e) => setProductForm({ ...productForm, condition: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="เช่น สภาพดี 80%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หมวดหมู่</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="">-- เลือกหมวดหมู่ --</option>
                    <option value="ชิ้นส่วนภายนอก">ชิ้นส่วนภายนอก</option>
                    <option value="ชิ้นส่วนภายใน">ชิ้นส่วนภายใน</option>
                    <option value="ไฟและไฟฟ้า">ไฟและไฟฟ้า</option>
                    <option value="ล้อและยาง">ล้อและยาง</option>
                    <option value="เครื่องยนต์และเกียร์">เครื่องยนต์และเกียร์</option>
                    <option value="กระจกและอุปกรณ์">กระจกและอุปกรณ์</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">สต็อก</label>
                  <input
                    type="text"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="เช่น มีสินค้าพร้อมส่ง หรือ เหลือ 2 ชิ้น"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL รูปภาพ (คั่นด้วยลูกน้ำ)</label>
                  <textarea
                    value={productForm.images.join(', ')}
                    onChange={(e) => setProductForm({ 
                      ...productForm, 
                      images: e.target.value.split(',').map(url => url.trim()).filter(url => url)
                    })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows="3"
                  />
                  <p className="text-xs text-gray-500 mt-2">กรอก URL รูปภาพหลายรูปโดยคั่นด้วยลูกน้ำ (,)</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รายละเอียด</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    rows="3"
                    placeholder="รายละเอียดสินค้า..."
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProduct}
                className="mt-6 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-lg"
              >
                <Save size={20} />
                <span>บันทึกสินค้า</span>
              </button>
            </div>
          )}

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">รูปภาพ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ชื่อสินค้า</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">รุ่นรถ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ราคา</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">สภาพ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">สต็อก</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">วันที่สร้าง</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <img
                          src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/64?text=No+Image'}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover shadow"
                        />
                        {product.images && product.images.length > 1 && (
                          <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {product.images.length}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{product.carModel}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-indigo-600">฿{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      📅 {new Date(product.createdAt).toLocaleDateString('th-TH')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition"
                          title="แก้ไข"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(product._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                          title="ลบ"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">ยืนยันการลบ</h3>
            <p className="text-gray-600 mb-6">คุณแน่ใจหรือไม่ที่จะลบสินค้านี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteProduct(showDeleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition"
              >
                ลบสินค้า
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
