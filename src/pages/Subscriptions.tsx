import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

const Subscriptions = () => {
  // Datos simulados
  const subscriptions = [
    {
      id: 1,
      name: "Juan Pérez",
      plan: "Premium",
      status: "Activa",
      nextDelivery: "20 Nov 2025",
    },
    {
      id: 2,
      name: "María Gómez",
      plan: "Básico",
      status: "Pendiente de pago",
      nextDelivery: "18 Nov 2025",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      plan: "Estándar",
      status: "Activa",
      nextDelivery: "22 Nov 2025",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4A2C2A]">Suscripciones</h1>
        <Link
          to="/new-subscription"
          className="bg-[#4A2C2A] text-white px-4 py-2 rounded-lg hover:bg-[#6B3E36] transition duration-200"
        >
          + Nueva Suscripción
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-[#F5EFE7] text-[#4A2C2A]">
            <tr>
              <th className="py-3 px-4 text-left">Cliente</th>
              <th className="py-3 px-4 text-left">Plan</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Próximo Envío</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub.id}
                className="border-b hover:bg-[#F9F6F2] transition duration-150"
              >
                <td className="py-3 px-4">{sub.name}</td>
                <td className="py-3 px-4">{sub.plan}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    sub.status === "Activa"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {sub.status}
                </td>
                <td className="py-3 px-4">{sub.nextDelivery}</td>
                <td className="py-3 px-4">
                  <button className="text-sm bg-[#A77B5D] text-white px-3 py-1 rounded-md hover:bg-[#8C5E58]">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
