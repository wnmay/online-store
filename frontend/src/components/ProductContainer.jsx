import React, { useState } from "react";
import { tags } from "../utils/config/tags";
import toast from "react-hot-toast";

const ProductContainer = ({ product, refresh }) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
    tag: product.tag,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProduct = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (response.ok) {
        refresh();
        toast.success("Product updated successfully");
        setEditIsOpen(false);
      }
      else{
        console.error("Error updating product:", response.statusText);
        toast.error("Failed to update product");
        
      }    
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product") 
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        refresh();
        setIsDeleteOpen(false);
        toast.success("Delete successfully")
      }
      else{
        console.error("Error deleting product:", response.statusText);
        toast.error("Failed to delete product");
      }    
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      <div key={product._id} className="card w-96 bg-white shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-black">{product.name}</h2>
          <p className="text-lg text-gray-600">${product.price}</p>
          <p className="text-sm text-gray-500">{product.tag}</p>
          <div className="card-actions justify-end">
            <button onClick={() => setEditIsOpen(true)} className="btn btn-primary">
              Edit
            </button>
            <button onClick={() => setIsDeleteOpen(true)} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </div>

      {editIsOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-semibold">Edit Product</h2>
            <form onSubmit={updateProduct} className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="text"
            name="image"
            value={updatedProduct.image}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
          />
      </div>
              <div>
                <label className="block text-gray-700">Tag</label>
                <select
                  name="tag"
                  onChange={handleInputChange}
                  value={updatedProduct.tag}
                  className="select select-bordered w-full mt-2"
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button onClick={() => setEditIsOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="modal modal-open">
          <div className="modal-box text-center">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete <strong>{product.name}</strong>?
            </p>
            <div className="modal-action">
              <button onClick={deleteProduct} className="btn btn-error">
                Delete
              </button>
              <button onClick={() => setIsDeleteOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductContainer;









