/* eslint-disable react/prop-types */
import logo from "../assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import "../styles/navbar.css";

/**
 * Este componente será la navbar o barra de navegación del sitio web.
 * Acá dependiendo de si estamos logueados o no se mostrarán unos enlaces u otros.
 * @namespace Navbar
 * @prop {Boolean} isAuthenticated Es un booleano que cambia a true si el usuario esta logueado.
 * @prop {function} logout Es una funcion que nos otorga JWT para cerrar sesión.
 * @prop {Object} user Es un objeto que se llena con los datos del usuario logueado.
 * @prop {Boolean} isLoading Es un booleano que nos indica si esta cargando todavía, osea si todavía se estan cargando los datos de jwt.
 * @returns {JSX.Element} Se retorna el componente para ser renderizado
 */
export const Navbar = ({ isAuthenticated, logout, user, isLoading }) => {
  if (isLoading) {
    return <div style={{ color: "black !important" }}>Loading ...</div>;
  }
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand logo" to="/">
          <img src={logo} alt="logo" width="50" height="50" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/sobre-nosotros"
                className="nav-link"
                aria-current="page"
              >
                Sobre Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link">
                Contacto
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink to="/blog" className="nav-link">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/consultas" className="nav-link">
                    Consultas
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>

          {isAuthenticated ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle perfil-icono"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundImage: `url(${user.picture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/perfil">
                    Perfil
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <LoginButton className="loginButton" texto="Login" />
          )}
        </div>
      </div>
    </nav>
  );
};
