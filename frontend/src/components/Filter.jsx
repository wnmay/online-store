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

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags([...updatedTags]);
    console.log("Selected Tags: ", updatedTags); 
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setSelectedTags([])}
          className={selectedTags.length === 0 ? "active" : ""}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={selectedTags.includes(tag) ? "active" : ""}
          >
            {tag}
          </button>
        ))}
      </div>

      <div>
        <label>Sort By: </label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="createdAt">Date</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div>
        <label>Order: </label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
