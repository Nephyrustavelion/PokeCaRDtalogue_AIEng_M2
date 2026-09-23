import { jsx as _jsx } from "react/jsx-runtime";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create one shared context so different pages/components
// can access the same user, cart, and collection state.
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Stores the currently logged-in user's name.
  const [user, setUser] = useState(null);

  // Stores cards temporarily selected from the catalogue.
  const [cart, setCart] = useState([]);

  // Load the user's personal collection from localStorage
  // when the application first starts.
  const [collection, setCollection] = useState(() => {
    const savedCollection = localStorage.getItem(
      "pokemonCollection",
    );

    // If a saved collection exists, convert the JSON string
    // back into a JavaScript array.
    return savedCollection
      ? JSON.parse(savedCollection)
      : [];
  });

  // Save the collection to localStorage whenever
  // the collection state changes.
  useEffect(() => {
    localStorage.setItem(
      "pokemonCollection",
      JSON.stringify(collection),
    );
  }, [collection]);

  // Simple mock login.
  const login = (name) => {
    setUser(name);
  };

  // Logging out clears the user and temporary cart.
  // The personal collection is kept because it is saved
  // in localStorage.
  const logout = () => {
    setUser(null);
    setCart([]);
  };

  // CREATE a cart item.
  // Prevent the same card from being added twice.
  const addToCart = (card) => {
    setCart((prev) => {
      const alreadyInCart = prev.some(
        (item) => item.card.id === card.id,
      );

      if (alreadyInCart) {
        return prev;
      }

      return [
        ...prev,
        {
          card,
        },
      ];
    });
  };

  // DELETE one card from the cart.
  const removeFromCart = (cardId) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.card.id !== cardId,
      ),
    );
  };

  // DELETE all cards from the cart.
  const clearCart = () => {
    setCart([]);
  };

  // Checks whether a card is already in the cart.
  const isInCart = (cardId) => {
    return cart.some(
      (item) => item.card.id === cardId,
    );
  };

  // CREATE
  // Adds a user-created card to the personal collection.
  const addToCollection = (card) => {
    setCollection((prev) => [
      ...prev,
      card,
    ]);
  };

  // UPDATE
  // Updates selected fields for one card in the collection.
  // In the current project this is used to update
  // the user's personal note.
  const updateCollectionCard = (
    cardId,
    updates,
  ) => {
    setCollection((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              ...updates,
            }
          : card,
      ),
    );
  };

  // DELETE
  // Removes one user-created card from the collection.
  const removeFromCollection = (cardId) => {
    setCollection((prev) =>
      prev.filter(
        (card) => card.id !== cardId,
      ),
    );
  };

  // Share state and functions with components
  // that use the useApp() custom hook.
  return _jsx(AppContext.Provider, {
    value: {
      user,
      login,
      logout,

      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,

      collection,
      addToCollection,
      updateCollectionCard,
      removeFromCollection,
    },

    children: children,
  });
}

// Custom hook used by components to access AppContext.
export function useApp() {
  const ctx = useContext(AppContext);

  // Helpful error if useApp() is called outside AppProvider.
  if (!ctx) {
    throw new Error(
      "useApp must be used within AppProvider",
    );
  }

  return ctx;
}