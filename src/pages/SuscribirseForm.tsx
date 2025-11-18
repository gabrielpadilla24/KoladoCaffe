import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SuscribirseForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const producto = location.state?.producto;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  if (!producto) {
    navigate("/");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Enviar al flujo de pago con la info del cliente + producto
    navigate("/pago", { state: { producto, cliente: formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2E8CF] to-[#C2A878]">
      <Navbar />
      <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#4A2C2A] mb-6">
          Suscribirse a {producto.productos_suscripcion}
        </h2>

        <p className="text-center text-[#A77B5D] mb-8 text-lg">
          Precio mensual: ${producto.precio.toLocaleString("es-CO")}
        </p>

        <form onSubmit={handleContinue} className="space-y-5">
          <input
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />
          <input
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A77B5D]"
          />

          <button
            type="submit"
            className="w-full bg-[#4A2C2A] text-white py-3 rounded-lg hover:bg-[#6B3E36] transition duration-200"
          >
            Continuar al pago 💳
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuscribirseForm;
