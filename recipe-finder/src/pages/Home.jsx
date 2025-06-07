import React from "react";
import { useState } from "react";
import { fetchRecipes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const data = await fetchRecipes(term);
      setRecipes(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🍽 Recipe Finder</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
