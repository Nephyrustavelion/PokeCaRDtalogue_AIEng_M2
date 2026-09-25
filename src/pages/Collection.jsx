import { useState } from "react";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import PokemonCardTile from "../components/PokemonCardTile";
import "./Collection.css";

export default function Collection() {
  // Shared collection state and actions from AppContext.
  const {
    collection,
    addToCart,
    isInCart,
    updateCollectionCard,
    removeFromCollection,
  } = useApp();

  // Stores the card currently being edited.
  const [editingCard, setEditingCard] = useState(null);

  // Controlled input state for the personal note.
  const [editNote, setEditNote] = useState("");

  // Start editing a card and load its current note.
  const handleEditCard = (card) => {
    setEditingCard(card);
    setEditNote(card.note || "");
  };

  // Save the updated note back into the shared collection state.
  const handleSaveEdit = () => {
    if (!editingCard) return;

    updateCollectionCard(editingCard.id, {
      note: editNote.trim(),
    });

    // Close the edit panel after saving.
    setEditingCard(null);
    setEditNote("");
  };

  // Cancel editing without changing the card.
  const handleCancelEdit = () => {
    setEditingCard(null);
    setEditNote("");
  };

  return (
    <div className="app-page">
      {/* Reuse the same navigation bar used by the other pages */}
      <Navbar />

      <main className="app-shell collection-page">
        {/* Page heading */}
        <div className="collection-header">
          <h1 className="collection-title">My Collection</h1>

          <p className="collection-subtitle">
            Manage the Pokémon cards you added to your personal collection.
          </p>
        </div>

        {/* Show edit panel only when a card has been selected */}
        {editingCard && (
          <div className="collection-edit-panel">
            <h2 className="collection-edit-title">
              Edit Personal Note
            </h2>

            <p className="collection-edit-card-name">
              Editing: {editingCard.name}
            </p>

            {/* Controlled textarea */}
            <textarea
              value={editNote}
              onChange={(event) => setEditNote(event.target.value)}
              rows="4"
              placeholder="Update your personal note"
            />

            <div className="collection-edit-actions">
              {/* Save updated note */}
              <button
                type="button"
                onClick={handleSaveEdit}
                className="collection-save-button"
              >
                Save
              </button>

              {/* Cancel editing */}
              <button
                type="button"
                onClick={handleCancelEdit}
                className="collection-cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Show number of cards currently stored */}
        <p className="collection-count">
          {collection.length} card
          {collection.length === 1 ? "" : "s"} in collection
        </p>

        {/* Empty-state message */}
        {collection.length === 0 ? (
          <div className="collection-empty">
            You have not added any cards yet.
          </div>
        ) : (
          /* Render all user-created collection cards */
          <div className="catalogue-grid grid gap-4">
            {collection.map((card) => (
              <PokemonCardTile
                key={card.id}
                card={card}

                // Check whether the card is already in the cart.
                inCart={isInCart(card.id)}

                // Allow the card to be added to the cart.
                onAddToCart={addToCart}

                // Open the personal-note edit panel.
                onEditCard={handleEditCard}

                // Remove the card from the collection.
                onDeleteCard={removeFromCollection}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}