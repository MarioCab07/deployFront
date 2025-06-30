import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Iniciando sesión...");
    try {
      const response = await login(formData);
      if (response.status === 200) {
        toast.success("Sesión iniciada exitosamente");
        const role = response.data.role;

      if (role === "EMPLOYEE") {
        navigate("/employee");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "CLEANING_STAFF") {
        navigate("/cleaning-staff")
      } else {
        navigate("/rooms");
      }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white text-center">
        Inicia Sesión
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-white font-medium">Usuario</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-white bg-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-white bg-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white font-semibold px-6 py-2 rounded hover:bg-orange-600 transition"
      >
        Iniciar Sesión
      </button>

      <p className="text-white text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-pink-400 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
