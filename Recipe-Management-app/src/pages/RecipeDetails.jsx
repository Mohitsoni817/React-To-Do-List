
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, Users, Heart, Pencil, Trash2 } from "lucide-react";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    recipes,
    deleteRecipe,
    isFavorite,
    toggleFavorite,
  } = useRecipes();

  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <main className="page-container inner-page">
        <div className="empty-state">
          <h2>Recipe not found</h2>
          <p>This recipe does not exist or may have been deleted.</p>
          <Link to="/recipes" className="btn btn-primary">
            <ArrowLeft size={17} /> Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  function handleDelete() {
    if (window.confirm(`Delete "${recipe.title}"?`)) {
      deleteRecipe(recipe.id);
      navigate("/recipes");
    }
  }

  const favorite = isFavorite(recipe.id);

  return (
    <main className="page-container inner-page">
      <Link to="/recipes" className="back-link">
        <ArrowLeft size={17} /> Back to Recipes
      </Link>

      <section className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
        <div className="detail-overlay" />

        <div className="detail-title">
          <span className="category-badge">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p>{recipe.description || "A delicious recipe to add to your collection."}</p>

          <div className="detail-meta">
            <span><Clock3 size={16} /> {recipe.time} minutes</span>
            <span><Users size={16} /> {recipe.servings} servings</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </section>

      <div className="detail-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => toggleFavorite(recipe.id)}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
          {favorite ? "Saved" : "Add to Favorites"}
        </button>

        <Link
          to={`/add-recipe?edit=${recipe.id}`}
          className="btn btn-primary"
        >
          <Pencil size={16} /> Edit Recipe
        </Link>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleDelete}
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      <div className="detail-columns">
        <section className="detail-panel">
          <span className="eyebrow">WHAT YOU WILL NEED</span>
          <h2>Ingredients</h2>
          <p className="muted">{recipe.ingredients.length} ingredients</p>

          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>
                <span className="ingredient-dot" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail-panel">
          <span className="eyebrow">LET'S GET COOKING</span>
          <h2>Instructions</h2>
          <p className="muted">Follow these steps to prepare your dish.</p>

          <ol className="instruction-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={`${instruction}-${index}`}>
                <span className="step-number">{index + 1}</span>
                <div><p>{instruction}</p></div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
