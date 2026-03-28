# Azurelle

Full-stack MERN e-commerce platform for browsing curated fashion collections, managing carts and checkout, and operating an admin dashboard for users, products, and orders.

## Overview

Azurelle is a portfolio-grade commerce application built with a React frontend and an Express/MongoDB backend. The project covers the core flows expected in a modern online store: authentication, product discovery, cart management, checkout orchestration, order history, file uploads, newsletter subscriptions, and admin operations.

The codebase is organized as a split frontend/backend application, with Redux Toolkit handling client state and Express route modules exposing REST-style APIs behind auth middleware and role-based access control.

## Key Features

- User registration, login, JWT-based profile access, and role-aware session handling
- Product catalog with collection, category, size, color, price, brand, and search filtering
- Product detail pages with similar-product recommendations, new arrivals, and best-seller endpoints
- Cart management for both guest and authenticated users, including guest-cart merge after login
- Checkout flow with payment state updates and order finalization
- Order history and order detail views for authenticated users
- Admin panels for user management, product management, and order management
- Cloudinary-backed image upload endpoint for media handling
- Newsletter subscription endpoint for capturing email subscribers
- Redux Toolkit slices for auth, products, and cart state management on the frontend

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS
- Sonner
- Vite

### Backend

- Node.js
- Express.js
- Mongoose
- JWT (`jsonwebtoken`)
- bcryptjs
- multer
- Cloudinary
- streamifier

### Database

- MongoDB

### Authentication

- JWT bearer tokens
- Custom `protect` and `admin` middleware

### Tooling

- Nodemon
- ESLint
- npm

## Project Structure

```text
full_mern_stack_Ecommerce_Project-main/
+-- Backend/
¦   +-- config/
¦   ¦   +-- db.js
¦   +-- data/
¦   ¦   +-- products.js
¦   +-- middleware/
¦   ¦   +-- authMiddleware.js
¦   +-- models/
¦   ¦   +-- Cart.js
¦   ¦   +-- Checkout.js
¦   ¦   +-- Order.js
¦   ¦   +-- Product.js
¦   ¦   +-- Subscriber.js
¦   ¦   +-- User.js
¦   +-- routes/
¦   ¦   +-- adminOrderRoutes.js
¦   ¦   +-- adminRoutes.js
¦   ¦   +-- cartRouter.js
¦   ¦   +-- checkoutRoutes.js
¦   ¦   +-- orderRouter.js
¦   ¦   +-- productAdminRoutes.js
¦   ¦   +-- productRoutes.js
¦   ¦   +-- subscriberRoutes.js
¦   ¦   +-- uploadRoutes.js
¦   ¦   +-- userRoutes.js
¦   +-- .env.example
¦   +-- package.json
¦   +-- seeder.js
¦   +-- Server.js
¦   +-- vercel.json
+-- Frontend/
¦   +-- public/
¦   ¦   +-- azurelle_favicon.svg
¦   ¦   +-- azurelle_logo.svg
¦   ¦   +-- azurelle_nav_logo.svg
¦   ¦   +-- index.html
¦   +-- src/
¦   ¦   +-- assets/
¦   ¦   ¦   +-- Azurelle.webp
¦   ¦   ¦   +-- featured.webp
¦   ¦   ¦   +-- login.webp
¦   ¦   ¦   +-- mens-collection.jpg
¦   ¦   ¦   +-- mens-collection.webp
¦   ¦   ¦   +-- rabbit-hero.webp
¦   ¦   ¦   +-- register.webp
¦   ¦   ¦   +-- womens-collection.webp
¦   ¦   ¦   +-- website screenshots...
¦   ¦   +-- components/
¦   ¦   ¦   +-- Admin/
¦   ¦   ¦   ¦   +-- AdminLayout.jsx
¦   ¦   ¦   ¦   +-- AdminSidebar.jsx
¦   ¦   ¦   ¦   +-- EditProductPage.jsx
¦   ¦   ¦   ¦   +-- OrderManagement.jsx
¦   ¦   ¦   ¦   +-- ProductManagement.jsx
¦   ¦   ¦   ¦   +-- UserManagement.jsx
¦   ¦   ¦   +-- Cart/
¦   ¦   ¦   ¦   +-- CartContents.jsx
¦   ¦   ¦   ¦   +-- Checkout.jsx
¦   ¦   ¦   ¦   +-- PayPalButton.jsx
¦   ¦   ¦   +-- Common/
¦   ¦   ¦   ¦   +-- Footer.jsx
¦   ¦   ¦   ¦   +-- Header.jsx
¦   ¦   ¦   ¦   +-- Navbar.jsx
¦   ¦   ¦   ¦   +-- ProtectedRouter.jsx
¦   ¦   ¦   ¦   +-- SearchBar.jsx
¦   ¦   ¦   +-- Layout/
¦   ¦   ¦   ¦   +-- CartDrawer.jsx
¦   ¦   ¦   ¦   +-- Hero.jsx
¦   ¦   ¦   ¦   +-- Topbar.jsx
¦   ¦   ¦   ¦   +-- UserLayout.jsx
¦   ¦   ¦   +-- Products/
¦   ¦   ¦       +-- FeaturedCollection.jsx
¦   ¦   ¦       +-- FeaturesSection.jsx
¦   ¦   ¦       +-- FilterSidebar.jsx
¦   ¦   ¦       +-- GenderCollectionSection.jsx
¦   ¦   ¦       +-- MyOrderPage.jsx
¦   ¦   ¦       +-- NewArrivals.jsx
¦   ¦   ¦       +-- ProductDetails.jsx
¦   ¦   ¦       +-- ProductGrid.jsx
¦   ¦   ¦       +-- SortOptions.jsx
¦   ¦   +-- pages/
¦   ¦   ¦   +-- AdminHomePage.jsx
¦   ¦   ¦   +-- CollectionPages.jsx
¦   ¦   ¦   +-- Home.jsx
¦   ¦   ¦   +-- Login.jsx
¦   ¦   ¦   +-- OrderConfirmationPage.jsx
¦   ¦   ¦   +-- OrderDetailsPage.jsx
¦   ¦   ¦   +-- Profile.jsx
¦   ¦   ¦   +-- Register.jsx
¦   ¦   +-- redux/
¦   ¦   ¦   +-- slices/
¦   ¦   ¦   ¦   +-- adminOrderSlice.js
¦   ¦   ¦   ¦   +-- adminProductSlice.js
¦   ¦   ¦   ¦   +-- adminSlice.js
¦   ¦   ¦   ¦   +-- authSlice.js
¦   ¦   ¦   ¦   +-- cartSlice.js
¦   ¦   ¦   ¦   +-- checkoutSlice.js
¦   ¦   ¦   ¦   +-- orderSlice.js
¦   ¦   ¦   ¦   +-- productsSlice.js
¦   ¦   ¦   +-- store.js
¦   ¦   +-- App.css
¦   ¦   +-- App.jsx
¦   ¦   +-- index.css
¦   ¦   +-- main.jsx
¦   +-- .env.example
¦   +-- eslint.config.js
¦   +-- index.html
¦   +-- package.json
¦   +-- tailwind.config.js
¦   +-- vite.config.js
+-- README.md
```

## Architecture & Design

### Frontend

- [`Frontend/src/App.jsx`](/abs/path/c:/Users/KIIT0001/Desktop/full_mern_stack_Ecommerce_Project-main/Frontend/src/App.jsx) defines the main route tree for public storefront pages and `/admin` routes.
- [`Frontend/src/redux/store.js`](/abs/path/c:/Users/KIIT0001/Desktop/full_mern_stack_Ecommerce_Project-main/Frontend/src/redux/store.js) wires Redux Toolkit reducers for `auth`, `products`, and `cart`.
- Redux slices encapsulate async API calls and local state transitions for authentication, catalog data, and cart state.
- UI is broken into reusable domain-focused components for catalog, cart, admin, and layout concerns.

### Backend

- [`Backend/Server.js`](/abs/path/c:/Users/KIIT0001/Desktop/full_mern_stack_Ecommerce_Project-main/Backend/Server.js) bootstraps Express, loads environment variables, connects MongoDB, and mounts route modules.
- Route modules are separated by domain: auth/users, products, cart, checkout, orders, upload, subscribers, and admin operations.
- Mongoose models define the persistence layer for users, products, carts, checkout sessions, orders, and subscribers.
- [`Backend/middleware/authMiddleware.js`](/abs/path/c:/Users/KIIT0001/Desktop/full_mern_stack_Ecommerce_Project-main/Backend/middleware/authMiddleware.js) enforces JWT authentication and admin-only access for protected endpoints.

### System Flow

1. The frontend dispatches Redux Toolkit thunks using Axios.
2. Requests hit Express route modules under `/api/...`.
3. Protected/admin routes validate tokens and roles through middleware.
4. Business logic reads or writes MongoDB through Mongoose models.
5. Responses update Redux state and drive the React UI.

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Aniketsahoo228/scalable-mern-commerce-platform.git
cd scalable-mern-commerce-platform
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 4. Configure environment variables

Create the following files:

- `Backend/.env`
- `Frontend/.env`

### 5. Start the backend

```bash
cd Backend
npm run dev
```

### 6. Start the frontend

```bash
cd Frontend
npm run dev
```

### 7. Optional: seed sample products

```bash
cd Backend
npm run seed
```

## Environment Variables

### Backend `.env`

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend `.env`

```env
VITE_BACKEND_URL=http://localhost:9000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Exact Project Paths

These are the exact project folders used in this repository:

- Repository root: `full_mern_stack_Ecommerce_Project-main/`
- Backend app path: `full_mern_stack_Ecommerce_Project-main/Backend`
- Frontend app path: `full_mern_stack_Ecommerce_Project-main/Frontend`
- Backend entry file: `Backend/Server.js`
- Frontend entry file: `Frontend/src/main.jsx`
- Frontend route file: `Frontend/src/App.jsx`

## Deployment Paths

Keep the older setup steps above as-is. For deployment, use these exact root paths:

### Vercel

- Project root directory: `Frontend`
- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

### Render

- Service type: `Web Service`
- Root directory: `Backend`
- Install command: `npm install`
- Start command: `npm start`
- Runtime entry: `Backend/Server.js`

## Environment Secrets By Service

Use the following environment variables in deployment dashboards.

### Render secrets for Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=10000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Vercel secrets for Frontend

```env
VITE_BACKEND_URL=https://your-render-backend.onrender.com
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Secret usage notes

- `VITE_BACKEND_URL` must point to the live backend URL after Render deployment.
- `JWT_SECRET` should be a long random string and must not be committed.
- `MONGO_URI` should be your production MongoDB connection string.
- Cloudinary keys are required for image upload routes.
- `PORT` is usually provided by Render automatically, but keeping it set is safe.

## Frontend Page Routes

The main frontend pages currently live under the following routes:

| Page | Route |
|---|---|
| Home | `/` |
| Login | `/login` |
| Register | `/register` |
| Profile | `/profile` |
| Collections | `/collections/all` |
| Product Details | `/product/:id` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Order Confirmation | `/order-confirmation` |
| My Orders | `/my-orders` |
| Order Details | `/order/:id` |
| Admin Dashboard | `/admin` |
| Admin Users | `/admin/users` |
| Admin Products | `/admin/products` |
| Admin Orders | `/admin/orders` |

## Deployment Order

For the smoothest production setup:

1. Deploy `Backend` on Render.
2. Copy the live Render backend URL.
3. Add that URL as `VITE_BACKEND_URL` in Vercel.
4. Deploy `Frontend` on Vercel.

## Website Pages

### Home Page

#### Hero Section

![Home Page](Frontend/src/assets/Screenshot%202026-03-28%20094822.png)

#### Collection Preview Section

![Collections Page](Frontend/src/assets/Screenshot%202026-03-28%20095054.png)

#### Featured Product Section

![Product Details Page](Frontend/src/assets/Screenshot%202026-03-28%20095115.png)

#### Checkout Preview Section

![Checkout Page](Frontend/src/assets/Screenshot%202026-03-28%20095209.png)

#### Order Preview Section

![Order Details Page](Frontend/src/assets/Screenshot%202026-03-28%20095455.png)

#### Profile Preview Section

![Admin Profile Page](Frontend/src/assets/Screenshot%202026-03-28%20095223.png)

#### Additional Order Preview Section

![Admin Order Details Page](Frontend/src/assets/Screenshot%202026-03-28%20095953.png)

### Admin Pages

#### Admin Dashboard

![Admin Dashboard](Frontend/src/assets/Screenshot%202026-03-28%20095256.png)

#### User Management

![User Management](Frontend/src/assets/Screenshot%202026-03-28%20095238.png)

#### Product Management

![Product Management](Frontend/src/assets/Screenshot%202026-03-28%20095319.png)

#### Edit Product

![Edit Product](Frontend/src/assets/Screenshot%202026-03-28%20095336.png)

#### Order Management

![Order Management](Frontend/src/assets/Screenshot%202026-03-28%20095342.png)

## Usage

### Storefront

- Register a new account or log in with an existing account.
- Browse the catalog from the homepage, collection pages, and product detail pages.
- Filter products by category, size, color, brand, price range, and search terms.
- Add products to the cart as a guest or authenticated user.
- Continue to checkout, complete payment flow, and finalize the order.
- View personal order history and order detail pages.

### Admin

- Log in with an admin account.
- Open the `/admin` routes to manage users, products, and orders.
- Create and update products through protected admin APIs.
- Review all orders and update order delivery status.

## API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Authenticate a user and return a JWT |
| `GET` | `/api/users/profile` | Get the authenticated user profile |
| `GET` | `/api/products` | Fetch products with optional filters |
| `GET` | `/api/products/:id` | Fetch a single product |
| `GET` | `/api/products/new-arrivals` | Fetch the latest products |
| `GET` | `/api/products/best-seller` | Fetch the top-rated product |
| `GET` | `/api/products/similar/:id` | Fetch similar products |
| `POST` | `/api/products` | Create a product (admin) |
| `PUT` | `/api/products/:id` | Update a product (admin) |
| `DELETE` | `/api/products/:id` | Delete a product (admin) |
| `GET` | `/api/cart` | Fetch a guest or user cart |
| `POST` | `/api/cart` | Add an item to the cart |
| `PUT` | `/api/cart` | Update item quantity in the cart |
| `DELETE` | `/api/cart` | Remove an item from the cart |
| `POST` | `/api/cart/merge` | Merge guest cart into authenticated cart |
| `POST` | `/api/checkout` | Create a checkout session |
| `PUT` | `/api/checkout/:id/pay` | Mark checkout as paid |
| `POST` | `/api/checkout/:id/finalize` | Convert checkout into an order |
| `GET` | `/api/orders/my-orders` | Get current user order history |
| `GET` | `/api/orders/:id` | Get order details |
| `POST` | `/api/upload` | Upload an image to Cloudinary |
| `POST` | `/api/subscribe` | Add a newsletter subscriber |
| `GET` | `/api/admin/users` | List all users (admin) |
| `POST` | `/api/admin/users` | Create a user (admin) |
| `PUT` | `/api/admin/users/:id` | Update a user (admin) |
| `DELETE` | `/api/admin/users/:id` | Delete a user (admin) |
| `GET` | `/api/admin/products` | List all products (admin) |
| `GET` | `/api/admin/orders` | List all orders (admin) |
| `PUT` | `/api/admin/orders/:id` | Update order status (admin) |
| `DELETE` | `/api/admin/orders/:id` | Delete an order (admin) |

## Engineering Highlights

- Modular frontend and backend separation with domain-based route organization
- Redux Toolkit async thunks for side effects and predictable client state updates
- JWT-secured routes with reusable authorization middleware
- Guest-to-user cart merge flow to preserve cart state after authentication
- Checkout-to-order lifecycle modeled explicitly with dedicated Mongoose schemas
- Media upload support through Cloudinary and multer memory storage
- Clear separation between public APIs and admin APIs

## Future Roadmap

- Add automated testing across API routes, Redux slices, and critical UI flows
- Introduce payment confirmation webhooks and stronger order lifecycle auditing
- Deploy the stack with CI/CD, production environment configs, and monitoring
- Expand admin analytics with sales dashboards, inventory alerts, and subscriber insights

## Clean Code Practices

- Feature-based route modules and component grouping
- Dedicated data models and middleware rather than inline business logic
- Centralized state management for cross-page flows like auth, cart, and products
- Environment-based configuration for secrets and third-party services

## Contact

- GitHub: [Aniketsahoo228](https://github.com/Aniketsahoo228)
- LinkedIn: [Aniket Sahoo](https://www.linkedin.com/in/aniket-sahoo-b17496299/)

