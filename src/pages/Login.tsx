import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@kolado.com" && password === "1234") {
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#E7D9C9] to-[#C2A878]">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 border border-[#E5D2B8]">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#4A2C2A] tracking-tight">
            Kolado<span className="text-[#A77B5D]">Café</span> Admin
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Panel interno de administración
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A77B5D] placeholder-gray-400"
              placeholder="admin@kolado.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A77B5D] placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          {/* Error visual */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#4A2C2A] text-white font-semibold py-3 rounded-lg hover:bg-[#6B3E36] transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          © 2025{" "}
          <span className="font-semibold text-[#4A2C2A]">KoladoCafé</span>.
          Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
