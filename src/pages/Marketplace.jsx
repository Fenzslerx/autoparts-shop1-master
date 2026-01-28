import React, { useState, useContext } from 'react';
import { Search, Phone, MapPin, ShoppingCart, Menu, X } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import headerImage from '../assets/image/476084784_1374712393879277_3937824656982508360_n.jpg';

const Marketplace = () => {
  const { products } = useContext(ProductContext);
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const filteredParts = products.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.carModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactLine = (partName) => {
    const message = encodeURIComponent(`สนใจสินค้า: ${partName}`);
    window.open(`https://line.me/R/ti/p/@autoparts?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white text-gray-800 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">ร้านอะไหล่รถยนต์มือสอง</h1>
                <p className="text-sm text-gray-600">คุณภาพดี ราคาถูก รับประกันสินค้า</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#products" className="hover:text-indigo-600 transition font-medium text-gray-700">สินค้า</a>
              <a href="#about" className="hover:text-indigo-600 transition font-medium text-gray-700">เกี่ยวกับเรา</a>
              <a href="#contact" className="hover:text-indigo-600 transition font-medium text-gray-700">ติดต่อ</a>
              <a 
                href="/admin" 
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition font-medium text-white"
              >
                Admin
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 space-y-2 bg-gray-100 rounded-lg p-4">
              <a href="#products" className="block py-2 hover:text-indigo-600 font-medium text-gray-700">สินค้า</a>
              <a href="#about" className="block py-2 hover:text-indigo-600 font-medium text-gray-700">เกี่ยวกับเรา</a>
              <a href="#contact" className="block py-2 hover:text-indigo-600 font-medium text-gray-700">ติดต่อ</a>
              <a href="/admin" className="block py-2 hover:text-indigo-600 font-medium text-gray-700">Admin</a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner with Image */}
      <div 
        className="relative py-12 md:py-24 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* Subtitle Badge */}
          <div className="mb-3 md:mb-6 inline-block">
            <span className="px-4 md:px-6 py-2 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 backdrop-blur-md rounded-full border border-indigo-300/30 text-indigo-100 font-semibold text-xs md:text-sm tracking-wider">
              ✨ ร้านอะไหล่รถยนต์ที่เชื่อถือได้
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 md:mb-6 text-white drop-shadow-2xl leading-tight">
            ช.โชคชัยรถยก อะไหล่รถยนต์
            <br />
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-100 mb-2 md:mb-3 font-semibold drop-shadow-lg max-w-3xl mx-auto">
            อะไหล่แท้ • มือสอง • คุณภาพดี • ราคาถูก
          </p>
          
          {/* Description */}
          <p className="text-sm md:text-lg lg:text-xl text-gray-200 drop-shadow-md mb-6 md:mb-10 max-w-2xl mx-auto font-light">
            รับประกันสินค้า ✓ ส่งทันที ✓ มีประกัน ✓ ลูกค้าเชื่อถือ
          </p>

          {/* CTA Button */}
          <a 
            href="#products"
            className="inline-block px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base md:text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            ดูสินค้าทั้งหมด →
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-xl py-8 -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="ค้นหาอะไหล่ หรือ รุ่นรถ เช่น Toyota Vios, ไฟหน้า..."
              className="w-full pl-14 pr-6 py-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12" id="products">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">สินค้าทั้งหมด</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium hidden md:block">{filteredParts.length} รายการ</span>
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-700 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-700 hover:text-gray-900'
                }`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
          {filteredParts.map((part) => (
            <div
              key={part._id}
              onClick={() => setSelectedPart(part)}
              className={`${
                viewMode === 'grid'
                  ? 'bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group'
                  : 'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group flex h-40'
              }`}
            >
              {viewMode === 'list' ? (
                <>
                  {/* List View */}
                  <div className="relative overflow-hidden w-40 flex-shrink-0">
                    <img
                      src={part.images[0]}
                      alt={part.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {part.images.length > 1 && (
                      <div className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {part.images.length} รูป
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition">
                            {part.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{part.carModel}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                            {part.condition}
                          </span>
                          <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                            {part.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs mb-2 line-clamp-1">{part.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ฿{part.price}
                        </span>
                        <p className="text-xs text-emerald-600 font-semibold">✓ {part.stock}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactLine(part.name);
                        }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 shadow-lg hover:shadow-xl whitespace-nowrap text-sm"
                      >
                        <Phone size={16} />
                        <span>LINE</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Grid View */}
                  <div className="relative overflow-hidden">
                    <img
                      src={part.images[0]}
                      alt={part.name}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {part.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {part.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === 0 ? 'bg-white' : 'bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {part.condition}
                    </div>
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {part.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                      {part.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{part.carModel}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{part.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ฿{part.price}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-600 font-semibold mb-4">✓ {part.stock}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactLine(part.name);
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Phone size={20} />
                      <span>สั่งซื้อผ่าน LINE</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredParts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl">ไม่พบสินค้าที่ค้นหา</p>
            <p className="text-gray-400 mt-2">ลองค้นหาด้วยคำอื่นดูนะครับ</p>
          </div>
        )}
      </main>

      {/* Contact Section */}
      <section className="text-white py-16 relative" 
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        id="contact"
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center">ติดต่อเรา</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                <div className="bg-indigo-500 p-3 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">ที่อยู่ร้าน</h3>
                  <p className="text-gray-200">
                    15/279 13 ซอย รัชดาภิเษก 36 แยก 9-3-4<br />
                    กรุงเทพมหานคร 10900
                  </p>
                </div>
              </div>
            
              <div className="flex items-start space-x-4 bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">โทรศัพท์</h3>
                  <p className="text-gray-200">02-123-4567<br/>089-999-9999</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                <div className="bg-green-400 p-3 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.771.039 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">LINE Official</h3>
                  <p className="text-gray-200">@autoparts (มี @ ด้านหน้า)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">เวลาทำการ</h3>
                <p className="text-lg">จันทร์ - เสาร์: 9:00 - 18:00 น.</p>
                <p className="text-purple-200 mt-2">อาทิตย์และวันหยุดนักขัตฤกษ์: ปิดทำการ</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-2 h-96 backdrop-blur-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1628.9149834985385!2d100.58434119943885!3d13.824948120684535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dd98183e34f%3A0xff5c3e0f2dfcfac8!2z4LiKLuC5guC4iuC4hOC4iuC4seC4ouC4reC4sOC5hOC4q-C4peC5iOC5gOC4geC5iOC4sg!5e0!3m2!1sth!2sth!4v1769587160651!5m2!1sth!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedPart && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPart(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Gallery */}
            <div className="relative bg-gray-900">
              <img
                src={selectedPart.images[selectedImageIndex]}
                alt={selectedPart.name}
                className="w-full h-80 object-cover"
              />
              
              {/* Navigation Buttons */}
              {selectedPart.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => 
                        prev === 0 ? selectedPart.images.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => 
                        prev === selectedPart.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedPart(null);
                  setSelectedImageIndex(0);
                }}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-2xl hover:bg-gray-100 transition"
              >
                <X size={24} className="text-gray-700" />
              </button>

              {/* Image Indicators */}
              {selectedPart.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {selectedPart.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === selectedImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                {selectedPart.condition}
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-sm text-indigo-600 font-bold mb-2 uppercase tracking-wide">
                {selectedPart.category}
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3">{selectedPart.name}</h2>
              <p className="text-xl text-gray-600 mb-6">{selectedPart.carModel}</p>
              
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ฿{selectedPart.price}
                </span>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800">รายละเอียดสินค้า</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedPart.description}</p>
              </div>

              <div className="mb-8">
                <span className="inline-block bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-2 rounded-full text-base font-bold">
                  ✓ {selectedPart.stock}
                </span>
              </div>

              <button
                onClick={() => handleContactLine(selectedPart.name)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 text-xl shadow-xl hover:shadow-2xl"
              >
                <Phone size={26} />
                <span>สั่งซื้อผ่าน LINE ทันที</span>
              </button>

              <p className="text-center text-gray-500 mt-5">
                💬 กดปุ่มด้านบนเพื่อติดต่อสอบถามและสั่งซื้อผ่าน LINE
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg">&copy; 2026 ร้านอะไหล่รถยนต์มือสอง - อะไหล่คุณภาพ ราคาย่อมเยา</p>
          <p className="text-sm mt-3 text-gray-400">เปิดทำการ จันทร์-เสาร์ 9:00-18:00 น. | รับประกันสินค้าทุกชิ้น</p>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
