import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipeDetails } from "../utils/api";
import Loader from "../components/Loader";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe details", err);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 mb-4 inline-block">← Back</Link>
      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full max-h-[400px] object-cover rounded-lg" />
      <h2 className="text-xl mt-4 mb-2 font-semibold">Ingredients</h2>
      <ul className="list-disc ml-5">
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>
      <h2 className="text-xl mt-4 mb-2 font-semibold">Instructions</h2>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
};

export default RecipeDetail;
