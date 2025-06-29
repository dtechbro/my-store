# 🛒 Shopping Cart Application

This is a responsive shopping cart web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**, designed as part of a technical assessment.

> 🚀 [Live Demo](https://my-store-eight-psi.vercel.app/)  
> 📁 [GitHub Repository](https://github.com/dtechbro/my-store.git)

---

## 📌 Features

- ✅ Browse and view a list of products (fetched from a local JSON file).
- ✅ Add products to the cart.
- ✅ Update quantity of items in the cart (increase/decrease).
- ✅ Remove items from the cart.
- ✅ Apply a **coupon code** for a **13.2% discount**.
- ✅ Live total calculation (subtotal, discount, final amount).
- ✅ Checkout with a mock "receipt" modal.
- ✅ Input validation for coupon code using Regex.
- ✅ Error handling for:
  - Invalid coupon code
  - Double coupon application
  - Product fetch failures
- ✅ Responsive UI with intuitive design and feedback using `react-hot-toast`.

---

## 🧾 Coupon Details

Use this **coupon code** during checkout: POWERLABSx

- ✅ Case-sensitive validation
- ✅ One-time application per session

---

## 📂 Project Structure

.
├── app/
│ ├── cart/
│ │ └── page.tsx # Shopping cart page
│ ├── store/
│ │ └── cartStores.ts # Zustand cart store
│ └── page.tsx # Home page with products
├── public/
│ └── data/
│ └── products.json # Mock product data (acts as API)
├── styles/
│ └── globals.css
├── tailwind.config.js
├── next.config.js
└── ...

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dtechbro/my-store.git
cd my-store
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000 in your browser to see the app.

---

## 🧠 Tech Stack

- Next.js 14+
- React 19+
- Tailwind CSS
- Zustand (global state management)
- TypeScript
- Vercel for deployment
- React Hot Toast (toast notifications)

---

## 📃 License

This project is licensed for demonstration and review purposes.
