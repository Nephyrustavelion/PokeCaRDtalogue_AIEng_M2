import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  type: "",
  rarity: "",
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
      note: formData.note.trim(),
      source: "user",
    };

    onAddCard(newCard);

    setFormData(INITIAL_FORM);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add My Card</h2>

      <label>
        Card Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Type
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>

      <label>
        Rarity
        <input
          type="text"
          name="rarity"
          value={formData.rarity}
          onChange={handleChange}
        />
      </label>

      <label>
        Personal Note
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add My Card</button>
    </form>
  );
}