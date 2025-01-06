import { useState } from "react";
import Filter from "../components/Filter";
import ProductSection from "../components/ProductSection";

const Store = () => {
  const [filterAppear, setFilterAppear] = useState(false);

  const toggleFilter = () => {
    setFilterAppear(!filterAppear);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleFilter}
          className="btn btn-secondary sm:btn-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>

        </button>
      </div>

      {filterAppear && (
        <div className="mb-6">
          <Filter />
        </div>
      )}

      <div className="flex justify-center">
        <ProductSection />
      </div>
    </div>
  );
};

export default Store;
