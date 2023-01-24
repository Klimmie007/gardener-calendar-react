import logo from './logo.svg';
import './App.css';
import Preserves from './components/Preserve/Preserves';
import Weather from './components/Weather/Weather';
import DefinePreserve from './components/Preserve/DefinePreserve';
import Calendar from './components/Calendar/Calendar';
import Navbar from './components/Basic/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import { store } from './components/Basic/store';
import Register from './components/Account/Register';
import Login from './components/Account/Login';
import GardenPatches from './components/GardenPatch/GardenPatches';


class App extends Component {

  render()
  {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Calendar/>}/>
          <Route path="preserves" element={<Preserves/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="gardenpatches" element={<GardenPatches/>}/>
          <Route path="register" element={<Register/>}></Route>
        </Route>  
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
