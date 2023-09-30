import React, { useState, useEffect } from "react";
import { useParams,  NavLink } from "react-router-dom";
import "../Detail/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    id: 0,
    name: "",
    vida: 0,
    ataque: 0,
    defensa: 0,
    peso: 0,
    image: "",
    tipos: [],
  });

  useEffect(() => {
    // Realiza una solicitud GET para obtener los detalles del Pokémon
    fetch(`http://localhost:3001/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del Pokémon:", error);
      });
  }, [id]); 

  return (
    <div className="detail-container"> {/* Aplica la clase del contenedor */}
     <h3 className="detail-title">{`Detalle de ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>

      {pokemon ? (
        <div className="data">
          
          <img
            className="detail-image"
            src={pokemon.imagen}
            alt={pokemon.name}
          />
<div className="dataColum">
          <p className="detail-stats">Vida: {pokemon.vida}</p> {/* Aplica la clase de estadísticas */}
          <p className="detail-stats">Ataque: {pokemon.ataque}</p>
          <p className="detail-stats">Defensa: {pokemon.defensa}</p>
          <p className="detail-stats">Peso: {pokemon.peso}</p>
          <p className="detail-stats">Altura: {pokemon.altura}</p>
          <h3 className="detail-types">Tipos:</h3> {/* Aplica la clase de tipos */}
          <ul>
            {pokemon.types ? (
              pokemon.types.map((tipo, index) => (
                <button className="detail-types-button" key={index}>
                  {tipo.tipo}
                </button>
              ))
            ) : (
              <p>No se encontraron tipos.</p>
            )}
          </ul>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}

<div>
        <NavLink className="back" to={"/home"}>
          Volver 🏠
        </NavLink>
      </div>
    </div>
  );
};


export default Detail;
