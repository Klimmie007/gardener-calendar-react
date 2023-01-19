import logo from './logo.svg';
import './App.css';
import Preserves from './components/Preserves';
import Weather from './components/Weather/Weather';
import DefinePreserve from './components/DefinePreserve';
import Calendar from './components/Calendar/Calendar';
import Navbar from './components/Basic/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import { store } from './components/Basic/store';
import Register from './components/Account/Register';


class App extends Component {

  render()
  {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Calendar/>}/>
          <Route path="preserves" element={<Preserves/>}/>
          <Route path="register" element={<Register/>}></Route>
        </Route>  
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
