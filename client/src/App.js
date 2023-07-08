import logo from './logo.svg';
import './App.css';

//components
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllRiders from './components/AllRiders';
import AddRider from './components/AddRider';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditRider from './components/EditRider';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/'element={<Home />} />
        <Route path='/all' element={<AllRiders />} />
        <Route path='/add' element={<AddRider />} />
        <Route path='/edit/:id' element={<EditRider/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
