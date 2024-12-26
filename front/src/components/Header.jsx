import { Link } from "react-router-dom";
import "../styles/components/Header.css";

const Header = () => {
  const isAuthenticated = false;

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          Quind Camera Rent
        </Link>
        <nav className="header__nav">
          {isAuthenticated ? (
            <>
              <Link to="/rentals" className="header__link">
                Mis alquileres
              </Link>
              <Link to="/auth" className="header__link">
                Cerrar sesión
              </Link>
            </>
          ) : (
            <Link to="/auth" className="header__link">
              Iniciar sesión / Registrarse
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
