import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Reports from "../pages/Reports";
import ViewDetails from "../pages/ViewDetails";
import Marketplace from "../pages/Marketplace";
import SuscribirseForm from "../pages/SuscribirseForm";
import SubscriptionDetail from "../pages/SubscriptionDetail";
import Pagos from "../pages/Pagos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/suscribirse/:id" element={<SuscribirseForm />} />
        <Route path="/pago" element={<Pagos />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscription/:id" element={<SubscriptionDetail />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/view-details" element={<ViewDetails />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
