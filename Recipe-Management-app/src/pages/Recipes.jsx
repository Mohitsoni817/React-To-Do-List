
import { useMemo, useState } from "react";
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const { recipes } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesSearch = [
        recipe.title,
        recipe.description,
        recipe.category,
        ...(recipe.ingredients || []),
      ].some((value) => String(value || "").toLowerCase().includes(query));

      const matchesCategory =
        category === "All" || recipe.category === category;

      const matchesDifficulty =
        difficulty === "All" || recipe.difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recipes, search, category, difficulty]);

  return (
    <main className="page-container inner-page">
      <div className="page-heading">
        <span className="eyebrow">YOUR PERSONAL COOKBOOK</span>
        <h1><BookOpen size={31} /> All Recipes</h1>
        <p>Find inspiration for breakfast, lunch, dinner and everything in between.</p>
      </div>

      <div className="filter-panel">
        <label className="search-bar">
          <Search size={19} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search recipes or ingredients..."
          />
        </label>

        <label className="filter-control">
          <SlidersHorizontal size={17} />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="All">All categories</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Dessert</option>
            <option>Snacks</option>
            <option>Drinks</option>
          </select>
        </label>

        <label className="filter-control">
          <select
            aria-label="Filter by difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <option value="All">All levels</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>
      </div>

      <p className="results-heading">
        Showing {filtered.length} of {recipes.length} recipes
      </p>

      {filtered.length ? (
        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={34} />
          <h3>No recipes found</h3>
          <p>Try a different search term or change your filters.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setDifficulty("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}
