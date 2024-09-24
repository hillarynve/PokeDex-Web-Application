let currentPokemonID = null;

document.addEventListener("DOMContentLoaded", () => {
  const MAX_POKEMONS = 151;
  const pokemonID = new URLSearchParams(window.location.search).get("id");
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > MAX_POKEMONS) {
    return (window.location.href = "./index.html");
  }

  currentPokemonID = id;
  loadPokemon(id);
})


async function loadPokemon(id) {
  try {
    return true;
  }
  catch (error) {
    console.error("An error occured while fetching Pokemon data:", error);
    return false;
  }
}