
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ChefHat } from "lucide-react";
import RecipeForm from "../components/RecipeForm.jsx";
import { useRecipes } from "../context/RecipeContext";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("edit");

  const { recipes, addRecipe, updateRecipe } = useRecipes();

  const existingRecipe = editId
    ? recipes.find((recipe) => recipe.id === editId)
    : null;

  function handleSave(recipeData) {
    if (editId && existingRecipe) {
      updateRecipe(editId, recipeData);
      navigate(`/recipes/${editId}`);
    } else {
      const recipe = addRecipe(recipeData);
      navigate(`/recipes/${recipe.id}`);
    }
  }

  if (editId && !existingRecipe) {
    return (
      <main className="page-container inner-page">
        <div className="empty-state">
          <h2>Recipe not found</h2>
          <p>The recipe may have been deleted.</p>
          <Link to="/recipes" className="btn btn-primary">
            View Recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container inner-page form-page">
      <Link to={existingRecipe ? `/recipes/${editId}` : "/recipes"} className="back-link">
        <ArrowLeft size={17} /> Back to {existingRecipe ? "recipe" : "recipes"}
      </Link>

      <div className="page-heading">
        <div className="form-heading-icon"><ChefHat size={27} /></div>
        <span className="eyebrow">YOUR KITCHEN, YOUR RULES</span>
        <h1>{existingRecipe ? "Edit Recipe" : "Create a Recipe"}</h1>
        <p>
          {existingRecipe
            ? "Update the details of your favourite dish."
            : "Capture the ingredients and steps behind your next great dish."}
        </p>
      </div>

      <RecipeForm
        key={existingRecipe?.id || "new-recipe"}
        initialRecipe={existingRecipe}
        onSave={handleSave}
      />
    </main>
  );
}
