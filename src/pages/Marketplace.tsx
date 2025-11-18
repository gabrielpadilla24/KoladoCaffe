import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";
import suscripcionesImg from "../assets/suscripciones.jpg";

// --- Tipo ajustado a tu tabla real ---
interface Producto {
  id: number;
  productos_suscripcion: string;
  descripcion: string;
  precio: number;
  activo: boolean;
}

// --- Función para manejar la suscripción ---
const handleSuscripcion = async (producto: Producto) => {
  const pagoExitoso = true; // Simulación de pago

  if (pagoExitoso) {
    const nuevoPedido = {
      id_producto: producto.id,
      datos_cliente: { nombre: "Cliente TS", email: "ts@ejemplo.com" },
      monto_total: producto.precio,
    };

    const { error } = await supabase.from("pedidos").insert([nuevoPedido]);

    if (error) {
      alert("Error al guardar el pedido: " + error.message);
    } else {
      alert(
        `¡Suscripción a ${producto.productos_suscripcion} exitosa! Pedido creado.`
      );
    }
  }
};

// --- Componente principal ---
const Marketplace: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos_suscripcion")
        .select("*")
        .eq("activo", true);

      if (error) console.error("Error al cargar productos:", error);
      else setProductos(data as Producto[]);
      setLoading(false);
    };
    fetchProductos();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2E8CF]">
        <p className="text-[#4A2C2A] text-xl font-medium animate-pulse">
          Cargando suscripciones...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2E8CF] to-[#C2A878]">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-extrabold text-center text-[#4A2C2A] mb-10">
          Marketplace de Suscripciones ☕
        </h1>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="relative bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105 border border-gray-100 group"
            >
              {/* Imagen */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={suscripcionesImg}
                  alt={producto.productos_suscripcion}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Contenido principal */}
              <div className="p-6 relative z-10">
                <h2 className="text-2xl font-semibold text-[#4A2C2A] mb-2">
                  {producto.productos_suscripcion}
                </h2>

                {/* ✅ Precio con formato de miles */}
                <p className="text-2xl font-bold text-[#A77B5D] mb-6">
                  ${producto.precio.toLocaleString("es-CO")}
                </p>

                <button
                  onClick={() => handleSuscripcion(producto)}
                  className="w-full bg-[#4A2C2A] text-white py-3 rounded-lg hover:bg-[#6B3E36] transition duration-200"
                >
                  Suscribirse
                </button>
              </div>

              {/* Overlay con descripción al hover */}
              <div className="absolute inset-0 bg-[#4A2C2Adf] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center text-center p-6">
                <p className="text-sm leading-relaxed">
                  {producto.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
