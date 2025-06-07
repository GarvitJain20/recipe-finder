// src/App.jsx
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchRecipes = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query,
            number: 12,
            apiKey: API_KEY,
          },
        }
      );
      setRecipes(res.data.results || []);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const clearSearch = () => {
    setQuery("");
    setRecipes([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-50 via-yellow-100 to-yellow-50 p-6 md:p-12 font-sans">
      <header className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-extrabold text-yellow-700 mb-2 drop-shadow-lg">
          Recipe Finder 🍳
        </h1>
        <p className="text-yellow-900 text-lg md:text-xl">
          Search delicious recipes from Spoonacular API
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Search recipes (e.g. pasta, chicken)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow rounded-lg px-4 py-3 border-2 border-yellow-400 focus:border-yellow-600 focus:ring-yellow-300 outline-none transition"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-yellow-600 hover:text-yellow-800 font-bold"
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white rounded-lg px-6 py-3 font-semibold transition"
        >
          Search
        </button>
      </form>

      <section className="max-w-6xl mx-auto mt-12">
        {loading && (
          <div className="flex justify-center mt-16">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-yellow-500 h-16 w-16"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold mt-16">
            {error}
          </p>
        )}

        {!loading && !error && recipes.length === 0 && (
          <p className="text-center text-yellow-700 mt-20 text-lg">
            No recipes found. Try searching for something yummy!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {recipes.map(({ id, title, image }) => (
            <a
              href={`https://spoonacular.com/recipes/${title.replace(
                / /g,
                "-"
              )}-${id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={id}
              className="group relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white"
              title={title}
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-56 object-cover group-hover:brightness-75 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-lg font-semibold line-clamp-2">
                  {title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Loader CSS */}
      <style>{`
        .loader {
          border-top-color: #fbbf24; /* yellow-400 */
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        /* Line clamp for title */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
