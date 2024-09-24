const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

// fetch data from pokeAPI
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) => {
  allPokemons = data.results;
  displayPokemons(allPokemons);
});

// for when we click on the pokemon
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
      res.json()
    ),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
      res.json()
    ),
  ]);
  return true
  } catch(error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

function displayPokemons(pokemon) {
  // empty wrapper so when we reload page, don't load extra pokemon on top
  listWrapper.innerHTML = "";

  // use id to target each pokemon
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
      </div>
      <div class="image-wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">#${pokemon.name}</p>
      </div>
    `;

    // click event to take us to the detail page of every pokemon
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });

    // add all items to list wrapper
    listWrapper.appendChild(listItem);

  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemons;
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}


