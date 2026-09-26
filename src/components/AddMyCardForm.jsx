import { useState } from "react";
import "./AddMyCardForm.css";


const INITIAL_FORM = {
  name: "",
  type: "",
  rarity: "",
  image: "",
  note: "",
};

export default function AddMyCardForm({ onAddCard }) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const newCard = {
      id: `user-${Date.now()}`,
      name: formData.name.trim(),
      types: formData.type ? [formData.type.trim()] : [],
      rarity: formData.rarity.trim(),
      image: formData.image.trim() || null,
      note: formData.note.trim(),
      source: "user",
    };

    onAddCard(newCard);
    setFormData(INITIAL_FORM);
  };

  return (
    <div className="add-card-panel">
      <h2 className="add-card-title">Add My Card</h2>
      <p className="add-card-subtitle">
        Create your own card entry and save it to your collection.
      </p>

      <form className="add-card-form" onSubmit={handleSubmit}>
        <div className="add-card-grid">
          <div className="add-card-field">
            <label htmlFor="name">Card Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. My Pikachu"
              required
            />
          </div>

          <div className="add-card-field">
            <label htmlFor="type">Type</label>
            <input
              id="type"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. Electric"
            />
          </div>

          <div className="add-card-field">
            <label htmlFor="rarity">Rarity</label>
            <input
              id="rarity"
              type="text"
              name="rarity"
              value={formData.rarity}
              onChange={handleChange}
              placeholder="e.g. Rare"
            />
          </div>

          <div className="add-card-field">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="add-card-field add-card-field-full">
          <label htmlFor="note">Personal Note</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Why is this card special to you?"
            rows="4"
          />
        </div>

        <div className="add-card-actions">
          <button type="submit" className="add-card-button">
            Add My Card
          </button>
        </div>
      </form>
    </div>
  );
}