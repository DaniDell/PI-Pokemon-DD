import axios from 'axios';

export const submitHandler = (formData, showAlert) => {
  // Ajusta el objeto formData para que coincida con la estructura deseada
  const formattedData = {
    name: formData.name,
    imagen: formData.imagen,
    vida: parseInt(formData.vida), // Convierte vida a un número entero
    ataque: parseInt(formData.ataque), // Convierte ataque a un número entero
    defensa: parseInt(formData.defensa), // Convierte defensa a un número entero
    velocidad: parseInt(formData.velocidad), // Convierte velocidad a un número entero
    altura: parseInt(formData.altura), // Convierte altura a un número entero
    peso: parseInt(formData.peso), // Convierte peso a un número entero
    types: formData.tipo.map((tipo) => ({ tipo })), // Mapea los tipos en el formato deseado
  };

  // Suponiendo que `formattedData` contiene los datos del Pokémon a enviar
  axios.post("http://localhost:3001/pokemon", formattedData)
    .then((res) => {
      console.log(res.data); // Puedes acceder a los datos de la respuesta si es necesario
      showAlert("success", "Pokemon created successfully!");
    })
    .catch((error) => {
      if (error.response) {
        // La solicitud fue realizada y el servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error creating user:", error.response.data.error);
        showAlert("error", error.response.data.error);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta del servidor
        console.error("No response from server:", error.request);
        showAlert("error", "No response from server");
      } else {
        // Se produjo un error al configurar la solicitud o al procesarla
        console.error("Error:", error.message);
        showAlert("error", error.message);
      }
    });
};
