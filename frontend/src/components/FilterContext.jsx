import React, { createContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <FilterContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
