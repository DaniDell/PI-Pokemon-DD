import { GET_POKEMONS , FILTER_BY_TYPE, ORDER_BY_NAME, ORDER_BY_SCORE, 
    GET_NAME, SEARCH_BY_NAME , RESET_FILTERS, SET_PAGE} from "./actions";
  
  const initialState = {
    pokemons: [],
    filterPokemons: [ ],
    currentPage: 1,
    selectedType: "",
    selectedPowerLevel: "",
    selectedAlphabeticalOrder: "",
  };
  
  function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: payload,
          filterPokemons: payload,
        };
  
      case RESET_FILTERS:
        return {
          ...state,
          filterPokemons: state.pokemons,
          selectedType: "",
          selectedPowerLevel: "",
          selectedAlphabeticalOrder: "",
        };
  
      case SET_PAGE:
        return {
          ...state,
          currentPage: payload,
        };
  
      case FILTER_BY_TYPE:
        if (payload === "") {
          return {
            ...state,
            filterPokemons: state.pokemons,
            selectedType: "",
          };
        }
        return {
          ...state,
          filterPokemons: state.filterPokemons.filter((filterPokemons) => {
            // Verificar si el tipo está presente en el array de tipos del Pokémon
            return filterPokemons.types.some((type) => type.tipo === payload);
          }),
          selectedType: payload,
          selectedPowerLevel: "",
          selectedAlphabeticalOrder: "",
        };
  
      case ORDER_BY_NAME:
        let sortedArr =
          payload === "Ascendiente A-Z"
            ? [...state.filterPokemons].sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
            : [...state.filterPokemons].sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
              });
        return {
          ...state,
          filterPokemons: sortedArr,
          selectedPowerLevel: "",
          selectedAlphabeticalOrder: payload,
        };
  
      case ORDER_BY_SCORE:
        let scoreArr =
          payload === "Mayor a menor"
            ? [...state.filterPokemons].sort(function (a, b) {
                if (a.ataque > b.ataque) return -1;
                if (a.ataque < b.ataque) return 1;
                return 0;
              })
            : [...state.filterPokemons].sort(function (a, b) {
                if (a.ataque > b.ataque) return 1;
                if (a.ataque < b.ataque) return -1;
                return 0;
              });
        return {
          ...state,
          filterPokemons: scoreArr,
          selectedPowerLevel: payload,
          selectedAlphabeticalOrder: "",
        };
  
      case GET_NAME:
        return {
          ...state,
          filterPokemons: state.pokemons.filter(
            (pokemon) =>
              pokemon.name.toLowerCase().includes(payload) ||
              pokemon.name.toLowerCase().startsWith(payload) ||
              pokemon.name.toLowerCase().endsWith(payload)
          ),
          selectedType: "",
          selectedPowerLevel: "",
          selectedAlphabeticalOrder: "",
        };
  
      case SEARCH_BY_NAME:
        const searchTerm = payload.toLowerCase();
        const filteredByName = state.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm)
        );
        return {
          ...state,
          filterPokemons: filteredByName,
          selectedType: "",
          selectedPowerLevel: "",
          selectedAlphabeticalOrder: "",
          currentPage: 1,
        };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;