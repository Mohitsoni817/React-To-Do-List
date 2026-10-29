
import { Link } from "react-router-dom";
import { Heart, BookOpen } from "lucide-react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { recipes, favorites } = useRecipes();

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <main className="page-container inner-page">
      <div className="page-heading">
        <span className="eyebrow">THE ONES YOU LOVE</span>
        <h1><Heart size={30} className="heading-heart" /> Your Favorites</h1>
        <p>All your saved favourites, together in one place.</p>
      </div>

      {favoriteRecipes.length ? (
        <>
          <p className="results-heading">
            {favoriteRecipes.length} saved recipe(s)
          </p>
          <div className="recipe-grid">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <Heart size={36} />
          <h3>No favourites yet</h3>
          <p>
            Tap the heart on any recipe to keep it in your favourites.
          </p>
          <Link to="/recipes" className="btn btn-primary">
            <BookOpen size={17} /> Explore Recipes
          </Link>
        </div>
      )}
    </main>
  );
}
