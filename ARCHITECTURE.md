# Technical Architecture - ShopZone

This document provides a detailed overview of the technical architecture, API endpoints, and data models of the ShopZone e-commerce application.

## 📁 Directory Structure

```text
d:\building\
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components (Header, Footer, AIChatbot)
│   │   ├── context/     # React Context for state management (Cart, Auth)
│   │   ├── pages/       # Page components (HomePage, ProductDetails, Cart, etc.)
│   │   ├── assets/      # Static assets and icons
│   │   ├── App.jsx      # Main application entry and routing
│   │   └── main.jsx     # Vite entry point
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/              # Express API backend
│   ├── config/          # Database configuration (MongoDB)
│   ├── controllers/     # Route logic/handlers (Product, User, Order, AI)
│   ├── models/          # Mongoose data models (Product, User, Order, Category)
│   ├── routes/          # API route definitions
│   ├── data/            # Seed data (products.js)
│   ├── middleware/      # Custom middleware (auth, error handled)
│   ├── utils/           # Utility functions (jwt tokens)
│   ├── seeder.js        # Script to seed database with initial data
│   └── index.js         # API entry point
├── images/              # Static product images served by Express
└── _backup/             # Project backups
```

## 🔌 API Documentation

All API routes are prefixed with `/api`.

### 🛍️ Products
- `GET /api/products`: Fetch all products (supports `keyword` and `category` query params).
- `GET /api/products/:id`: Fetch details for a specific product.

### 👤 Users
- `POST /api/users/login`: Authenticate user and get token.
- `POST /api/users/register`: Register a new user.
- `GET /api/users/profile`: Get authenticated user's profile (Requires Auth).

### 📦 Orders
- `POST /api/orders`: Create a new order (Requires Auth).
- `GET /api/orders/:id`: Get order details (Requires Auth).
- `GET /api/orders/myorders`: Get orders for the logged-in user (Requires Auth).

### 🤖 AI Shopping Assistant
- `POST /api/ai/chat`: Send a message to the AI assistant for product recommendations and shopping queries.

## 💾 Data Models

### Product
- `name` (String): Product title.
- `image` (String): Path to the product image.
- `brand` (String): Product brand name.
- `category` (ObjectId): Reference to the Category model.
- `description` (String): Detailed product description.
- `price` (Number): Product price.
- `countInStock` (Number): Quantity available.

### User
- `name` (String): User's full name.
- `email` (String): Unique email address.
- `password` (String): Hashed password.
- `isAdmin` (Boolean): Administrative rights.

### Order
- `user` (ObjectId): Reference to the User who placed the order.
- `orderItems` (Array): List of products, quantities, and prices.
- `shippingAddress` (Object): Address details.
- `paymentMethod` (String): Payment method used.
- `totalPrice` (Number): Final order amount.
- `isPaid` / `isDelivered` (Boolean): Status flags.

## 🤖 AI Integration (Gemini)

The AI Shopping Assistant is integrated using the **Google Gemini API** (`gemini-2.5-flash`). It uses a specific system prompt to provide answers based on the store's current product inventory.

**Logic**:
1. The backend fetches all current products from the database.
2. It constructs a context-aware prompt for Gemini.
3. Gemini processes the user's question and returns a filtered/recommended product list.
