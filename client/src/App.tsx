import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AllProducts from './pages/AllProducts';
import AddProducts from './pages/AddProducts';
import Summary from './pages/Summary';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
