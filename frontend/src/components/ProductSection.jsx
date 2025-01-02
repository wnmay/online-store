import React, { useEffect, useState, useContext } from "react";
import FilterContext from "./FilterContext";
import ProductContainer from "./ProductContainer";

const ProductSection = () => {
  const { selectedTags, sortBy, sortOrder } = useContext(FilterContext);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    console.log('selectedTags:', selectedTags);
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

  useEffect(() => {
    fetchProducts();
  }, [selectedTags, sortBy, sortOrder]);

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);

  return (
    <div>
      {products.map((product,key) => (
        <ProductContainer key={key} product={product} refresh={fetchProducts}/>
      ))}
    </div>
  );
};

export default ProductSection;
