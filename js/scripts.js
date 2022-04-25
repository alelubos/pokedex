let pokemonList = [];

pokemonList.push(
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
  }
);
// Write a title and opening tag for Pokemon list
document.write("<h1>My selection of Pokemon</h1><ul>");

// Write list of Pokemons
for (let i = 0; i < pokemonList.length; i++) {
  let text = `${pokemonList[i].name} (height: ${pokemonList[i].height})`;

  // Add comment for Big pokemon
  if (pokemonList[i].height > 5) {
    text += " - Wow, that's big!";
  }
  document.write(`<li>${text}</li>`);
}

// Write the closing tag of the list
document.write("</ul>");
