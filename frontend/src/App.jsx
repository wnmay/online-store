import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from './pages/Store';
import Add from './pages/Add';
import About from './pages/About';
import MenuBar from './components/MenuBar';
import { FilterProvider } from './components/FilterContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <FilterProvider>
      <Toaster/>
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/add" element={<Add />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </FilterProvider>

  )
}

export default App
