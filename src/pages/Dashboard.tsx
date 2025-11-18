import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  const [suscripcionesActivas, setSuscripcionesActivas] = useState<
    number | null
  >(null);
  const [enviosPendientes, setEnviosPendientes] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Suscripciones activas
        const { data: activas, error: errorActivas } = await supabase
          .from("pedidos")
          .select("id")
          .eq("activa", true);

        if (errorActivas) throw errorActivas;

        // 🔹 Envíos pendientes
        const { data: pendientes, error: errorPendientes } = await supabase
          .from("pedidos")
          .select("id")
          .eq("pendiente", true);

        if (errorPendientes) throw errorPendientes;

        setSuscripcionesActivas(activas.length);
        setEnviosPendientes(pendientes.length);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🔸 Suscripciones Activas */}
        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#A77B5D]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Suscripciones Activas
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">
            {suscripcionesActivas !== null
              ? suscripcionesActivas
              : "Cargando..."}
          </p>
        </div>

        {/* 🔸 Envíos Pendientes */}
        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#DAB49D]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Envíos Pendientes
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">
            {enviosPendientes !== null ? enviosPendientes : "Cargando..."}
          </p>
        </div>

        {/* 🔸 Clientes Nuevos (placeholder) */}
        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#8C5E58]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Clientes Nuevos
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">5</p>
        </div>
      </div>

      {/* Sección de resumen */}
      <div className="mt-10 bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-[#4A2C2A] mb-4">
          Actividad Reciente
        </h2>
        <ul className="text-gray-700 space-y-2">
          <li>☕ Nueva suscripción creada: Juan Pérez (Plan Premium)</li>
          <li>📦 Pedido enviado: Suscripción #102</li>
          <li>💳 Pago recibido de María Gómez (Plan Básico)</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
