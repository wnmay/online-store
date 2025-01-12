import React from 'react';
import { Link } from 'react-router-dom';

const Menubar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-xl">
    <div className="relative group">
    <button
      className="btn btn-ghost text-lg font-semibold hover:text-primary transition duration-300"
    >
      User
    </button>
    <div className="absolute left-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg hidden group-hover:block">
      <Link
        to="/login"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
      >
        Register
      </Link>
    </div>
  </div>
      <div className="flex gap-6">
        <Link
          to="/"
          className="btn btn-ghost text-lg font-semibold hover:text-primary transition duration-300"
        >
          Store
        </Link>
        <Link
          to="/add"
          className="btn btn-ghost text-lg font-semibold hover:text-primary transition duration-300"
        >
          Add
        </Link>
        <Link
          to="/about"
          className="btn btn-ghost text-lg font-semibold hover:text-primary transition duration-300"
        >
          About
        </Link>
      </div>
  </div>

  );
};

export default Menubar;
