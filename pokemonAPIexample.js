const API_key = "https://pokeapi.co/api/v2/pokemon/pikachu"; // Replace with your actual API key


fetch(API_key)
  .then((response) => {
    if(!response.ok) {
      throw new Error("Could not fetch data from the API");
    }
    return response.json();
  })
  .then((data) => console.log(data.weight))
  .catch((error) => console.error(error));


  
async function fetchPokemonData(API_key) {
  try {
    const response = await fetch(API_key);
    if (!response.ok) {
      throw new Error("Could not fetch data from the API");
    }
    const data = await response.json();
    console.log(data.weight);
  } catch (error) {
    console.error(error);
  }
}

fetchPokemonData(API_key);
