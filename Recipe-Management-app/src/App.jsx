
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";
import NotFound from "./pages/NotFound";

import "./style/global.css";
import "./style/App.css";

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="site-footer">
        <span className="footer-brand">RecipeBook</span>
        <p>Made with love for people who love good food.</p>
        <span>© {new Date().getFullYear()} RecipeBook</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </RecipeProvider>
  );
}
