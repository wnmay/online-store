import React from 'react';
import { Link } from 'react-router-dom';

const Menubar = () => {
  return (
    <div className="flex justify-end gap-6 p-4 bg-base-200 rounded-lg shadow-xl">
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
  );
};

export default Menubar;
