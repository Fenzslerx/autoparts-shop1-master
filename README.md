# 🚗 ระบบร้านอะไหล่รถยนต์มือสอง

เว็บไซต์ร้านจำหน่ายอะไหล่รถยนต์มือสอง พร้อมระบบจัดการ Admin Panel

## ✨ คุณสมบัติ

### หน้าหลัก (Marketplace)
- 🔍 ระบบค้นหาอะไหล่
- 📱 Responsive Design รองรับทุกขนาดหน้าจอ
- 🛒 แสดงรายละเอียดสินค้า
- 💬 ติดต่อผ่าน LINE Official
- 🗺️ แผนที่ Google Maps
- 🎨 UI/UX ทันสมัย พร้อม Gradient สวยงาม

### Admin Panel
- 🔐 ระบบ Login
- 📊 Dashboard สรุปยอดสินค้า
- ➕ เพิ่ม/แก้ไข/ลบ สินค้า
- 📋 ตารางจัดการสินค้า
- 🎯 จัดการหมวดหมู่สินค้า

## 🚀 การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโปรเจค Development Mode
```bash
npm run dev
```
เว็บไซต์จะเปิดที่ `http://localhost:3000`

### 3. Build สำหรับ Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 🔑 ข้อมูล Login Admin

- **Username:** admin
- **Password:** admin123

## 📁 โครงสร้างโปรเจค

```
autoparts-shop/
├── public/                 # ไฟล์ static
├── src/
│   ├── components/        # React components
│   ├── pages/            # หน้าต่างๆ
│   │   ├── Marketplace.jsx   # หน้าหลัก
│   │   └── AdminPanel.jsx    # หน้า Admin
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Tailwind CSS
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## 🛠️ เทคโนโลยีที่ใช้

- **Vite** - Build tool
- **React 18** - UI Library
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **PostCSS & Autoprefixer** - CSS processing

## 📱 หน้าเว็บไซต์

1. **หน้าหลัก (/)** - แสดงสินค้าอะไหล่
2. **Admin Panel (/admin)** - จัดการสินค้า

## 🎨 ฟีเจอร์พิเศษ

- ✅ Gradient สวยงาม
- ✅ Responsive Design
- ✅ Modal สำหรับรายละเอียดสินค้า
- ✅ ระบบค้นหาแบบ Real-time
- ✅ แสดงสถานะสต็อกสินค้า
- ✅ ลิงก์ไปยัง LINE Official
- ✅ Google Maps Integration

## 📝 หมายเหตุ

- ในระบบจริงควรใช้ Backend API สำหรับจัดการข้อมูล
- ควรเพิ่มระบบ Authentication ที่ปลอดภัยกว่า
- สามารถต่อยอดด้วย Database (MongoDB, PostgreSQL, etc.)
- สามารถเพิ่ม Payment Gateway สำหรับระบบชำระเงิน

## 🔄 การพัฒนาต่อ

- เพิ่ม Backend API
- เชื่อมต่อ Database
- เพิ่มระบบ Upload รูปภาพ
- เพิ่มระบบ Cart และ Checkout
- เพิ่มระบบจัดการ Order
- เพิ่ม Email Notification

## 📞 ติดต่อ

หากมีคำถามหรือข้อเสนอแนะ สามารถติดต่อได้ที่:
- LINE Official: @autoparts
- โทรศัพท์: 02-123-4567

---

Made with ❤️ using Vite + React + Tailwind CSS
