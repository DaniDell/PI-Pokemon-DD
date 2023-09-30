import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Paginate.css";
import { setPage } from "../../Redux/actions"; 

export default function Paginate() { 
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const filterPokemons = useSelector((state) => state.filterPokemons);

  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageNumbers.length) {
      dispatch(setPage(newPage)); // Actualiza la página en el estado de Redux
    }
  };

  useEffect(() => {
    // Cuando cambia la página actual, realiza el scroll al principio de la página.
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [currentPage]);

  const pageNumbers = Array.from({ length: Math.ceil(filterPokemons.length / 9) }, (_, i) => i + 1);

 

return (
  <nav className="paginado">
    <ul className="page-list"> {/* Agrega la clase "page-list" */}
      <li>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flecha">
          {"<<"}
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            className={currentPage === number ? "active" : ""}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        </li>
      ))}
      <li>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= pageNumbers.length} className="flecha">
          {">>"}
        </button>
      </li>
    </ul>
  </nav>
);}
