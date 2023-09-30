const { Router } = require ('express');
const { getAllTypes } = require ("../routes/Controlers/TypeCrl")

const typeRouter = Router();


typeRouter.get("/", async (req, res) => {
  try {
    const allTypesPokemon = await getAllTypes()

    res.status(200).json(allTypesPokemon)
  } catch (error) {
    res.status(400).json({error: `error on get / types: ${error.message}`})
  }
})

module.exports = typeRouter;