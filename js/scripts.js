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
    loadDetails(pokemon).then(() => {
      //console.log(pokemon);
      modal.show(pokemon.name, pokemon.height, pokemon.types, pokemon.svgUrl);
    });
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
        item.svgUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
      })
      .catch((err) => console.log(err));
  }

  let modal = (function () {
    let modalContainer = document.querySelector("#modal-container");

    function show(name, height, types, svgUrl) {
      modalContainer.innerHTML = "";
      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButton = document.createElement("button");
      closeButton.classList.add("modal__close-button");
      closeButton.innerText = "close";
      closeButton.addEventListener("click", hideModal);

      let pokemonName = document.createElement("h1");
      pokemonName.innerText = name;

      let pokemonImage = document.createElement("img");
      pokemonImage.setAttribute("src", svgUrl);

      let pokemonHeight = document.createElement("p");
      pokemonHeight.innerText = "Height: " + height;

      let pokemonTypes = document.createElement("p");
      pokemonTypes.innerText = "Types: " + types.join(", ");

      let textContainer = document.createElement("div");
      textContainer.classList.add("modal__text-container");
      textContainer.appendChild(pokemonName);
      textContainer.appendChild(pokemonHeight);
      textContainer.appendChild(pokemonTypes);

      modal.appendChild(closeButton);
      modal.appendChild(pokemonImage);
      modal.appendChild(textContainer);

      modalContainer.appendChild(modal);
      modalContainer.classList.add("is-visible");
    }

    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }

    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });

    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        hideModal();
      }
    });

    return {
      show,
    };
  })();

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
  pokemonRepository
    .getAll()
    .sort((a, b) => a.name > b.name)
    .forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
});
