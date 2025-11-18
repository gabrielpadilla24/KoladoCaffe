import { useNavigate } from "react-router-dom";

const ViewDetails = () => {
  const navigate = useNavigate();

  // Simulación de datos del cliente (en versión real vendrían de una API)
  const cliente = {
    nombre: "Laura Pérez",
    correo: "laura.perez@example.com",
    telefono: "+57 300 123 4567",
    direccion: "Carrera 7 #120-45, Bogotá",
    tipoSuscripcion: "Mensual (3 cajas KoladoCafé)",
    fechaInicio: "2025-01-15",
    estado: "Activa",
    notas:
      "Cliente fiel desde 2022, prefiere mezcla balanceada y envío en lunes.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2E8CF] to-[#C2A878] flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-[#4A2C2A] mb-6 text-center">
          Detalles del Cliente
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-semibold">Nombre:</span> {cliente.nombre}
          </div>
          <div>
            <span className="font-semibold">Correo:</span> {cliente.correo}
          </div>
          <div>
            <span className="font-semibold">Teléfono:</span> {cliente.telefono}
          </div>
          <div>
            <span className="font-semibold">Dirección:</span>{" "}
            {cliente.direccion}
          </div>
          <div>
            <span className="font-semibold">Tipo de Suscripción:</span>{" "}
            {cliente.tipoSuscripcion}
          </div>
          <div>
            <span className="font-semibold">Fecha de Inicio:</span>{" "}
            {cliente.fechaInicio}
          </div>
          <div>
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                cliente.estado === "Activa" ? "bg-green-600" : "bg-red-500"
              }`}
            >
              {cliente.estado}
            </span>
          </div>
          <div>
            <span className="font-semibold">Notas:</span> {cliente.notas}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/subscriptions")}
            className="px-6 py-3 bg-[#4A2C2A] text-white rounded-lg hover:bg-[#6B3E36] transition duration-200"
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
