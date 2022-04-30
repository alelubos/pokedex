let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"],
    },
    {
      name: "Sandslash",
      height: 1,
      types: ["ground"],
    },
    {
      name: "Onix",
      height: 8.8,
      types: ["rock", "ground"],
    },
    {
      name: "Oddish",
      height: 0.5,
      types: ["grass", "poison"],
    },
    {
      name: "Paras",
      height: 0.3,
      types: ["grass", "bug"],
    },
    {
      name: "Pikachu",
      height: 0.4,
      types: ["ground"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (pokemon.name && pokemon.height && pokemon.types) {
      pokemonList.push(pokemon);
    } else {
      alert("Invalid Pokemon! won't be added to the list... Please try again!");
    }
  }

  function addListItem(pokemon) {
    // select List & create list item
    let ul = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.addEventListener("click", showDetails);
    button.classList.add("pokemon-list__item--button");

    // Add item to list
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon.target.innerText);
    console.log(pokemon);
    pokemon.target.blur();
  }

  function filter(name) {
    let nameLowCase = name.toLowerCase();
    let result = pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === nameLowCase
    )[0];
    return result || "Pokemon not found!";
  }

  return {
    getAll,
    add,
    addListItem,
    filter,
  };
})();

// Create list of Pokemons
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
