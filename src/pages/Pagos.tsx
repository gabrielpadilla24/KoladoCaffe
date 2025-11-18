import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";

const Pagos: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { producto, cliente } = location.state || {};

  const [pago, setPago] = useState({
    numeroTarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const [procesando, setProcesando] = useState(false);

  if (!producto || !cliente) {
    navigate("/");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPago({ ...pago, [e.target.name]: e.target.value });
  };

  const handlePago = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcesando(true);

    // Simulación de procesamiento de pago
    await new Promise((r) => setTimeout(r, 1500));

    // Crear pedido en Supabase
    const nuevoPedido = {
      id_producto: producto.id,
      datos_cliente: { ...cliente, metodo_pago: pago },
      monto_total: producto.precio,
      activa: true,
      pendiente: true,
    };

    const { error } = await supabase.from("pedidos").insert([nuevoPedido]);

    if (error) {
      alert("❌ Error al registrar el pedido: " + error.message);
    } else {
      alert(
        `✅ Pago exitoso. Suscripción a ${producto.productos_suscripcion} confirmada.`
      );
      navigate("/");
    }

    setProcesando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2E8CF] to-[#C2A878]">
      <Navbar />
      <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#4A2C2A] mb-4">
          Confirmar Pago
        </h2>

        <p className="text-center text-[#A77B5D] mb-6 text-lg">
          {producto.productos_suscripcion}
        </p>
        <p className="text-center text-2xl font-semibold text-[#4A2C2A] mb-8">
          Total a pagar: ${producto.precio.toLocaleString("es-CO")}
        </p>

        <form onSubmit={handlePago} className="space-y-5">
          <input
            name="numeroTarjeta"
            placeholder="Número de tarjeta"
            value={pago.numeroTarjeta}
            onChange={handleChange}
            required
            maxLength={16}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />
          <input
            name="vencimiento"
            placeholder="MM/AA"
            value={pago.vencimiento}
            onChange={handleChange}
            required
            maxLength={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />
          <input
            name="cvv"
            placeholder="CVV"
            type="password"
            value={pago.cvv}
            onChange={handleChange}
            required
            maxLength={3}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />

          <button
            type="submit"
            disabled={procesando}
            className={`w-full py-3 rounded-lg text-white ${
              procesando ? "bg-gray-400" : "bg-[#4A2C2A] hover:bg-[#6B3E36]"
            } transition duration-200`}
          >
            {procesando ? "Procesando pago..." : "Confirmar pago 💰"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagos;
