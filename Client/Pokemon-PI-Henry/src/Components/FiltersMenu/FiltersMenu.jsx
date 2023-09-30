import React from "react";
import { useSelector } from "react-redux";
import "./FiltersMenu.css";

export default function FiltersMenu(props) {
    const {
      handleFilterByType,
      handleOrderByName,
      handleOrderByScore,
      handleResetFilters,
      filterOptions,
    } = props;
  
    const selectedType = useSelector((state) => state.selectedType); 
    const selectedPowerLevel = useSelector((state) => state.selectedPowerLevel);
    const selectedAlphabeticalOrder = useSelector((state) => state.selectedAlphabeticalOrder);
  
   
    const handleResetPowerLevel = () => {
      handleOrderByScore({ target: { value: "" } }); // Restablecer la selección de salud a vacío
    };
  
    const handleResetAlphabeticalOrder = () => {
      handleOrderByName({ target: { value: "" } }); // Restablecer la selección de orden alfabético a vacío
    };
  
    return (
      <div className="filterBar">
        <div className="filterReset">
        <button onClick={handleResetFilters} >Resfrescá tus filtros</button>
      </div>


        {selectedType ? ( // Cambia la referencia de selectedPowerype a selectedType
          <div className="filtertype">
            <p>{selectedType}</p>
            <button onClick={handleResetFilters} className="resetButton">X</button>
          </div>
        ) : (
          <div className="filtertype">
            <select onChange={handleFilterByType} defaultValue={selectedType}>
              <option value="">Tipo de Pokemon</option>
              {filterOptions
                .filter((option) => option.tipo !== "")
                .map((d, index) => (
                  <option key={index} value={d.tipo}>
                    {d.tipo}
                  </option>
                ))}
            </select>
          </div>
        )}

      {selectedPowerLevel ? (
        <div className="filterSelect1">
          <label>Ordena x ataque</label>
          <div className="choose">
          <p>{selectedPowerLevel}</p>
          <button onClick={handleResetPowerLevel} className="resetButton">X</button>
          </div>
        </div>
      ) : (
        <div className="filterSelect1">
          <label>Poder de ataque</label>
          <select onChange={handleOrderByScore} defaultValue={selectedPowerLevel}>
            <option value="">Selecioná una opción</option>
            <option value="Menor a mayor">Menor a mayor -/+</option>
            <option value="Mayor a menor">Mayor a menor +/-</option>
          </select>
        </div>
      )}

      {selectedAlphabeticalOrder ? (
        <div className="filterSelect2">
          <label>Orden alfabético</label>
          <div className="choose">
          <p>{selectedAlphabeticalOrder}</p>
          <button onClick={handleResetAlphabeticalOrder} className="resetButton">X</button>
          </div>
        </div>
      ) : (
        <div className="filterSelect2">
          <label>Orden alfabético</label>
          <select onChange={handleOrderByName} defaultValue={selectedAlphabeticalOrder}>
            <option value="">Selecioná una opción</option>
            <option value="Ascendiente A-Z">Ascendiente A-Z</option>
            <option value="Descendiente Z-A">Descendiente Z-A</option>
          </select>
        </div>
      )}

      
    </div>
  );
}

