# IP_PROJECT
# College Cart

> A modern e-commerce platform designed specifically for college students, featuring seamless shopping experience with real-time chat, AI-powered product search, and secure payment integration.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://college-cart.netlify.app)
[![GitHub](https://img.shields.io/badge/github-repo-blue.svg)](https://github.com/Harashporiya/IP_PROJECT)

---
## About The Project

College Cart is a specialized e-commerce platform built to address the unique needs of college students. It provides an intuitive shopping experience combined with cutting-edge AI technology for smart product discovery and real-time communication features.

### Why College Cart?

- **Student-Focused**: Curated products relevant to college life
- **AI-Powered Search**: Find products naturally using conversational queries
- **Real-Time Communication**: Chat directly with sellers
- **Secure Payments**: Safe transactions through Razorpay integration
- **Mobile Responsive**: Shop seamlessly on any device

### Built With

- React.js
- Node.js
- MongoDB
- Google Gemini AI
- Pinecone Vector Database
- LangChain

---

## Features

### Core Features

- **Product Catalog**
  - Browse diverse product categories
  - Advanced filtering and sorting
  - Detailed product pages with images
  - Product reviews and ratings

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Real-time price calculations
  - Save cart for later

- **Secure Checkout**
  - Razorpay payment integration
  - Multiple payment methods
  - Order confirmation emails
  - Transaction history

- **Real-Time Chat**
  - Socket.io powered messaging
  - Instant seller communication
  - Chat history persistence
  - Online/offline status indicators

### AI-Powered Features

- **Intelligent Chatbot**
  - Natural language product search
  - Conversational product recommendations
  - Detailed product information queries
  - Context-aware responses

- **Smart Search**
  - Semantic search capabilities
  - Vector-based similarity matching
  - Multi-language support
  - Typo-tolerant queries

### User Experience

- **Responsive Design**
  - Mobile-first approach
  - Tablet optimized
  - Desktop enhanced

- **Smooth Animations**
  - Framer Motion powered
  - Micro-interactions
  - Page transitions
  - Loading states

- **Email Notifications**
  - Order confirmations
  - Shipping updates
  - Payment receipts
  - Promotional offers

---

## AI Technology

The chatbot leverages state-of-the-art AI architecture:

### Architecture

User Query → LangChain Processing → Vector Embedding


### Components

1. **Google Gemini API**
   - Powers natural language understanding
   - Generates contextual responses
   - Handles complex queries

2. **Pinecone Vector Database**
   - Stores product embeddings
   - Fast similarity search
   - Scalable vector storage

3. **LangChain Framework**
   - Manages conversation chains
   - Context management
   - Prompt engineering

4. **RAG (Retrieval-Augmented Generation)**
   - Combines retrieval and generation
   - Accurate product information
   - Context-aware recommendations

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React.js | UI component library |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animation library |
| Redux Toolkit | State management |
| Axios | HTTP client |
| React Router | Navigation |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM library |
| Socket.io | Real-time communication |
| JWT | Authentication |

### AI & ML

| Technology | Purpose |
|------------|---------|
| Google Gemini API | Large language model |
| Pinecone | Vector database |
| LangChain | LLM framework |
| OpenAI Embeddings | Text embeddings |

### Integrations

| Service | Purpose |
|---------|---------|
| Razorpay | Payment gateway |
| Cloudinary | Image hosting |
| Nodemailer | Email service |
| Netlify | Frontend hosting |

---

## Prerequisites

Before installation, ensure you have:

Node.js >= 16.0.0
npm >= 8.0.0
MongoDB >= 5.0.0


### API Keys Required

- Google Gemini API Key
- Pinecone API Key
- Razorpay Account (Key ID & Secret)
- Cloudinary Account (Cloud Name, API Key, Secret)
- Email Service Credentials

---

## Installation

### 1. Clone Repository

git clone https://github.com/Harashporiya/IP_PROJECT.git
cd college-car


### 2. Install Dependencies

#### Backend Setup

cd Backend
npm install

#### Frontend Setup

cd client
npm install


### 3. Database Setup
#### Local Mongoose

mongod --dbpath /path/to/data/directory


#### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Get connection string
4. Whitelist your IP address

### 4. Configure Environment Variables

Create `.env` files (see [Environment Variables](#environment-variables) section)

### 5. Initialize Database

cd client
npm start

text

### 7. Access Application

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- API Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Environment Variables

### Backend `.env`

Server Configuration
NODE_ENV=development
PORT=5000

Database
MONGODB_URI=mongodb://localhost:27017/college-cart

OR for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college-cart
JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d

Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=college-cart-products

Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=College Cart noreply@collegecart.com

Socket.io
SOCKET_PORT=5001

Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

text

### Frontend `.env`

API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5001

Razorpay
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx

App Configuration
REACT_APP_NAME=College Cart
REACT_APP_VERSION=1.0.0

text

---

## Usage

### User Registration & Login

// Navigate to signup page
http://localhost:3000/signup

// Fill registration form
// Verify email
// Login with credentials

text

### Product Search

// Use search bar for keyword search
// Use AI chatbot for natural language queries

Example queries:
"I need a laptop for programming"
"Show me affordable backpacks"
"What books are good for data structures?"

text

### Shopping Flow

1. Browse products or use AI search
2. Add items to cart
3. Review cart
4. Proceed to checkout
5. Enter shipping details
6. Make payment via Razorpay
7. Receive confirmation email

### Chat with Sellers

1. Go to product page
2. Click "Chat with Seller"
3. Send message
4. Real-time communication
5. View chat history in profile

### AI Chatbot Usage

// Click chatbot icon (bottom right)
// Type natural language query
// Get intelligent responses with product recommendations
// Click recommended products to view details

text

---

## Project Structure

college-cart/
│
├── client/ # Frontend React application
│ ├── public/
│ │ ├── index.html
│ │ ├── favicon.ico
│ │ └── assets/
│ │
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── Cart.jsx
│ │ │ ├── Chatbot.jsx
│ │ │ └── ...
│ │ │
│ │ ├── pages/ # Page components
│ │ │ ├── Home.jsx
│ │ │ ├── Products.jsx
│ │ │ ├── ProductDetail.jsx
│ │ │ ├── Checkout.jsx
│ │ │ ├── Profile.jsx
│ │ │ └── ...
│ │ │
│ │ ├── redux/ # State management
│ │ │ ├── store.js
│ │ │ ├── slices/
│ │ │ │ ├── authSlice.js
│ │ │ │ ├── cartSlice.js
│ │ │ │ ├── productSlice.js
│ │ │ │ └── chatSlice.js
│ │ │
│ │ ├── hooks/ # Custom React hooks
│ │ │ ├── useAuth.js
│ │ │ ├── useCart.js
│ │ │ └── useSocket.js
│ │ │
│ │ ├── utils/ # Utility functions
│ │ │ ├── api.js
│ │ │ ├── constants.js
│ │ │ └── helpers.js
│ │ │
│ │ ├── styles/ # Global styles
│ │ │ └── index.css
│ │ │
│ │ ├── App.js # Main app component
│ │ └── index.js # Entry point
│ │
│ ├── package.json
│ └── tailwind.config.js
│
├── server/ # Backend Node.js application
│ ├── config/
│ │ ├── database.js # MongoDB configuration
│ │ ├── cloudinary.js # Cloudinary setup
│ │ ├── pinecone.js # Pinecone setup
│ │ └── gemini.js # Google Gemini setup
│ │
│ ├── models/ # MongoDB models
│ │ ├── User.js
│ │ ├── Product.js
│ │ ├── Order.js
│ │ ├── Chat.js
│ │ └── Review.js
│ │
│ ├── routes/ # API routes
│ │ ├── auth.routes.js
│ │ ├── product.routes.js
│ │ ├── order.routes.js
│ │ ├── chat.routes.js
│ │ ├── payment.routes.js
│ │ └── ai.routes.js
│ │
│ ├── controllers/ # Route controllers
│ │ ├── auth.controller.js
│ │ ├── product.controller.js
│ │ ├── order.controller.js
│ │ ├── chat.controller.js
│ │ ├── payment.controller.js
│ │ └── ai.controller.js
│ │
│ ├── middleware/ # Custom middleware
│ │ ├── auth.middleware.js
│ │ ├── error.middleware.js
│ │ ├── upload.middleware.js
│ │ └── validation.middleware.js
│ │
│ ├── services/ # Business logic
│ │ ├── ai.service.js # AI/ML operations
│ │ ├── payment.service.js # Payment processing
│ │ ├── email.service.js # Email operations
│ │ └── socket.service.js # Socket.io logic
│ │
│ ├── utils/ # Utility functions
│ │ ├── langchain.js # LangChain setup
│ │ ├── embeddings.js # Vector embeddings
│ │ ├── validators.js # Input validation
│ │ └── helpers.js # Helper functions
│ │
│ ├── seeds/ # Database seeders
│ │ └── productSeeder.js
│ │
│ ├── tests/ # Test files
│ │ ├── unit/
│ │ └── integration/
│ │
│ ├── server.js # Express server
│ └── package.json
│
├── .gitignore
├── README.md
├── LICENSE
└── package.json

text

---

## API Documentation

### Authentication Endpoints

#### Register User
POST /api/auth/register
Content-Type: application/json

{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}

text

#### Login User
POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "password123"
}

text

### Product Endpoints

#### Get All Products
GET /api/products?page=1&limit=10&category=electronics

text

#### Get Single Product
GET /api/products/:id

text

#### Search Products (AI)
POST /api/ai/search
Content-Type: application/json
Authorization: Bearer <token>

{
"query": "laptop for programming"
}

text

### Order Endpoints

#### Create Order
POST /api/orders
Content-Type: application/json
Authorization: Bearer <token>

{
"products": [
{
"productId": "123",
"quantity": 2
}
],
"shippingAddress": {
"street": "123 Main St",
"city": "Mumbai",
"state": "Maharashtra",
"zipCode": "400001"
}
}

text

#### Get User Orders
GET /api/orders
Authorization: Bearer <token>

text

### Payment Endpoints

#### Create Payment Order
POST /api/payment/create-order
Content-Type: application/json
Authorization: Bearer <token>

{
"amount": 5000,
"orderId": "order_123"
}

text

#### Verify Payment
POST /api/payment/verify
Content-Type: application/json
Authorization: Bearer <token>

{
"razorpay_order_id": "order_123",
"razorpay_payment_id": "pay_123",
"razorpay_signature": "signature_123"
}

text

### Chat Endpoints

#### Get User Chats
GET /api/chat
Authorization: Bearer <token>

text

#### Send Message
POST /api/chat/send
Content-Type: application/json
Authorization: Bearer <token>

{
"receiverId": "user_123",
"message": "Hello, is this product available?"
}

text

---

## Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Product Catalog
![Products](screenshots/products.png)

### AI Chatbot
![Chatbot](screenshots/chatbot.png)

### Shopping Cart
![Cart](screenshots/cart.png)

### Checkout Process
![Checkout](screenshots/checkout.png)

### Real-Time Chat
![Chat](screenshots/chat.png)

---

## Roadmap

- [x] User authentication & authorization
- [x] Product catalog with filtering
- [x] Shopping cart functionality
- [x] Razorpay payment integration
- [x] Real-time chat with Socket.io
- [x] AI chatbot with Google Gemini
- [x] Vector search with Pinecone
- [x] Email notifications
- [ ] Order tracking system
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Seller dashboard
- [ ] Analytics & reporting
- [ ] Social media integration
- [ ] Advanced recommendation system

See the [open issues](https://github.com/Harashporiya/college-cart/issues) for a full list of proposed features and known issues.

---

## Contributing

Contributions make the open source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
git clone https://github.com/Harashporiya/college-cart.git

text

2. **Create Feature Branch**
git checkout -b feature/AmazingFeature

text

3. **Commit Changes**
git commit -m 'Add some AmazingFeature'

text

4. **Push to Branch**
git push origin feature/AmazingFeature

text

5. **Open Pull Request**

### Contribution Guidelines

- Write clear commit messages
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

### Code Style

- Use ESLint for JavaScript
- Follow Airbnb style guide
- Use Prettier for formatting
- Write meaningful variable names

### Reporting Bugs

Use GitHub Issues to report bugs. Include:

- Clear title and description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

