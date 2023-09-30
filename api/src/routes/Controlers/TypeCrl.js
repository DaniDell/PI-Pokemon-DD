const axios = require("axios");
const { Type } = require("../../db"); 
const typesLocal = [];

const getAllTypes = async () => {
  try {
    const contentTypeTester = await Type.findAll();
    if (contentTypeTester.length === 0) {
      const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
      apiTypes.data.results.forEach((type) => typesLocal.push({ tipo: type.name })); 
      await Type.bulkCreate(typesLocal);
    }

    const allTypes = await Type.findAll();

    return allTypes;
  } catch (error) {
    throw new Error("Error on get all types: " + error.message);
  }
};

module.exports = { getAllTypes };
