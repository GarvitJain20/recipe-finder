import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition">
        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="p-3">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
