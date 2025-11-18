import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#4A2C2A] text-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* LOGO */}
      <div
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        KoladoCafé ☕
      </div>

      {/* LINKS */}
      {/* <div className="hidden md:flex space-x-6 text-sm font-medium">
        <Link to="/" className="hover:text-[#C2A878] transition">
          Inicio
        </Link>
        <Link to="/marketplace" className="hover:text-[#C2A878] transition">
          Suscripciones
        </Link>
        <Link to="/reports" className="hover:text-[#C2A878] transition">
          Reportes
        </Link>
      </div> */}

      {/* BOTÓN LOGIN */}
      <button
        onClick={() => navigate("/login")}
        className="bg-[#C2A878] text-[#4A2C2A] px-4 py-2 rounded-lg font-semibold hover:bg-[#d8b77d] transition"
      >
        Iniciar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
