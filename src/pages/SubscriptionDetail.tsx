import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const SubscriptionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [subscription, setSubscription] = useState<Pedido | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("*, productos_suscripcion(*)")
        .eq("id", id)
        .single();

      if (error) console.error("Error al cargar detalles:", error);
      else setSubscription(data as Pedido);
    };

    fetchSubscription();
  }, [id]);

  if (!subscription)
    return (
      <DashboardLayout>
        <p className="text-center text-[#4A2C2A]">Cargando detalles...</p>
      </DashboardLayout>
    );

  const cliente = subscription.datos_cliente;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
        Detalles de la Suscripción
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 space-y-3 text-[#4A2C2A]">
        <p>
          <strong>Cliente:</strong> {cliente.nombre}
        </p>
        <p>
          <strong>Email:</strong> {cliente.email}
        </p>
        <p>
          <strong>Dirección:</strong> {cliente.direccion}
        </p>
        <p>
          <strong>Teléfono:</strong> {cliente.telefono}
        </p>
        <hr className="my-3" />
        <p>
          <strong>Plan:</strong>{" "}
          {subscription.productos_suscripcion?.productos_suscripcion}
        </p>
        <p>
          <strong>Descripción:</strong>{" "}
          {subscription.productos_suscripcion?.descripcion}
        </p>
        <p>
          <strong>Monto total:</strong> $
          {subscription.monto_total.toLocaleString()}
        </p>
        <p>
          <strong>Último envío:</strong>{" "}
          {new Date(subscription.ultimo_envio).toLocaleDateString("es-CO")}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          {subscription.pendiente ? (
            <span className="text-yellow-600">Pendiente de envío</span>
          ) : (
            <span className="text-green-600">Activa</span>
          )}
        </p>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionDetail;
