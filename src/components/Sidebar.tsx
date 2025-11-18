import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-[#1E3A8A] text-white flex flex-col p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Kolado Admin</h2>
      <Link to="/dashboard" className="hover:bg-[#2563EB] p-2 rounded">
        Dashboard
      </Link>
      <Link to="/subscriptions" className="hover:bg-[#2563EB] p-2 rounded">
        Suscripciones
      </Link>
      <Link to="/new-subscription" className="hover:bg-[#2563EB] p-2 rounded">
        Nueva Suscripción
      </Link>
      <Link to="/reports" className="hover:bg-[#2563EB] p-2 rounded">
        Reportes
      </Link>
    </aside>
  );
};

export default Sidebar;
