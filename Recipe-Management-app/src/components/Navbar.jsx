
import { NavLink, Link } from "react-router-dom";
import { ChefHat, Heart, House, BookOpen, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <ChefHat size={24} />
        </span>
        <span>Recipe<span className="brand-accent">Book</span></span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">
          <House size={17} /> Home
        </NavLink>
        <NavLink to="/recipes">
          <BookOpen size={17} /> Recipes
        </NavLink>
        <NavLink to="/favorites">
          <Heart size={17} /> Favorites
        </NavLink>
      </nav>

      <Link to="/add-recipe" className="btn btn-primary nav-add">
        <Plus size={18} /> Add Recipe
      </Link>
    </header>
  );
}
