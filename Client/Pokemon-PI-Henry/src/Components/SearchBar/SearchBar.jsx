import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName, setPage } from "../../Redux/actions";
import "./SearchBar.css";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // Inicializar con un valor vacío
  const [alertMessage, setAlertMessage] = useState("");
  
const SearchPokemons = useSelector(state => state.filterPokemons);



function clearForm() {
    setName(""); // Limpia el input
  }

  useEffect(() => {
    if (SearchPokemons.length === 0 && name.trim() !== "") {
      setAlertMessage("No hay resultados con esos datos");
    } else {
      clearForm();
      setAlertMessage("");
          }
  }, [SearchPokemons]);

  

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setAlertMessage("Coloque datos para realizar su búsqueda");
      return;
    }

    // Espera a que la acción asincrónica se complete
    dispatch(searchByName(name.trim()));
   
  }

  function handleAlertClose() {
    setAlertMessage("");
    setName("");
  }

  return (
    <div className="buscador">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pokemons" 
          placeholder="Buscar x nombre" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="buscar">
          🔍
        </button>
      </form>

      {alertMessage && (
        <div className="alert">
          <span className="alert-message">{alertMessage}</span>
          <button className="alert-close" onClick={handleAlertClose}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
