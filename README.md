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

git clone https://github.com/Harashporiya/college-cart.git
cd college-car


### 2. Install Dependencies

#### Backend Setup
