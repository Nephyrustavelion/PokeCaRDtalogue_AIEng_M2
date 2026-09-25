// // Can fetch Pokémon data using terminal - node pokemonAPIexample.js


// Example of fetching Pokémon data from the PokéAPI using both fetch with promises and async/await
// Documentation: https://tcgdex.dev/rest/card

const language = "en";
const cardId = "swsh3-136";
const API_URL = `https://api.tcgdex.net/v2/${language}/cards/${cardId}`;

fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not fetch card: ${response.status}`);
    }

    return response.json();
  })
  .then((card) => {
    console.log(card.name);       // Furret
    console.log(card.hp);         // 110
    console.log(card.types);      // ["Colorless"]
    console.log(card.image);      // Image URL
    console.log(card);
  })
  .catch((error) => {
    console.error(error);
  });

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
    console.log(`Rarity: ${card.rarity}`);
  } catch (error) {
    console.error(error);
  }
}

fetchCardData(API_URL);


///

// const BASE_URL = "https://api.tcgdex.net/v2/en";

// async function fetchJson(url, retries = 3) {
//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       if (attempt === retries) {
//         throw error;
//       }

//       console.warn(`Request failed. Retrying (${attempt}/${retries})...`);
//       await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
//     }
//   }
// }

// async function fetchAllCards() {
//   const pageSize = 100;
//   const allCards = [];

//   for (let page = 1; ; page++) {
//     const url =
//       `${BASE_URL}/cards` +
//       `?pagination:page=${page}` +
//       `&pagination:itemsPerPage=${pageSize}`;

//     const cards = await fetchJson(url);

//     allCards.push(...cards);
//     console.log(`Page ${page}: fetched ${cards.length} cards`);

//     // A partially filled page is the final page.
//     if (cards.length < pageSize) {
//       break;
//     }
//   }

//   return allCards;
// }

// async function getAvailableValues() {
//   try {
//     // These endpoints are small enough to request concurrently.
//     const [types, rarities, sets] = await Promise.all([
//       fetchJson(`${BASE_URL}/types`),
//       fetchJson(`${BASE_URL}/rarities`),
//       fetchJson(`${BASE_URL}/sets`),
//     ]);

//     // Fetch the large cards collection page by page.
//     const cards = await fetchAllCards();

//     const setNames = sets
//       .map((set) => set.name)
//       .filter(Boolean)
//       .sort();

//     const uniqueNames = [
//       ...new Set(cards.map((card) => card.name).filter(Boolean)),
//     ].sort();

//     console.log("\nTypes:", types);
//     console.log("\nRarities:", rarities);
//     console.log("\nTotal sets:", setNames.length);
//     console.log("Set names:", setNames);
//     console.log("\nTotal card records:", cards.length);
//     console.log("Total unique card names:", uniqueNames.length);
//     console.log("Unique card names:", uniqueNames);
//   } catch (error) {
//     console.error("TCGdex request failed:", error.message);
//   }
// }

// getAvailableValues();



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





