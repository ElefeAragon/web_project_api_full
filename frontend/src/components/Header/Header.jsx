import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />

      {!loggedIn && location.pathname === "/signin" && (
        <Link className="header__link" to="/signup">
          Registrarse
        </Link>
      )}

      {!loggedIn && location.pathname === "/signup" && (
        <Link className="header__link" to="/signin">
          Iniciar sesión
        </Link>
      )}

      {loggedIn && (
        <div className="header__user">
          <span className="header__email">{email}</span>

          <Link
            to="/signin"
            className="header__logout"
            onClick={onSignOut}
          >
            Cerrar sesión
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;