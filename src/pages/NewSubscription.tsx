import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewSubscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "Básico",
    frequency: "Mensual",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nueva suscripción creada para ${formData.name} (${formData.plan})`);
    navigate("/subscriptions");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
        Nueva Suscripción
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#A77B5D]"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#A77B5D]"
              placeholder="juan@correo.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#A77B5D]"
            >
              <option>Básico</option>
              <option>Estándar</option>
              <option>Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Frecuencia</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#A77B5D]"
            >
              <option>Mensual</option>
              <option>Bimestral</option>
              <option>Trimestral</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/subscriptions")}
            className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#4A2C2A] text-white hover:bg-[#6B3E36]"
          >
            Crear Suscripción
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NewSubscription;
