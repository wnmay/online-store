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

  const addProduct = async (e) => {
    e.preventDefault();
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
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">Add New Product</h2>
      <form onSubmit={addProduct} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tag</label>
          <select
            name="tag"
            value={newProduct.tag}
            onChange={handleInputChange}
            className="select select-bordered w-full mt-2"
            required
          >
            {tags.map((tag) => (
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;


