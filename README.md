# 🚀 NovaPulse — Modern Trading & Investment Platform

A full-stack, modern financial trading and investment platform built with React, Node.js, and MongoDB. NovaPulse provides a seamless experience for managing your stock portfolio with real-time market data, order execution, and portfolio analytics.

![NovaPulse](https://img.shields.io/badge/NovaPulse-Modern%20Trading%20Platform-06b6d4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL%20Database-47a248?style=for-the-badge&logo=mongodb)

---

## 🎯 Vision

NovaPulse aims to democratize stock trading by providing a modern, intuitive platform with zero complexity. Designed with a premium light-themed interface, it brings a fresh perspective to investing through seamless navigation, real-time data integration, and powerful portfolio management tools.

---

## ✨ Key Features

### 📊 Trading Dashboard
- **Real-time Market Data**: Live price updates for NIFTY 50, SENSEX, and 20+ individual stocks
- **Dynamic Watchlist**: Monitor indices and stocks with instant price updates via WebSocket
- **Interactive Charts**: 
  - Line charts for P&L trend analysis (7-day view)
  - Doughnut charts for portfolio allocation visualization
  - Price flash indicators for sudden movements

### 💼 Portfolio Management
- **Holdings**: View all current stock holdings with average buy price, current price, and profit/loss percentage
- **Positions**: Track open positions and market exposure in real-time
- **Orders**: Complete order history with status tracking (COMPLETE, PENDING, REJECTED)
- **Funds Dashboard**: 
  - Available margin and used margin tracking
  - SPAN, delivery margin, and collateral calculations
  - Transaction history for deposits and withdrawals

### 🛒 Trading Features
- **Buy/Sell Orders**: Execute market and limit orders with instant feedback
- **Order Types**:
  - **Market Orders**: Execute at current market price
  - **Limit Orders**: Set custom price with automatic execution when conditions are met
- **Trading PIN Security**: Secure transactions with encrypted trading PIN protection
- **Automatic Holdings Update**: Real-time update of holdings and average price after each transaction

### 💰 Wallet & Payment Integration
- **Add Funds**: Secure Razorpay integration for seamless wallet top-ups
- **Withdraw Funds**: Quick withdrawal with trading PIN verification
- **Transaction History**: Complete ledger of all deposits and withdrawals
- **Margin Management**: Visual representation of used vs. available margin

### 👤 User Management
- **Secure Authentication**: JWT-based signup and login with session persistence
- **Profile Management**: 
  - Set/update trading PIN for security
  - View account information and email
  - Real-time user data synchronization
- **Error Boundary**: Graceful error handling for improved reliability

### 🎨 User Interface
- **Light Theme Design**: Premium, modern aesthetic with accessibility in mind
- **Responsive Layout**: Fully responsive design for desktop, tablet, and mobile
- **Intuitive Navigation**: Seamless flow from authentication to full trading dashboard
- **Real-time UI Updates**: Instant feedback for all user actions

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18.x
- **UI Library**: Bootstrap 5, Material UI
- **Charts & Visualization**: Chart.js, react-hot-toast
- **HTTP Client**: Axios
- **Styling**: Custom CSS3, responsive design patterns
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Payment Gateway**: Razorpay API
- **WebSocket**: Socket.io for real-time updates
- **Financial Data**: Angel One SmartAPI integration

### Database
- **Primary**: MongoDB (NoSQL)
- **ODM**: Mongoose
- **Collections**: Users, Holdings, Positions, Orders, Transactions

### Infrastructure & Tools
- **Version Control**: Git, GitHub
- **Environment Management**: dotenv
- **HTTP Body Parsing**: body-parser
- **CORS**: Express CORS middleware
- **Logging**: Console-based structured logging

---

## 📦 Project Structure

```
NovaPulse/
├── frontend/                 # Landing page & signup/login
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
│
├── dashboard/               # Trading dashboard & portfolio management
│   ├── public/
│   ├── src/
│   │   ├── components/      # Dashboard components
│   │   ├── api/            # API integration
│   │   ├── data/           # Static data
│   │   ├── hooks/          # Custom React hooks
│   │   └── styles/         # Component styles
│   └── package.json
│
├── backend/                # API server & business logic
│   ├── Routes/            # API endpoints
│   │   ├── AuthRoute.js   # Authentication & PIN management
│   │   └── PaymentRoute.js # Payment & withdrawal
│   ├── Controllers/       # Business logic
│   ├── Middlewares/       # Auth middleware
│   ├── model/            # MongoDB models
│   ├── schemas/          # Mongoose schemas
│   ├── services/         # Angel One API service
│   ├── util/             # Utility functions
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md             # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/prachi-mittal18/NovaPulse.git
cd NovaPulse
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Database
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/novapulse

# Server
PORT=3002
TOKEN_KEY=your_secret_jwt_key

# Frontend URLs (CORS)
FRONTEND_URLS=http://localhost:3000,http://localhost:3001

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Angel One Stock API (Optional for live market data)
ANGEL_ONE_API_KEY=your_angel_one_api_key
ANGEL_ONE_CLIENT_ID=your_client_id
ANGEL_ONE_PASSWORD=your_password
ANGEL_ONE_TOTP_SECRET=your_totp_secret
```

Start the backend server:

```bash
npm start
```

Backend runs on `http://localhost:3002`

### Step 3: Setup Frontend (Landing Page & Auth)

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:3002
```

Start the frontend:

```bash
npm start
```

Frontend runs on `http://localhost:3001`

### Step 4: Setup Dashboard

```bash
cd dashboard
npm install
```

Create a `.env` file in the `dashboard` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:3002
```

Start the dashboard:

```bash
npm start
```

Dashboard runs on `http://localhost:3000`

---

## 📖 API Endpoints

### Authentication Routes (`/`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /verify` - Verify JWT token and get user data
- `POST /logout` - User logout
- `POST /set-pin` - Set or update trading PIN

### Payment Routes (`/api/payments`)
- `POST /create-order` - Create Razorpay order for adding funds
- `POST /verify` - Verify payment and credit wallet
- `POST /withdraw` - Withdraw funds with PIN verification
- `GET /history` - Get transaction history

### Dashboard Routes
- `GET /allHoldings` - Get user's current holdings
- `GET /allPositions` - Get user's positions
- `GET /allOrders` - Get user's order history
- `GET /user/funds` - Get fund summary (balance, margin, etc.)
- `GET /user/pnl-trend` - Get 7-day P&L trend data
- `POST /newOrder` - Place a buy/sell order
- `GET /api/market-indices` - Get opening prices for indices

---

## 🔐 Security Features

### Authentication
- JWT-based stateless authentication
- HTTP-only cookies for token storage
- Session verification middleware

### Trading Security
- **Trading PIN**: Bcrypt-hashed PIN for sensitive transactions (buy/sell/withdraw)
- **PIN Validation**: String normalization and trimming to prevent type mismatches
- **Rate Limiting**: Built into financial transaction endpoints

### Data Validation
- Input sanitization for all API endpoints
- Safe financial math using scaled integers (cents/paise) to prevent floating-point errors
- Atomic database operations to prevent race conditions

---

## 🔄 Real-time Features

### WebSocket Integration
- **Socket.io** for real-time price updates
- Live price ticker for all watchlist stocks and indices
- Automatic price broadcast every 2 seconds
- Fallback simulation when live data is unavailable

### Angel One API Integration
- Real-time market data from NSE and BSE exchanges
- 20+ verified stock symbols with live token mapping
- Automatic price sync on startup and periodic updates
- Graceful degradation with deterministic fallback data

---

## 💡 Key Improvements & Fixes

### Recent Updates
- ✅ **Trading PIN Security**: Fixed bcrypt validation with proper string conversion and whitespace handling
- ✅ **Real-time Price Updates**: WebSocket integration for instant market data
- ✅ **Limit Orders**: Automatic execution when price conditions are met
- ✅ **Portfolio Analytics**: 7-day P&L trend visualization
- ✅ **Margin Calculations**: Accurate SPAN, delivery, and collateral tracking
- ✅ **Payment Integration**: Razorpay for secure fund additions
- ✅ **Error Handling**: Comprehensive error boundaries and user feedback

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication**
- [ ] User can sign up with email and password
- [ ] User can log in with valid credentials
- [ ] JWT token persists across page refreshes
- [ ] Logout clears session

**Trading**
- [ ] Buy order executes and updates holdings
- [ ] Sell order executes and reduces quantity
- [ ] Market orders execute at current price
- [ ] Limit orders stay pending until price conditions are met
- [ ] Trading PIN validation works correctly

**Payments**
- [ ] Can add funds via Razorpay
- [ ] Withdrawal requires correct trading PIN
- [ ] Transaction history shows deposits and withdrawals
- [ ] Margin calculations update after trades

**Real-time Data**
- [ ] Price updates reflect in watchlist within 2 seconds
- [ ] P&L values update based on current prices
- [ ] Chart data refreshes periodically

---

## 📊 Database Models

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  balance: Number,
  openingBalance: Number,
  tradingPin: String (hashed)
}
```

### Holding
```javascript
{
  user: ObjectId,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String
}
```

### Order
```javascript
{
  user: ObjectId,
  name: String,
  qty: Number,
  price: Number,
  mode: String (BUY/SELL),
  orderType: String (MARKET/LIMIT),
  status: String (COMPLETE/PENDING/REJECTED)
}
```

### Transaction
```javascript
{
  user: ObjectId,
  amount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: String (SUCCESS/WITHDRAWN)
}
```



## 📈 Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Memoization**: React useMemo/useCallback for expensive computations
- **Batch Updates**: Price broadcasts batched to single socket emit
- **Database Indexing**: Compound indexes on frequently queried fields
- **Safe Math**: Scaled integer (cents) arithmetic to prevent floating-point errors

---

## 🚀 Deployment

### Deploy Backend (Heroku/Railway/Render)
```bash
cd backend
git push heroku main
```

### Deploy Frontend & Dashboard (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy build/ folder

cd dashboard
npm run build
# Deploy build/ folder
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: mittalprachi18@gmail.com
- Check documentation in `/docs` folder

---

## 🙏 Acknowledgments

- **Angel One** for real-time market data API
- **Razorpay** for secure payment processing
- **React & Node.js communities** for excellent tools and libraries
- **MongoDB** for reliable NoSQL database

---

## 📅 Version History

### v1.0.0 (Current)
- ✅ Full trading dashboard
- ✅ Real-time price updates
- ✅ Buy/Sell orders (Market & Limit)
- ✅ Portfolio analytics
- ✅ Wallet & payment integration
- ✅ Trading PIN security
- ✅ Transaction history
- ✅ P&L tracking

### Roadmap (Future)
- [ ] Advanced order types (Stop-loss, OCO)
- [ ] Mobile app (React Native)
- [ ] Push notifications for price alerts
- [ ] Advanced charting (TradingView integration)
- [ ] Options trading
- [ ] Cryptocurrency integration
- [ ] Social trading features
- [ ] API for third-party integrations

---

**Made with ❤️ by Prachi Mittal**

Last updated: June 2024
