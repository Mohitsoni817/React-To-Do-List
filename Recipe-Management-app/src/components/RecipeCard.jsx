
import { Link } from "react-router-dom";
import {
  Clock3,
  Heart,
  Users,
  Trash2,
  Pencil,
  ArrowUpRight,
} from "lucide-react";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite, deleteRecipe } = useRecipes();

  const favorite = isFavorite(recipe.id);

  function handleDelete() {
    if (window.confirm(`Delete "${recipe.title}"?`)) {
      deleteRecipe(recipe.id);
    }
  }

  return (
    <article className="recipe-card">
      <Link
        to={`/recipes/${recipe.id}`}
        className="recipe-image-wrap"
        aria-label={`View ${recipe.title}`}
      >
        <img
          className="recipe-image"
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
        />
        <span className="category-badge">{recipe.category}</span>
      </Link>

      <button
        type="button"
        className={`favorite-button ${favorite ? "is-favorite" : ""}`}
        onClick={() => toggleFavorite(recipe.id)}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={19} fill={favorite ? "currentColor" : "none"} />
      </button>

      <div className="recipe-card-body">
        <div className="recipe-meta">
          <span><Clock3 size={14} /> {recipe.time} min</span>
          <span><Users size={14} /> {recipe.servings} servings</span>
        </div>

        <Link to={`/recipes/${recipe.id}`} className="recipe-title">
          {recipe.title}
        </Link>

        <p className="recipe-description">{recipe.description}</p>

        <div className="recipe-card-footer">
          <span className="difficulty">{recipe.difficulty}</span>

          <div className="card-actions">
            <Link
              to={`/add-recipe?edit=${recipe.id}`}
              className="icon-button"
              aria-label="Edit recipe"
              title="Edit recipe"
            >
              <Pencil size={15} />
            </Link>

            <button
              type="button"
              className="icon-button danger-button"
              onClick={handleDelete}
              aria-label="Delete recipe"
              title="Delete recipe"
            >
              <Trash2 size={15} />
            </button>

            <Link
              to={`/recipes/${recipe.id}`}
              className="icon-button"
              aria-label="View recipe"
              title="View recipe"
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
