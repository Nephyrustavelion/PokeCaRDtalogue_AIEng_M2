// Thin wrapper around the TCGdex REST API (https://tcgdex.dev/rest).
// Handles metadata lookups (types/rarities/sets) used to populate the filter
// sidebar, plus server-side filtered + paginated card fetching so the app
// never has to download the full ~24k card catalogue at once.

const DETAIL_BATCH_SIZE = 12;
const REQUEST_TIMEOUT_MS = 8000;

// The public TCGdex API's /en/types and /en/rarities endpoints are known to
// be slow (10s+) or intermittently 503 under load. Both lists are small,
// stable enumerations that rarely change, so we ship them statically and
// skip the network round-trip entirely - this removes the two most common
// causes of the sidebar getting stuck in a "Failed to fetch" state.
const STATIC_TYPES = [
  "Colorless",
  "Darkness",
  "Dragon",
  "Fairy",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Metal",
  "Psychic",
  "Water",
];

const STATIC_RARITIES = [
  "ACE SPEC Rare",
  "Amazing Rare",
  "Black White Rare",
  "Classic Collection",
  "Common",
  "Crown",
  "Double rare",
  "Four Diamond",
  "Full Art Trainer",
  "Futuristic Rare",
  "Holo Rare",
  "Holo Rare V",
  "Holo Rare VMAX",
  "Holo Rare VSTAR",
  "Hyper rare",
  "Illustration rare",
  "LEGEND",
  "Mega Hyper Rare",
  "None",
  "One Diamond",
  "One Shiny",
  "One Star",
  "Pikachu Rare",
  "Promo",
  "Radiant Rare",
  "Rare",
  "Rare Holo",
  "Rare Holo LV.X",
  "Rare PRIME",
  "Secret Rare",
  "Shiny Ultra Rare",
  "Shiny rare",
  "Shiny rare V",
  "Shiny rare VMAX",
  "Special illustration rare",
  "Three Diamond",
  "Three Star",
  "Two Diamond",
  "Two Shiny",
  "Two Star",
  "Ultra Rare",
  "Uncommon",
];

function getTcgDexApiConfig() {
  const baseUrl = import.meta.env.VITE_TCGDEX_API_BASE_URL?.replace(/\/+$/, "");
  const endpoint = import.meta.env.VITE_TCGDEX_API_CARDS_ENDPOINT;

  if (!baseUrl || !endpoint) return null;

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return { baseUrl, endpoint: normalizedEndpoint };
}

async function fetchJson(url, retries = 2) {
  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok)
        throw new Error(`TCGdex request failed with ${response.status}`);
      return await response.json();
    } catch (error) {
      if (attempt >= retries) throw error;
      // Transient network hiccups (and slow/503 responses) are common against
      // the public API; back off and retry rather than hanging indefinitely.
      await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

function toTcgDexCard(card) {
  return {
    id: card.id,
    name: card.name,
    image: card.image ?? "",
    types: card.types ?? [],
    rarity: card.rarity ?? "None",
    hp: card.hp,
    setName: card.set?.name,
  };
}

/**
 * The full list of Pokémon card types. This is a stable, small enumeration
 * so it's shipped statically instead of hitting the (often slow/503) /en/types
 * endpoint on every load.
 */
export async function fetchCardTypes() {
  return STATIC_TYPES;
}

/**
 * The full list of card rarities. Shipped statically for the same reason as
 * fetchCardTypes above - the /en/rarities endpoint is unreliable and this
 * list rarely changes.
 */
export async function fetchCardRarities() {
  return STATIC_RARITIES;
}

/** GET /en/sets - the full list of set names, alphabetised. */
export async function fetchCardSetNames() {
  const config = getTcgDexApiConfig();
  if (!config)
    throw new Error("TCGdex environment configuration is missing or invalid");
  const sets = await fetchJson(`${config.baseUrl}/en/sets`);
  const names = Array.isArray(sets)
    ? sets.map((set) => set.name).filter(Boolean)
    : [];
  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}

/**
 * Fetches one page of cards matching the given filters, using the API's own
 * filtering/pagination so we only ever download the current page of results.
 * The brief list response is then expanded with per-card detail requests
 * (batched) to obtain type/rarity/set data for display.
 */
export async function fetchCardsPage({
  search,
  types,
  rarities,
  setNames,
  page,
  limit,
}) {
  const config = getTcgDexApiConfig();
  if (!config)
    throw new Error("TCGdex environment configuration is missing or invalid");

  const params = new URLSearchParams();
  if (search?.trim()) params.set("name", search.trim());
  if (types?.length) params.set("types", types.join(","));
  if (rarities?.length) params.set("rarity", rarities.join(","));
  if (setNames?.length) params.set("set.name", setNames.join(","));
  params.set("pagination:page", String(page));
  params.set("pagination:itemsPerPage", String(limit));

  const listUrl = `${config.baseUrl}${config.endpoint}?${params.toString()}`;
  const briefs = await fetchJson(listUrl);
  const results = Array.isArray(briefs) ? briefs : [];

  // Some card IDs (e.g. the Unown "!"/"?" cards) 404 on the detail endpoint.
  // Use allSettled so one bad ID doesn't drop the whole page.
  const cards = [];
  for (let i = 0; i < results.length; i += DETAIL_BATCH_SIZE) {
    const batch = results.slice(i, i + DETAIL_BATCH_SIZE);
    const settled = await Promise.allSettled(
      batch.map((card) =>
        fetchJson(`${config.baseUrl}${config.endpoint}/${card.id}`),
      ),
    );
    settled.forEach((outcome, index) => {
      if (outcome.status === "fulfilled") {
        cards.push(toTcgDexCard(outcome.value));
      } else {
        cards.push(toTcgDexCard(batch[index]));
      }
    });
  }

  return { cards, hasNextPage: results.length === limit };
}
