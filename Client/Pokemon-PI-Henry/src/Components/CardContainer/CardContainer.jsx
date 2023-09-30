import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByType, orderByName, orderByScore, resetFilters, setPage } from "../../Redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginado/Paginate";
import "../CardContainer/CardContainer.css";
import LoadingAnimation from '../LooadingSpiner/LooadingSpiner';
import FiltersMenu from "../FiltersMenu/FiltersMenu";
import redo from "../../img/redo.gif";

export default function CardsContainer() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const allPokemons = useSelector((state) => state.filterPokemons);
  const currentPage = useSelector((state) => state.currentPage); 

  const PokemonsPerPage = 9;
  const indexOfLastPokemon = currentPage * PokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - PokemonsPerPage;
  const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const [filter, setFilter] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleResetFilters = () => {
    dispatch(resetFilters()); // Llama a la acción para restablecer los filtros
  };

 
  useEffect(() => {
    setIsLoading(true);
  
    // Verifica si los datos ya se han cargado antes de realizar una nueva solicitud
    if (!dataLoaded) {
      fetch("http://localhost:3001/type")
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.map(({ id, ...rest }) => rest);
          filteredData.sort();
          setFilter(filteredData);
          setTimeout(() => {
            setIsLoading(false);
            setDataLoaded(true); // Establece que los datos se han cargado
          }, 2000);
        });
    } else {
      setIsLoading(false); // Datos ya cargados, no es necesario hacer una solicitud
    }
  }, [dispatch, dataLoaded]);
  

  useEffect(() => {
    if (!mounted) {
      // Evita que se pierdan los filtros cuando se va a otra ruta
      if (allPokemons.length === 0) {
        dispatch(getPokemons());
      }
      setMounted(true);
    }
  }, [dispatch, allPokemons]);

  const handleFilterByType = (e) => {
    if (e.target.value !== "") {
      dispatch(filterPokemonsByType(e.target.value));
      dispatch(setPage(1)); // Reinicia la página al filtrar
    } 
  };
  
  const handleOrderByName = (e) => {
    dispatch(orderByName(e.target.value));
    dispatch(setPage(1)); // Reinicia la página al ordenar
  };

  const handleOrderByScore = (e) => {    
    dispatch(orderByScore(e.target.value));
    dispatch(setPage(1)); // Reinicia la página al ordenar
  };

  return (
    <div className="cards-container">
      <div className="filters-menu">
        <FiltersMenu
          handleFilterByType={handleFilterByType}
          handleOrderByName={handleOrderByName}
          handleOrderByScore={handleOrderByScore}
          handleResetFilters={handleResetFilters}
          filterOptions={filter}
        />
      </div>
      <div className="pagination">
        <Paginate
          PokemonsPerPage={PokemonsPerPage}
          allPokemons={allPokemons.length}
        />
      </div>
      {isLoading ? ( // Verifica si isLoading es verdadero 
        <div className="loading-container">
        
          <LoadingAnimation className="loading-animation" />
        </div>
      ) : allPokemons.length === 0 ? ( // Verifica si allPokemons es igual a 0
        <div className="no-results-message">
          <h1> Hacé una nueva búsqueda</h1>
          <img src={redo} alt="Rehacer búsqueda" className="redo-icon" />
        </div>
      ) : (
        <div className="card-list">
          {currentPokemon.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imagen={pokemon.imagen}
              vida={pokemon.vida}
              ataque={pokemon.ataque}
              defensa={pokemon.defensa}
              velocidad={pokemon.velocidad}
              altura={pokemon.altura}
              peso={pokemon.peso}
              tipos={pokemon.types}
            />
          ))}
        </div>
      )}
      <div className="pagination">
        <Paginate
          PokemonsPerPage={PokemonsPerPage}
          allPokemons={allPokemons.length}
        />
      </div>
    </div>
  );
  
}
