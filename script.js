async function fetchPokemonData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=102');
        if (!response.ok) {
          throw new Error('Network response was not OK.');
        }
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching Pokemon data:', error.message);
        return [];
      }
    }

    function displayPokemon(pokemonList) {
      const pokemonContainer = document.getElementById('pokemonContainer');
      pokemonContainer.innerHTML = '';

      pokemonList.forEach((pokemon) => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const pokemonName = document.createElement('p');
        pokemonName.textContent = pokemon.name;
        pokemonName.classList.add('pokemon-name');

        const pokemonImage = document.createElement('img');
        const pokemonId = getPokemonIdFromUrl(pokemon.url);
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        pokemonImage.alt = pokemon.name;
        pokemonImage.classList.add('pokemon-image');

        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonContainer.appendChild(pokemonCard);
      });
    }

    function getPokemonIdFromUrl(url) {
      const parts = url.split('/');
      return parts[parts.length - 2];
    }

    // Fetch data and display Pokemon when the page loads
    window.onload = async () => {
      const pokemonList = await fetchPokemonData();
      displayPokemon(pokemonList);
    };