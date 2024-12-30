import React from 'react';
import { Link } from 'react-router-dom';

const Menubar = () => {
  return (
    <div className='flex gap-4'>
          <Link to="/">Store</Link>
          <Link to="/add">Add</Link>
          <Link to="/about">About</Link>
    </div>
  );
};

export default Menubar;