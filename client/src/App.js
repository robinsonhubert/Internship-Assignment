import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

//components
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllRiders from './components/AllRiders';
import AddRider from './components/AddRider';
import EditRider from './components/EditRider';
import Footer from './components/Footer';
import Loader from './Loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const delay = 2000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ marginBottom: '150px' }} className="background">
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path='/' element={<AllRiders />} />
            {/* <Route path='/all' element={<AllRiders />} /> */}
            <Route path='/add' element={<AddRider />} />
            <Route path='/edit/:id' element={<EditRider />} />
          </Routes>
        )}
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
