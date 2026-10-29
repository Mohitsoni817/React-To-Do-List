
import { Link } from "react-router-dom";
import { ArrowRight, ChefHat, Clock3, Heart, Sparkles } from "lucide-react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const { recipes } = useRecipes();
  const featured = recipes.slice(0, 3);

  return (
    <main>
      <section className="hero page-container">
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={15} /> YOUR PERSONAL RECIPE COLLECTION
          </span>

          <h1>
            Good food brings
            <br />
            people <span>together.</span>
          </h1>

          <p>
            Discover new favourites, organize your best recipes and make
            every meal a little more special.
          </p>

          <div className="hero-actions">
            <Link to="/recipes" className="btn btn-primary">
              Explore Recipes <ArrowRight size={17} />
            </Link>

            <Link to="/add-recipe" className="btn btn-secondary">
              <ChefHat size={17} /> Add Your Recipe
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{recipes.length}</strong>
              <span>Recipes saved</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Food categories</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Ideas to explore</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1100&q=85"
            alt="Fresh, colourful food prepared for a meal"
          />

          <div className="floating-note">
            <span className="note-icon"><Heart size={21} /></span>
            <div>
              <strong>Made with love</strong>
              <small>Your next favourite meal awaits</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>Recipe inspiration</h2>
            <p>A little inspiration for your next meal.</p>
          </div>

          <Link to="/recipes" className="text-link">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {featured.length ? (
          <div className="recipe-grid">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <ChefHat size={36} />
            <h3>Your recipe collection starts here</h3>
            <p>Add your first recipe and it will appear on this page.</p>
            <Link to="/add-recipe" className="btn btn-primary">
              Add First Recipe
            </Link>
          </div>
        )}
      </section>

      <section className="bottom-banner page-container">
        <div>
          <span className="eyebrow">A SPACE FOR YOUR CREATIVITY</span>
          <h2>Every great dish has a story.</h2>
          <p>Save your family favourites and build your own cookbook.</p>
        </div>

        <Link to="/add-recipe" className="btn btn-light">
          Create a Recipe <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
