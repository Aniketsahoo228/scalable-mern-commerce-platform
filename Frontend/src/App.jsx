import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPages from "./pages/CollectionPages";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./components/Products/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import ProtectedRoute from "./components/Common/ProtectedRouter";

import {Provider}  from  "react-redux";
import store from "./redux/store"

const App = () => {
  return (
    <Provider store= {store}>
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath : true}}>
    <Toaster position="top-right" />
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register />} />
        <Route path = "/" element = {<UserLayout />}>
        <Route element={<ProtectedRoute><Home /></ProtectedRoute>} index />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="collections/:collection" element={<ProtectedRoute><CollectionPages /></ProtectedRoute>} />
        <Route path ="product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path ="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path ="order-confirmation" element ={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} /> 
        <Route path ="order/:id" element ={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
        <Route path ="my-order" element ={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
        </Route>
        <Route path="admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="home" element={<AdminHomePage/>} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage /> } />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
