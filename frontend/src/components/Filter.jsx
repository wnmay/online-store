import React, { useContext } from "react";
import FilterContext from "./FilterContext";
import { tags } from "../utils/config/tags";

const Filter = () => {
  const {
    selectedTags,
    setSelectedTags,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useContext(FilterContext);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    console.log("Selected Tags: ", updatedTags);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-8 space-y-6">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedTags([])}
          className={`btn ${selectedTags.length === 0 ? "btn-primary" : "btn-outline"}`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`btn ${selectedTags.includes(tag) ? "btn-primary" : "btn-outline"}`}
          >
            {tag}
          </button>
        ))}
      </div>


      <div className="flex gap-4 items-center">
        <div className="w-full">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="select w-full mt-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">Default</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="w-full">
          <button
            onClick={toggleSortOrder}
            className={`btn grow-0 mt-2 ${sortOrder === "asc" ? "btn-primary" : "btn-secondary"}`}
          >
            {sortOrder === "asc" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
 <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
</svg>
}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;


