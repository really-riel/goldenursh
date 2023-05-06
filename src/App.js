import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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
import SignUp from "./pages/auth/SignUp";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import Checkout from "./pages/Cart/Checkout";
import { RequireAdminRoute, RequireAuth } from "./components/RequireLinks";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomerOrders from "./pages/CustomerOrders/CustomerOrders";
import ChooseOrder from "./pages/ChooseOrder/ChooseOrder";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="contact" element={<Contact />} />

        <Route path="cart">
          <Route index element={<Cart />} />
          <Route
            path="checkout"
            errorElement={<ErrorBoundary />}
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="profile">
          <Route
            index
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="edit"
            element={
              <RequireAuth>
                <ProfileEdit />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="orders"
          element={
            <RequireAuth>
              <CustomerOrders />
            </RequireAuth>
          }
        />

        <Route path="choose-order" element={<ChooseOrder />} />

        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        <Route path="admin">
          <Route
            path="dashboard"
            element={
              <RequireAdminRoute>
                <Dashboard />
              </RequireAdminRoute>
            }
          />
          <Route
            path="staffs"
            element={
              <RequireAdminRoute>
                <Staffs />
              </RequireAdminRoute>
            }
          />
          <Route
            path="orders"
            element={
              <RequireAdminRoute>
                <Orders />
              </RequireAdminRoute>
            }
          />
          <Route
            path="dishes"
            element={
              <RequireAdminRoute>
                <Dishes />
              </RequireAdminRoute>
            }
          />
          <Route
            path="inventory"
            element={
              <RequireAdminRoute>
                <Inventory />
              </RequireAdminRoute>
            }
          />
          <Route
            path="message"
            element={
              <RequireAdminRoute>
                <Message />{" "}
              </RequireAdminRoute>
            }
          />
          <Route
            path="notification"
            element={
              <RequireAdminRoute>
                <Notification />
              </RequireAdminRoute>
            }
          />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
