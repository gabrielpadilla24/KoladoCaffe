import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import DashboardLayout from "../layouts/DashboardLayout";

interface DatosCliente {
  nombre: string;
  email: string;
  direccion: string;
  telefono: string;
}

interface Producto {
  id: number;
  productos_suscripcion: string;
  descripcion: string;
  precio: number;
}

interface Pedido {
  id: number;
  id_producto: number;
  datos_cliente: DatosCliente;
  monto_total: number;
  activa: boolean;
  pendiente: boolean;
  ultimo_envio: string;
  productos_suscripcion?: Producto;
}

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("*, productos_suscripcion(*)")
        .eq("activa", true); // ✅ Solo suscripciones activas

      if (error) {
        console.error("Error al cargar suscripciones:", error);
      } else {
        setSubscriptions(data as Pedido[]);
      }
      setLoading(false);
    };

    void fetchSubscriptions();
  }, []);

  const calcularProximoEnvio = (ultimoEnvio: string): string => {
    const fecha = new Date(ultimoEnvio);
    fecha.setMonth(fecha.getMonth() + 1);
    return fecha.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const marcarComoEnviado = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("pedidos")
      .update({
        pendiente: false,
        ultimo_envio: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert("Error al actualizar envío: " + error.message);
    } else {
      alert("✅ Envío marcado como completado.");
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === id
            ? {
                ...sub,
                pendiente: false,
                ultimo_envio: new Date().toISOString(),
              }
            : sub
        )
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-[#4A2C2A]">Cargando suscripciones...</p>
      </DashboardLayout>
    );
  }

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

      {subscriptions.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No hay suscripciones activas.
        </p>
      ) : (
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
                  <td className="py-3 px-4">{sub.datos_cliente?.nombre}</td>
                  <td className="py-3 px-4">
                    {sub.productos_suscripcion?.productos_suscripcion || "—"}
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      sub.pendiente ? "text-yellow-600" : "text-green-600"
                    }`}
                  >
                    {sub.pendiente ? "Pendiente de envío" : "Activa"}
                  </td>
                  <td className="py-3 px-4">
                    {calcularProximoEnvio(sub.ultimo_envio)}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {sub.pendiente && (
                      <button
                        onClick={() => void marcarComoEnviado(sub.id)}
                        className="text-sm bg-[#A77B5D] text-white px-3 py-1 rounded-md hover:bg-[#8C5E58]"
                      >
                        Marcar Enviado
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/subscription/${sub.id}`)}
                      className="text-sm bg-[#4A2C2A] text-white px-3 py-1 rounded-md hover:bg-[#6B3E36]"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Subscriptions;
