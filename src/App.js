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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="staffs" element={<Staffs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="dishes" element={<Dishes />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="message" element={<Message />} />
          <Route path="notification" element={<Notification />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
