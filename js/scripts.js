let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (pokemon.name && pokemon.detailsUrl) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct!");
    }
  }

  function addListItem(pokemon) {
    // select List & create list item
    let ul = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.addEventListener("click", (event) => {
      showDetails(pokemon);
      event.target.blur();
    });
    button.classList.add("pokemon-list__item--button");

    // Add item to list
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => console.log(pokemon));
  }

  function filter(name) {
    let nameLowCase = name.toLowerCase();
    let result = pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === nameLowCase
    )[0];
    return result || "Pokemon not found!";
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((err) => console.log(err));
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((res) => res.json())
      .then((details) => {
        //Now we add details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
      })
      .catch((err) => console.log(err));
  }

  return {
    getAll,
    add,
    loadList,
    loadDetails,
    addListItem,
  };
})();

// Create list of Pokemons
pokemonRepository.loadList().then(() => {
  // Now the data is loaded
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
