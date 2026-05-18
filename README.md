# GlobalTNA Assessment 1.1

A full-stack web application built with a modern JavaScript tech stack featuring a Next.js frontend and Node.js/Express backend.

**Live Demo:** [https://globaltna-assessment1-1.vercel.app/login](https://globaltna-assessment1-1.vercel.app/login)

## 📋 Project Structure

```
globaltna-assessment1.1/
├── frontend/              # Next.js React application
├── backend/               # Node.js/Express API server
├── package.json           # Root dependencies
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) 14.2.35 - React-based framework for production
- **Library:** [React](https://react.dev/) 18.3.1
- **HTTP Client:** [Axios](https://axios-http.com/) 1.16.1
- **Styling:** 
  - [Tailwind CSS](https://tailwindcss.com/) 3.4.0
  - [PostCSS](https://postcss.org/) 8.4.31
  - [Autoprefixer](https://github.com/postcss/autoprefixer) 10.4.16

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) with ES Modules
- **Framework:** [Express.js](https://expressjs.com/) 5.2.1
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) 9.6.2
- **Authentication:** 
  - [JWT](https://jwt.io/) (jsonwebtoken 9.0.3)
  - [bcryptjs](https://github.com/dcodeIO/bcrypt.js) 3.0.3 for password hashing
- **Utilities:**
  - [CORS](https://github.com/expressjs/cors) 2.8.6
  - [Validator](https://github.com/validatorjs/validator.js) 13.15.35
  - [dotenv](https://github.com/motdotla/dotenv) 17.4.2
- **Development:** [Nodemon](https://nodemon.io/) 3.1.14 for hot reload

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sakunirajapaksha/globaltna-assessment1.1.git
   cd globaltna-assessment1.1
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

## 📦 Available Scripts

### Backend
```bash
cd backend

# Start production server
npm start

# Start development server with hot reload
npm run dev
```

### Frontend
```bash
cd frontend

# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Features

- **User Authentication:** JWT-based authentication with bcrypt password hashing
- **Data Validation:** Input validation using the validator library
- **CORS Support:** Configured for secure cross-origin requests
- **Modern UI:** Built with React and styled with Tailwind CSS
- **API Integration:** Axios for seamless backend communication
- **Database:** MongoDB with Mongoose ORM for robust data management

## 📝 Architecture

### Backend Architecture
- RESTful API endpoints
- Express middleware for CORS, body parsing, and authentication
- Mongoose models for MongoDB collections
- JWT token-based authorization

### Frontend Architecture
- Next.js pages and components
- Client-side routing with Next.js router
- API calls via Axios with proper error handling
- Responsive design with Tailwind CSS

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

**Frontend (.env.local)**
- `NEXT_PUBLIC_API_URL` - Backend API base URL

## 📚 API Documentation

The backend provides RESTful API endpoints. Key features:
- User registration and login
- JWT token validation
- Password encryption with bcryptjs
- Request validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

[sakunirajapaksha](https://github.com/sakunirajapaksha)

## 🔗 Links

- **Repository:** [https://github.com/sakunirajapaksha/globaltna-assessment1.1](https://github.com/sakunirajapaksha/globaltna-assessment1.1)
- **Live Demo:** [https://globaltna-assessment1-1.vercel.app/login](https://globaltna-assessment1-1.vercel.app/login)

---

**Last Updated:** May 2026
