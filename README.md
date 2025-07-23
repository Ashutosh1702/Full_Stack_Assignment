# Full Stack Todo Application

A modern, responsive full-stack todo application built with React.js frontend and Node.js/Express backend with MongoDB database.

## 🚀 Features

### Frontend Features
- **Modern React UI** with Tailwind CSS styling
- **User Authentication** (Register/Login)
- **Todo Management** with full CRUD operations
- **Real-time Form Validation** and feedback
- **Responsive Design** for mobile and desktop
- **Context API** for state management
- **Interactive Todo Form** with instant save confirmation
- **Protected Routes** with authentication

### Backend Features
- **RESTful API** with Express.js
- **JWT Authentication** for secure user sessions
- **MongoDB Integration** with Mongoose ODM
- **Password Hashing** with bcryptjs
- **Input Validation** with express-validator
- **CORS Support** for cross-origin requests
- **Environment Configuration** with dotenv

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI Library
- **React Router DOM 7.7.0** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Axios 1.10.0** - HTTP client for API calls
- **Vite 7.0.4** - Build tool and dev server
- **UUID 11.1.0** - Unique identifier generation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.4** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 3.0.2** - Password hashing
- **express-validator 7.2.1** - Input validation
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.0** - Environment variables

## 📁 Project Structure

```
full_Stack_Assignment/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── validators/      # Input validation schemas
│   ├── app.js          # Express app configuration
│   ├── server.js       # Server entry point
│   ├── package.json    # Backend dependencies
│   └── .env            # Environment variables
├── fronted/
│   ├── src/
│   │   ├── api/        # API service functions
│   │   ├── assets/     # Static assets
│   │   ├── components/ # Reusable React components
│   │   ├── context/    # React Context providers
│   │   ├── pages/      # Page components
│   │   ├── App.jsx     # Main App component
│   │   ├── main.jsx    # React entry point
│   │   └── router.jsx  # Route definitions
│   ├── public/         # Public assets
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd full_Stack_Assignment
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in backend directory
   touch .env
   ```
   
   Add the following environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../fronted
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev  # Development mode with nodemon
   # or
   npm start    # Production mode
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd fronted
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📱 Application Features

### Authentication
- **User Registration** with email and password
- **User Login** with JWT token generation
- **Protected Routes** requiring authentication
- **Automatic token validation** and refresh

### Todo Management
- **Create Todos** with title, description, due date, and category
- **View All Todos** in a responsive list format
- **Update Todo Status** (mark as complete/incomplete)
- **Delete Todos** with confirmation
- **Real-time Form Feedback** showing saved data immediately

### User Experience
- **Responsive Design** works on all device sizes
- **Modern UI** with Tailwind CSS components
- **Loading States** and error handling
- **Form Validation** with helpful error messages
- **Success Confirmations** for all actions

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Todo Routes
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🎨 UI Components

### Pages
- **Login Page** - User authentication
- **Register Page** - New user registration
- **Todo List** - Display all todos
- **Todo Form** - Create/edit todos with instant feedback
- **Dashboard** - User overview

### Components
- **Navbar** - Navigation with authentication status
- **TodoCard** - Individual todo display
- **ProtectedRoute** - Route protection wrapper
- **LoadingSpinner** - Loading state indicator

## 🔒 Security Features

- **JWT Authentication** for secure API access
- **Password Hashing** with bcryptjs
- **Input Validation** on both client and server
- **CORS Configuration** for secure cross-origin requests
- **Protected Routes** preventing unauthorized access

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Configure environment variables on your hosting platform
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created as a Full Stack Assignment demonstrating modern web development practices.

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Todo categories and filtering
- [ ] Due date notifications
- [ ] Todo sharing between users
- [ ] Dark mode toggle
- [ ] Drag and drop todo reordering
- [ ] Todo search functionality
- [ ] Email notifications for due dates

---

**Happy Coding! 🎉**
