import React, { useState } from "react";
import { tags } from "../utils/config/tags";
import toast from "react-hot-toast";

const Add = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    tag: tags[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);
    formData.append("tag", newProduct.tag);

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNewProduct({
            name: "",
            price: "",
            image: null,
            tag: tags[0],
          });
          toast.success("Product added successfully");
        }
      } else {
        console.error("Error adding product:", response.statusText);
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto m-8 bg-white p-8 rounded-lg shadow-xl">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full mt-2 text-gray-700 file:btn btn-primary file:text-black"
            required
          />
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