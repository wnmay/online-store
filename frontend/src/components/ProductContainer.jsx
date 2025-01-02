import React, { useState } from 'react';
import Modal from 'react-modal';
import { tags } from '../utils/config/tags';

Modal.setAppElement('#root');

const ProductContainer = ({ product, refresh }) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
    tag: product.tag,
  });

  const openEdit = () => setEditIsOpen(true);
  const closeEdit = () => setEditIsOpen(false);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      refresh();
    }
    closeEdit();
  };

  const deleteProduct = async () => {
    const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      refresh();
    }
    closeDelete();
  };

  return (
    <>
      <div key={product._id} className='bg-gray-200 p-3 rounded'>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.tag}</div>
        <div>
          <button onClick={openEdit}>Edit</button>
          <button onClick={openDelete}>Delete</button>
        </div>
      </div>

      <Modal
        isOpen={editIsOpen}
        onRequestClose={closeEdit}
        className="bg-white pb-6 pl-6 pr-6 rounded shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
      >
        <div className="flex justify-end">
          <button type="button" onClick={closeEdit} className="text-gray-500 hover:text-gray-800">
            x
          </button>
        </div>
        <h2 className="text-lg font-medium">Edit Product</h2>
        <p className="mt-2 text-sm text-gray-500">Update the product details below:</p>

        <form className="mt-4" onSubmit={updateProduct}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="text"
            name="image"
            value={updatedProduct.image}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Tag
          </label>
          <select
            name="tag"
            onChange={handleInputChange}
            value={updatedProduct.tag}
            className="w-full border rounded px-3 py-2 text-sm"
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
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onRequestClose={closeDelete}
        className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
      >
        <div className="text-center">
          <h2 className="text-lg font-medium">Confirm Deletion</h2>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete <strong>{product.name}</strong>?
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={deleteProduct}
              className="px-4 py-2 bg-gray-200 rounded text-sm"
            >
              Delete
            </button>
            <button
              onClick={closeDelete}
              className="px-4 py-2 bg-gray-200 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductContainer;




