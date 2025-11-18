import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../supabaseClient";
import DashboardLayout from "../layouts/DashboardLayout";

interface DatosCliente {
  nombre: string;
  email: string;
  direccion?: string;
  telefono?: string;
}

interface Producto {
  id: number;
  productos_suscripcion: string;
  descripcion?: string;
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

  // 🔹 Cargar todas las suscripciones
  const fetchSubscriptions = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("pedidos")
        .select("*, productos_suscripcion(*)")
        .order("id", { ascending: true });

      if (error) {
        console.error("❌ Error al cargar suscripciones:", error.message);
        return;
      }

      if (data) {
        setSubscriptions(data as Pedido[]);
      }
    } catch (err) {
      console.error("⚠️ Error inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSubscriptions();
  }, []);

  // 🔹 Cancelar suscripción
  const cancelarSuscripcion = async (id: number): Promise<void> => {
    const confirm = await Swal.fire({
      title: "¿Cancelar suscripción?",
      text: "Esto desactivará la suscripción permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener activa",
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#4b5563",
    });

    if (!confirm.isConfirmed) return;

    const { error } = await supabase
      .from("pedidos")
      .update({ activa: false })
      .eq("id", id);

    if (error) {
      console.error("❌ Error al cancelar:", error.message);
      await Swal.fire("Error", "No se pudo cancelar la suscripción.", "error");
      return;
    }

    await Swal.fire(
      "✅ Cancelada",
      "La suscripción ha sido desactivada.",
      "success"
    );

    setSubscriptions((prevSubs) =>
      prevSubs.map((sub) => (sub.id === id ? { ...sub, activa: false } : sub))
    );
  };

  // 🔹 Reactivar suscripción
  const reactivarSuscripcion = async (id: number): Promise<void> => {
    const confirm = await Swal.fire({
      title: "¿Reactivar suscripción?",
      text: "Esto volverá a activar la suscripción para el cliente.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reactivar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#4b5563",
    });

    if (!confirm.isConfirmed) return;

    const { error } = await supabase
      .from("pedidos")
      .update({ activa: true })
      .eq("id", id);

    if (error) {
      console.error("❌ Error al reactivar:", error.message);
      await Swal.fire("Error", "No se pudo reactivar la suscripción.", "error");
      return;
    }

    await Swal.fire(
      "✅ Reactivada",
      "La suscripción ha sido activada nuevamente.",
      "success"
    );

    setSubscriptions((prevSubs) =>
      prevSubs.map((sub) => (sub.id === id ? { ...sub, activa: true } : sub))
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-[#4A2C2A] mt-10">
          Cargando suscripciones...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
        Todas las Suscripciones
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-[#F5EFE7] text-[#4A2C2A]">
            <tr>
              <th className="py-3 px-4 text-left">Cliente</th>
              <th className="py-3 px-4 text-left">Plan</th>
              <th className="py-3 px-4 text-left">Monto</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Último Envío</th>
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
                <td className="py-3 px-4">
                  ${sub.monto_total.toLocaleString()}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    sub.activa ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {sub.activa ? "Activa" : "Cancelada"}
                </td>
                <td className="py-3 px-4">
                  {new Date(sub.ultimo_envio).toLocaleDateString("es-CO")}
                </td>
                <td className="py-3 px-4 space-x-2">
                  {sub.activa ? (
                    <button
                      onClick={() => void cancelarSuscripcion(sub.id)}
                      className="text-sm bg-[#b91c1c] text-white px-3 py-1 rounded-md hover:bg-[#7f1d1d] transition duration-200"
                    >
                      Cancelar
                    </button>
                  ) : (
                    <button
                      onClick={() => void reactivarSuscripcion(sub.id)}
                      className="text-sm bg-[#2563eb] text-white px-3 py-1 rounded-md hover:bg-[#1d4ed8] transition duration-200"
                    >
                      Reactivar
                    </button>
                  )}
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
