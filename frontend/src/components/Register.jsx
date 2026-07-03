import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      email,
      password,
    });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth__submit">
          Regístrate
        </button>
      </form>

      <p className="auth__signin">
        ¿Ya eres miembro?{" "}
        <Link to="/signin" className="auth__link">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default Register;