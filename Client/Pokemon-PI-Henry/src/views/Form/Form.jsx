import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { submitHandler } from "./HandleSubmit";
import validatePokemon from "./validation";
import "./Form.css"; // Importa el archivo de estilos Form.css

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    imagen: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    tipo: [],
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  const [errors, setErrors] = useState({});

  const [isTypeSelected, setIsTypeSelected] = useState(false);



  function clearForm() {
    setFormData({
      name: "",
      imagen: "",
      vida: "",
      ataque: "",
      defensa: "",
      velocidad: "",
      altura: "",
      peso: "",
      tipo: [],
    });
    setErrors({});
  }
  

  // Función para manejar cambios en los campos de entrada
  function handleInputChange(event) {
    const { name, value } = event.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
 
   

  // Función para manejar la selección de tipos de Pokémon
  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    const updatedTypes = checked
      ? [...formData.tipo, value]
      : formData.tipo.filter((type) => type !== value);
    
    setFormData({
      ...formData,
      tipo: updatedTypes,
    });
  
    // Verifica si al menos un tipo está seleccionado
    setIsTypeSelected(updatedTypes.length > 0);
  };
  

  function showAlert(type, message) {
    setAlert({ type, message });
    if (type === "success") {
      clearForm();
    }
  }

  // Función para manejar la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validatePokemon(formData);
    setErrors(validationErrors);
  
    // Verifica si hay errores de validación
    const hasErrors = Object.values(validationErrors).some((error) => error);
  
    if (!isTypeSelected) {
      // Muestra un mensaje de error si no se ha seleccionado ningún tipo
      showAlert("error", "Debes seleccionar al menos un tipo de Pokémon.");
    } else if (hasErrors) {
      // Muestra un mensaje de error si hay errores de validación en otros campos
      showAlert("error", "Por favor, completa los campos correctamente.");
    } else {
      // Si no hay errores de validación y se ha seleccionado al menos un tipo, convierte los datos a minúsculas
      const lowercaseFormData = {
        ...formData,
        // Convierte aquí los campos que desees a minúsculas
        name: formData.name.toLowerCase(),
        // Otros campos que necesites convertir
      };
  
      // Llama a submitHandler con los datos en minúsculas
      submitHandler(lowercaseFormData, showAlert);
    }
  };
  

  // Lista de todos los nombres de tipos de Pokémon
  const allPokemonTypes = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow",
  ];

  

  return (
    <div className="create"> 
      <h1>Completá los datos de tu pokemon:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 

          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name && "danger"}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="text"
            name="imagen"
            placeholder="Escriba una URL aquí" 
            value={formData.imagen}
            onChange={handleInputChange}
            className={errors.imagen && "danger"}
            />
            {errors.imagen && <span className="error-message">{errors.imagen}</span>}
        </div>
        <div className="form-columns">
  <div className="form-column">
    <div className="form-group">
      <label>Vida:</label>
      <input
        type="number"
        name="vida"
        value={formData.vida}
        onChange={handleInputChange}
        className={errors.vida && "danger"}
      />
      {errors.vida && <span className="error-message">{errors.vida}</span>}
    </div>

    <div className="form-group">
      <label>Ataque:</label>
      <input
        type="number"
        name="ataque"
        value={formData.ataque}
        onChange={handleInputChange}
        className={errors.ataque && "danger"}
      />
      {errors.ataque && <span className="error-message">{errors.ataque}</span>}
    </div>

    <div className="form-group">
      <label>Defensa:</label>
      <input
        type="number"
        name="defensa"
        value={formData.defensa}
        onChange={handleInputChange}
        className={errors.defensa && "danger"}
      />
      {errors.defensa && <span className="error-message">{errors.defensa}</span>}
    </div>
  </div>

  <div className="form-column">
    <div className="form-group">
      <label>Velocidad:</label>
      <input
        type="number"
        name="velocidad"
        value={formData.velocidad}
        onChange={handleInputChange}
        className={errors.velocidad && "danger"}
      />
      {errors.velocidad && <span className="error-message">{errors.velocidad}</span>}
    </div>

    <div className="form-group">
      <label>Altura:</label>
      <input
        type="number"
        name="altura"
        value={formData.altura}
        onChange={handleInputChange}
        className={errors.altura && "danger"}
      />
      {errors.altura && <span className="error-message">{errors.altura}</span>}
    </div>

    <div className="form-group">
      <label>Peso:</label>
      <input
        type="number"
        name="peso"
        value={formData.peso}
        onChange={handleInputChange}
        className={errors.peso && "danger"}
      />
      {errors.peso && <span className="error-message">{errors.peso}</span>}
    </div>
  </div>
</div>


        <div className="form-group"> 
          <label>Tipo: (debes elegir por lo menos 1 tipo)</label>
    
          <div className="check-group">
  {allPokemonTypes.map((type) => (
    <div className="checkbox-item" key={type}>
      <input
        type="checkbox"
        name="tipo"
        value={type}
        checked={formData.tipo.includes(type)}
        onChange={handleTypeChange}
      />
      <label>{type}</label>
    </div>
  ))}
</div>

        </div>
        {alert.message && (
  <span className={`create-alert ${alert.type}`}>
    {alert.message}
    <button onClick={() => setAlert({ type: "", message: "" })}>x</button>
  </span>
)}
<div className="buttonCreate">
        <button type="submit" >Crear Pokémon</button>
        </div>
      </form>
      <div>
        <NavLink className="back" to={"/home"}>
          Volver 🏠
        </NavLink>
      </div>
    </div>
  );
};

export default Form;
