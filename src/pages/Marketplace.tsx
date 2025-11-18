// src/components/Marketplace.tsx

import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import type { Producto } from "../types/supabase";

// --- FASE 3: LÓGICA DE NEGOCIO (Creación del Pedido) ---
const handleSuscripcion = async (producto: Producto) => {
  const pagoExitoso = true; // Simulación de pago

  if (pagoExitoso) {
    const nuevoPedido = {
      id_producto: producto.id,
      // Los datos de cliente serían capturados en un formulario real
      datos_cliente: { nombre: "Cliente TS", email: "ts@ejemplo.com" },
      monto_total: producto.precio,
    };

    // Usamos .insert() para crear el registro del pedido
    const { error } = await supabase.from("pedidos").insert([nuevoPedido]);

    if (error) {
      alert("Error al guardar el pedido: " + error.message);
    } else {
      alert(`¡Suscripción a ${producto.nombre} exitosa! Pedido creado.`);
    }
  }
};
// -----------------------------------------------------------------

const Marketplace: React.FC = () => {
  // Tipamos el estado para que sea un array de 'Producto'
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductos = async () => {
      // Consulta tipada
      const { data, error } = await supabase
        .from("productos_suscripcion")
        .select("*")
        .eq("activo", true);

      if (error) {
        console.error("Error al cargar productos:", error);
      } else {
        // Aseguramos que 'data' es tratado como un array de Producto
        setProductos(data as Producto[]);
      }
      setLoading(false);
    };

    fetchProductos();
  }, []);

  if (loading) return <p>Cargando suscripciones...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Marketplace de Suscripciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600 mt-2">{producto.descripcion}</p>
            <p className="text-2xl font-bold mt-4">${producto.precio}</p>
            <button
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
              onClick={() => handleSuscripcion(producto)} // Llamamos a la función tipada
            >
              Suscribirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
