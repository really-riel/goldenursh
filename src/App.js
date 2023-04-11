import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

import Dashboard from "./pages/Admin/Dashboard";
import Staffs from "./pages/Admin/Staffs";
import Orders from "./pages/Admin/Orders";
import Dishes from "./pages/Admin/Dishes";
import Inventory from "./pages/Admin/Inventory";
import Message from "./pages/Admin/Message";
import Notification from "./pages/Admin/Notification";
import Home from "./pages/home/Home";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Missing from "./pages/Missing/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="contact" element={<Contact />} />

        <Route path="cart" element={<Cart />} />

        <Route path="profile" element={<Profile />} />

        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="staffs" element={<Staffs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="dishes" element={<Dishes />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="message" element={<Message />} />
          <Route path="notification" element={<Notification />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
