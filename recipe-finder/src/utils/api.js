import axios from "axios";

const BASE_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/complexSearch?query=${query}&number=12&apiKey=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.data.results;
};

export const fetchRecipeDetails = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`
  );
  return res.data;
};

