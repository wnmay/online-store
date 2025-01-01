import React, { useEffect, useState, useContext } from "react";
import FilterContext from "./FilterContext";

const ProductSection = () => {
  const { selectedTags, sortBy, sortOrder } = useContext(FilterContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        console.log('Fetching products with selectedTags:', selectedTags);
      try {
        const query = [
          selectedTags.length > 0 ? `tag=${selectedTags.join(",")}` : "",
          `sortBy=${sortBy}`,
          `sortOrder=${sortOrder}`,
        ]
          .filter(Boolean)
          .join("&");

        const response = await fetch(`http://localhost:5000/api/products?${query}`);
        if (!response.ok) {
            console.error("API Error:", response.status, response.statusText);
            return;
          }
      
        const data = await response.json();
        if (data.success) {
            console.log(`http://localhost:5000/api/products?${query}`);
            setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedTags, sortBy, sortOrder]);

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);

  return (
    <div>
      {products.map((product,key) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <div>Price: ${product.price}</div>
          <div>{product.tag}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
