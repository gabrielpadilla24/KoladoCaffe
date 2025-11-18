import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import NewSubscription from "../pages/NewSubscription";
import Reports from "../pages/Reports";
import ViewDetails from "../pages/ViewDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/new-subscription" element={<NewSubscription />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/view-details" element={<ViewDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
