import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import "./Login.css";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    // 💙 GUARDAR TOKEN
    localStorage.setItem("token", response.data.token);

    // 💙 GUARDAR USUARIO
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data)
    );

    console.log("LOGIN OK:", response.data);
    navigate("/dashboard");

  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Error al iniciar sesión."
    );
  }

 finally {
  setLoading(false);
}
};


  return (

    <div className="login-page">

      <div className="left-panel">

       <div className="login-logo">
          🧩
        </div>

        <h1>
          Re<span>Solve</span>
        </h1>

        <h2>
          Gestión Inteligente de Incidencias
        </h2>

        <div className="line"></div>

        <p>
          Cada solución compartida fortalece
          el conocimiento del equipo.
        </p>

      </div>

      <div className="right-panel">

        <div className="login-card">

          <h2>
            Bienvenido 👋
          </h2>

          <span>
            Ingresa con tu cuenta institucional.
          </span>

          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>
                Correo electrónico
              </label>

              <div className="input">

                <FaEnvelope />

                <input
                  type="email"
                  placeholder="ejemplo@hotel.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>

            <div className="input-group">

              <label>
                Contraseña
              </label>

              <div className="input">

                <FaLock />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                  }
                </button>

              </div>

            </div>

            {
              error &&
              <p className="error-message">
                {error}
              </p>
            }

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {
                loading
                  ? "Entrando..."
                  : "Entrar"
              }
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Login;