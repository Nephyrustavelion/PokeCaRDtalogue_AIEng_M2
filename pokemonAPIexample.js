// // Can fetch Pokémon data using terminal - node pokemonAPIexample.js


// Example of fetching Pokémon data from the PokéAPI using both fetch with promises and async/await
// Documentation: https://tcgdex.dev/rest/card

const language = "en";
const cardId = "swsh3-136";
const API_URL = `https://api.tcgdex.net/v2/${language}/cards/${cardId}`;

// fetch(API_URL)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Could not fetch card: ${response.status}`);
//     }

//     return response.json();
//   })
//   .then((card) => {
//     console.log(card.name);       // Furret
//     console.log(card.hp);         // 110
//     console.log(card.types);      // ["Colorless"]
//     console.log(card.image);      // Image URL
//     console.log(card);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

async function fetchCardData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch card: ${response.status}`);
    }

    const card = await response.json();

    console.log(`Name: ${card.name}`);
    console.log(`HP: ${card.hp}`);
    console.log(`Types: ${card.types?.join(", ")}`);
    console.log(`Set: ${card.set?.name}`);
    console.log(`Image: ${card.image}`);
  } catch (error) {
    console.error(error);
  }
}

fetchCardData(API_URL);



// // Another example using the PokéAPI to fetch Pokémon data

// const API_key = "https://pokeapi.co/api/v2/pokemon/pikachu"; // Replace with your actual API key


// fetch(API_key)
//   .then((response) => {
//     if(!response.ok) {
//       throw new Error("Could not fetch data from the API");
//     }
//     return response.json();
//   })
//   .then((data) => console.log(data.weight))
//   .catch((error) => console.error(error));


  
// async function fetchPokemonData(API_key) {
//   try {
//     const response = await fetch(API_key);
//     if (!response.ok) {
//       throw new Error("Could not fetch data from the API");
//     }
//     const data = await response.json();
//     console.log(data.weight);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchPokemonData(API_key);





