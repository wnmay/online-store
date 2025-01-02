import React, { useState } from "react";
import { tags } from "../utils/config/tags";

const Add = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    tag: tags[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNewProduct({
            name: "",
            price: "",
            image: "",
            tag: tags[0],
          });
        }
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-medium">Add New Product</h2>
        <form className="mt-4" onSubmit={addProduct}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Tag
          </label>
          <select
            name="tag"
            value={newProduct.tag}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          >
            {tags.map((tag) => (
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 rounded text-sm"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;

