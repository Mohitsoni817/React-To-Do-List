
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const RecipeContext = createContext(null);

const initialRecipes = [
  {
    id: "recipe-1",
    title: "Creamy Tomato Pasta",
    category: "Dinner",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
    description: "Creamy tomato pasta with fresh herbs and parmesan.",
    ingredients: [
      "200g pasta",
      "2 ripe tomatoes",
      "2 garlic cloves",
      "2 tbsp olive oil",
      "100ml cream",
      "Salt and pepper",
      "Fresh basil",
    ],
    instructions: [
      "Boil pasta in salted water until tender.",
      "Heat olive oil and cook chopped garlic.",
      "Add chopped tomatoes and cook until soft.",
      "Stir in cream, salt and pepper.",
      "Add drained pasta and mix well.",
      "Garnish with fresh basil and serve.",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "recipe-2",
    title: "Fresh Avocado Toast",
    category: "Breakfast",
    time: 10,
    servings: 1,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85",
    description: "Crispy toast topped with creamy avocado and herbs.",
    ingredients: [
      "2 slices bread",
      "1 ripe avocado",
      "1 tsp lemon juice",
      "Salt and pepper",
      "Chilli flakes",
    ],
    instructions: [
      "Toast the bread until golden.",
      "Mash the avocado with lemon juice.",
      "Season with salt and pepper.",
      "Spread over toast and add chilli flakes.",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "recipe-3",
    title: "Garden Fresh Salad",
    category: "Lunch",
    time: 15,
    servings: 2,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    description: "A colourful, refreshing salad with a light dressing.",
    ingredients: [
      "1 cucumber",
      "2 tomatoes",
      "1 carrot",
      "Lettuce",
      "1 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper",
    ],
    instructions: [
      "Wash all vegetables thoroughly.",
      "Chop the cucumber, tomatoes and carrot.",
      "Combine with lettuce in a bowl.",
      "Mix olive oil, lemon juice, salt and pepper.",
      "Pour dressing over the salad and toss.",
    ],
    createdAt: new Date().toISOString(),
  },
];

function readRecipes() {
  try {
    const saved = localStorage.getItem("recipebook-recipes");
    if (saved === null) return initialRecipes;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialRecipes;
  } catch {
    return initialRecipes;
  }
}

function readFavorites() {
  try {
    const saved = localStorage.getItem("recipebook-favorites");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(readRecipes);
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    localStorage.setItem("recipebook-recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(
      "recipebook-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addRecipe = useCallback((data) => {
    const recipe = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setRecipes((previous) => [recipe, ...previous]);
    return recipe;
  }, []);

  const updateRecipe = useCallback((id, data) => {
    setRecipes((previous) =>
      previous.map((recipe) =>
        recipe.id === id ? { ...recipe, ...data, id } : recipe
      )
    );
  }, []);

  const deleteRecipe = useCallback((id) => {
    setRecipes((previous) =>
      previous.filter((recipe) => recipe.id !== id)
    );

    setFavorites((previous) =>
      previous.filter((favoriteId) => favoriteId !== id)
    );
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  );

  const value = {
    recipes,
    favorites,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    isFavorite,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipes must be used inside RecipeProvider");
  }

  return context;
}
