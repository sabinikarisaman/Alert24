# 🚢 Alert24 Smart Life Jacket – Booking Portal

A fully responsive checkout and booking system for **Alert24's Smart Life Jacket** technology, built as a **Frontend Internship Assignment**.

---

## 📋 Project Overview
This project is a responsive checkout page that simulates booking **Alert24's Smart Life Jacket System** — a life‑saving maritime safety technology.  
It demonstrates **modern frontend development practices** with strong emphasis on **UX, validation, animations, and dynamic pricing**.

---

## ✨ Key Features
- ✅ Complete **Alert24 Brand Integration**
- 📱 **Responsive Design** (Mobile‑first)
- 💰 **Dynamic Pricing Engine** (GST, discounts, safety fees)
- 🧪 **Client‑side Form Validation**
- 🚢 **Safety‑focused UX**
- 🎞️ **Framer Motion Animations**
- 🖐️ **Simulated Thumbprint Capture**
- 📊 **Progress Stepper**
- 🔔 **Toast Notifications**

---

## 🛠 Technology Stack

| Technology | Purpose |
|---------|--------|
| React 18 | Frontend framework |
| Framer Motion | Animations |
| React Icons | Icons |
| React Toastify | Notifications |
| date-fns | Date handling |
| CSS3 | Styling |
| HTML5 | Semantic markup |

---

## 📁 Project Structure
```text
alert24-checkout/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── TravellerForm.js
│   │   ├── PriceSummary.js
│   │   ├── DatePicker.js
│   │   ├── ThumbprintCapture.js
│   │   └── ProgressStepper.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm / yarn

### Installation
```bash
git clone https://github.com/your-username/alert24-checkout.git
cd alert24-checkout
npm install
npm start
```

Open 👉 **http://localhost:3000**

---

## 💰 Pricing Logic

```text
Base Fare        = Travelers × ₹1000
Life Jacket     = Travelers × ₹100
Safety Fee      = Travelers × ₹150
Service Charge  = Travelers × ₹50
GST             = Base Fare × 18%
Final Amount    = Subtotal − Discount
```

### Coupon Codes
| Code | Discount | Min Travelers |
|-----|---------|---------------|
| NEW10 | ₹100 | 2 |
| NEW20 | ₹200 | 4 |

---

## 🔒 Security & Privacy
- ❌ No real biometric data collected
- 🌐 Client‑side only
- 📘 Educational & demo purpose only
- 🔐 GDPR‑compliant messaging

---

## 📱 Responsive Breakpoints

| Device | Width |
|------|------|
| Mobile | < 768px |
| Tablet | 768–1024px |
| Desktop | > 1024px |

---

## 🚀 Deployment

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

### Netlify
```bash
netlify deploy --prod
```

### Vercel
```bash
vercel --prod
```

---

## 🎯 Learning Outcomes
- React Hooks & Component Architecture
- Responsive UI/UX Design
- Dynamic Forms & Validation
- Pricing Calculations
- Frontend‑only Security Simulation
- Git & Project Documentation

---

## 📄 License
Created for **Alert24 Frontend Internship Assignment**  
© Alert24 Safety Systems. All rights reserved.

---

## 👨‍💻 Author
**Your Name**  
- GitHub: https://github.com/sabinikarisaman   
- LinkedIn: https://www.linkedin.com/in/sabinikari-saman-706984257/
- Email: sabinikarisaman@gmail.com

---

## 📞 Contact
📧 support@alert24.co.in  
📞 1800‑ALERT24  
📍 Anokapalle, Andhra Pradesh, India
