import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import "../styles/components/Header.css";

const Header = () => {
  const { authToken, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          Quind Camera Rent
        </Link>
        <nav className="header__nav">
        {authToken ? (
            <>
              <Link to="/rentals" className="header__link">
                Mis alquileres
              </Link>
              <button onClick={handleLogout} className="header__link">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="header__link">
                Iniciar sesión / Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
