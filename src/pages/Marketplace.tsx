import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import type { Producto } from "../types/supabase";
import Navbar from "../components/Navbar";

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
      alert(`¡Suscripción a ${producto.nombre} exitosa! Pedido creado.`);
    }
  }
};

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 bg-[#EEE0C9] flex items-center justify-center text-[#4A2C2A] text-2xl font-semibold">
                {producto.nombre}
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-2">{producto.descripcion}</p>
                <p className="text-2xl font-bold text-[#4A2C2A] mb-4">
                  ${producto.precio}
                </p>
                <button
                  onClick={() => handleSuscripcion(producto)}
                  className="w-full bg-[#4A2C2A] text-white py-2 rounded-lg hover:bg-[#6B3E36] transition duration-200"
                >
                  Suscribirse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
