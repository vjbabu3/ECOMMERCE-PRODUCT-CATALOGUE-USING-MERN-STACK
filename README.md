# MERN Ecommerce - ShopZone

ShopZone is a modern e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). It features a sleek frontend with Tailwind CSS and an integrated AI Shopping Assistant powered by the Gemini API.

## 🚀 Key Features

- **Product Browsing**: Dynamic product listings with category filtering and keyword search.
- **Shopping Cart**: Fully functional cart system (via React Context).
- **User Authentication**: Secure user registration and login.
- **Checkout Flow**: Simple and intuitive checkout process.
- **AI Shopping Assistant**: An intelligent chatbot that helps users find products based on their needs.
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router DOM, Axios/Fetch.
- **Backend**: Node.js, Express, Mongoose (MongoDB ORM), CORS, Compression.
- **Database**: MongoDB.
- **AI**: Google Gemini API (gemini-2.5-flash).

## 📂 Project Structure

- `client/`: React frontend application.
- `server/`: Node.js/Express API backend.
- `images/`: Static product image assets.
- `_backup/`: Backup files/versions.

## 🏁 Getting Started

### Prerequisites

- Node.js installed.
- MongoDB instance (local or Atlas).
- Gemini API Key.

### Installation

1. **Clone/Download** the repository.
2. **Setup Root Dependencies**:
   ```bash
   npm install
   ```
3. **Setup Client & Server**:
   ```bash
   npm run install-all
   ```

### Configuration

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Running the App

Start both the client and server concurrently:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.
