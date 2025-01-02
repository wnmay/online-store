import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from './pages/Store';
import Add from './pages/Add';
import About from './pages/About';
import MenuBar from './components/MenuBar';
import { FilterProvider } from './components/FilterContext';


function App() {

  return (
    <FilterProvider>
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/add" element={<Add />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </FilterProvider>

  )
}

export default App
