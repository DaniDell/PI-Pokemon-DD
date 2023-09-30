export default function validatePokemon(inputs) {
    const errors = {};
  
    if (inputs.name === "") {
      errors.name = "El nombre no puede quedar en blanco.";
    } else if (inputs.name.length > 255) {
      errors.name = "No puede exceder los 255 caracteres.";
    } else if (!/^\S+$/.test(inputs.name)) {
      errors.name = "Solo debes colocar 1 nombre sin espacios en blanco.";
    }
  
    if (inputs.imagen === "") {
      errors.imagen = "Falta la URL de la imagen.";
    } else {
      const allowedExtensions = /\.(jpg|jpeg|png)$/i;
      if (!allowedExtensions.test(inputs.imagen)) {
        errors.imagen = "La URL debe terminar en .jpg o .png";
      }
      if (inputs.imagen.length > 255) {
        errors.imagen = "No puede exceder los 255 caracteres.";
      }
    }
    
  
    if (inputs.vida < 0 || inputs.vida > 1000 || inputs.vida === "") {
      errors.vida = "Vida requiere un número entre 0 y 1000.";
    }
  
    if (inputs.ataque < 0 || inputs.ataque > 1000 || inputs.ataque === "") {
      errors.ataque = "Ataque requiere un número entre 0 y 1000.";
    }
  
    if (inputs.defensa < 0 || inputs.defensa > 1000 || inputs.defensa === "") {
      errors.defensa = "Defensa requiere un número entre 0 y 1000.";
    }
  
    if (inputs.velocidad < 0 || inputs.velocidad > 1000 || inputs.velocidad === "" ) {
      errors.velocidad = "Velocidad requiere un número entre 0 y 1000.";
    }
  
    if (inputs.altura < 0 || inputs.altura > 10 || inputs.altura === "") {
      errors.altura = "Altura requiere un número entre 0 y 10.";
    }
  
    if (inputs.peso < 0 || inputs.peso > 1000 || inputs.peso === "") {
      errors.peso = "Peso requiere un valor 0 y 1000.";
    }
  
   
  
    return errors;
  }
  