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
    filter,
  };
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 0.4,
  types: ["ground"],
});

console.log(pokemonRepository.filter("Pikachu"));

// Write a title and opening tag for Pokemon list
document.write("<h1>My selection of Pokemon</h1><ul>");

// Create list of Pokemons
pokemonRepository.getAll().forEach((pokemon) => {
  // create item text
  let itemText = `<b>${pokemon.name}</b> (height: ${pokemon.height})`;
  // add special comment for Big Pokemon
  if (pokemon.height > 5) itemText += "<span> - Wow, that's big!</span>";
  // Write item text to document
  document.write(`<li>${itemText}</li>`);
});

// Write the list closing tag
document.write("</ul>");
