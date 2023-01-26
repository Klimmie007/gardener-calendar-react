import logo from './logo.svg';
import './App.css';
import Preserves from './components/Preserve/Preserves';
import Weather from './components/Weather/Weather';
import DefinePreserve from './components/Preserve/DefinePreserve';
import Calendar from './components/Calendar/Calendar';
import Navbar from './components/Basic/Navbar';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { Component } from 'react';
import { store } from './components/Basic/store';
import Register from './components/Account/Register';
import GardenPatches from './components/GardenPatch/GardenPatches';
import { RegisterOrLogin } from './components/Account/LoginOrRegister'; 
import Account from './components/Account/Account';
import DefinePlant from './components/Plant/DefinePlant';
import Plants from './components/Plant/Plants';
import DefineSowedPlant from './components/SowedPlant/DefineSowedPlant';
import SowedPlants from './components/SowedPlant/SowedPlants';
import Harvests from './components/Harvest/Harvests';

class App extends Component {

  render()
  {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Calendar/>}/>
          <Route path="preserves" element={<Preserves/>}/>
          <Route path="gardenpatches" element={<GardenPatches/>}/>
          <Route path="registerOrLogin/:id" element={<RegisterOrLogin/>}></Route>
          <Route path="account" element={<Account/>}/>
          <Route path="plants" element={<Plants/>}/>
          <Route path="sowedPlants" element={<SowedPlants/>}/>
          <Route path="harvests" element={<Harvests/> }></Route>
        </Route>  
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
