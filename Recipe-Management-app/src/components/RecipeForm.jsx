
import { useState } from "react";

const emptyForm = {
  title: "",
  category: "Dinner",
  time: "30",
  servings: "2",
  difficulty: "Easy",
  image: "",
  description: "",
  ingredientsText: "",
  instructionsText: "",
};

export default function RecipeForm({ initialRecipe, onSave }) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...(initialRecipe || {}),
    time: String(initialRecipe?.time ?? 30),
    servings: String(initialRecipe?.servings ?? 2),
    ingredientsText: (initialRecipe?.ingredients || []).join("\n"),
    instructionsText: (initialRecipe?.instructions || []).join("\n"),
  }));

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const ingredients = form.ingredientsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const instructions = form.instructionsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!form.title.trim()) {
      setError("Please enter a recipe name.");
      return;
    }

    if (!Number.isFinite(Number(form.time)) || Number(form.time) < 1) {
      setError("Cooking time must be at least 1 minute.");
      return;
    }

    if (!Number.isFinite(Number(form.servings)) || Number(form.servings) < 1) {
      setError("Servings must be at least 1.");
      return;
    }

    if (!ingredients.length || !instructions.length) {
      setError("Add at least one ingredient and one instruction.");
      return;
    }

    const image = form.image.trim() ||
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85";

    onSave({
      title: form.title.trim(),
      category: form.category,
      time: Number(form.time),
      servings: Number(form.servings),
      difficulty: form.difficulty,
      image,
      description: form.description.trim(),
      ingredients,
      instructions,
    });
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field full-width">
          Recipe name *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Creamy tomato pasta"
            required
            maxLength={100}
          />
        </label>

        <label className="form-field">
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Dessert</option>
            <option>Snacks</option>
            <option>Drinks</option>
          </select>
        </label>

        <label className="form-field">
          Difficulty
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label className="form-field">
          Cooking time (minutes)
          <input
            type="number"
            name="time"
            value={form.time}
            onChange={handleChange}
            min="1"
            max="1440"
            required
          />
        </label>

        <label className="form-field">
          Servings
          <input
            type="number"
            name="servings"
            value={form.servings}
            onChange={handleChange}
            min="1"
            max="100"
            required
          />
        </label>

        <label className="form-field full-width">
          Image URL
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/food.jpg"
          />
        </label>

        <label className="form-field full-width">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            maxLength={500}
            placeholder="Describe your recipe..."
          />
        </label>

        <label className="form-field full-width">
          Ingredients * (one per line)
          <textarea
            name="ingredientsText"
            value={form.ingredientsText}
            onChange={handleChange}
            rows="6"
            required
            placeholder={"2 tomatoes\n200g pasta\n1 tbsp olive oil"}
          />
        </label>

        <label className="form-field full-width">
          Cooking instructions * (one step per line)
          <textarea
            name="instructionsText"
            value={form.instructionsText}
            onChange={handleChange}
            rows="7"
            required
            placeholder={"Boil the pasta.\nPrepare the sauce.\nMix and serve."}
          />
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button type="reset" className="btn btn-secondary" onClick={() => {
          setForm({
            ...emptyForm,
            ...(initialRecipe || {}),
            time: String(initialRecipe?.time ?? 30),
            servings: String(initialRecipe?.servings ?? 2),
            ingredientsText: (initialRecipe?.ingredients || []).join("\n"),
            instructionsText: (initialRecipe?.instructions || []).join("\n"),
          });
          setError("");
        }}>
          Reset
        </button>

        <button type="submit" className="btn btn-primary">
          {initialRecipe ? "Save Changes" : "Save Recipe"}
        </button>
      </div>
    </form>
  );
}
