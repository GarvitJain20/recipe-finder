import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        className="p-2 border rounded-l-lg w-72"
        placeholder="Search for recipes..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
