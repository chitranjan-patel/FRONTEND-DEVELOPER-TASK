# Fullstack Task Manager

A complete MERN Stack (MongoDB, Express, React, Node.js) application for managing tasks.

## 📁 Structure
- **backend**: Node.js & Express API connected to MongoDB.
- **frontend**: React application (Vite) consuming the API.

## 🚀 How to Run Locally

You need to run both the **backend** and **frontend** terminals simultaneously.

### 1. Backend Setup (API)
The backend handles data and database connections.

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment:
   - Rename `.env.example` to `.env`.
   - Update `MONGO_URI` if you are using a cloud database (MongoDB Atlas). Default is local.
4. Start the Server:
   ```bash
   npm run dev
   ```
   *Server will run at `http://localhost:5000`*

### 2. Frontend Setup (UI)
The frontend is the user interface.

1. Open a **new terminal** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the UI:
   ```bash
   npm run dev
   ```
   *App will run at `http://localhost:5173`*

## 🌐 Deployment Note
- **Frontend** can be deployed to netlify/vercel.
- **Backend** must be deployed to a Node.js hosting service (Render, Railway, Heroku).
- **Database** requires a MongoDB Atlas instance.

---
**Developed by:** Chitranjan Kumar Patel
