import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import Searchbar from "../SearchBar/SearchBar";
import gifIcon from "../../img/chau.gif";
import logo from "../../img/logo.png";

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="container">
      <NavLink to="/home">
        {location.pathname === "/home" ? (
          // Mostrar el logo solo en la ruta "/home"
          <img src={logo} alt="Logo" className="logo" />
        ) : (
          <span style={{ fontSize: "40px" }}>🏠</span>
        )}
      </NavLink>
      {/* Ocultar la barra de búsqueda y el botón en las rutas "/create" y "/detail/:id" */}
      {location.pathname !== "/create" && !location.pathname.startsWith("/detail/") && (
        <>
          <Searchbar />
        </>
      )}

      <NavLink to="/create">
        <button className="custom-button">Crea tu propio Pokémon</button>
      </NavLink>
      <NavLink to="/">
        <img src={gifIcon} alt="Icono de salida" className="icon" />
      </NavLink>
    </div>
  );
};

export default NavBar;
