import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Preserves from './components/Preserve/Preserves';
import Weather from './components/Weather/Weather';
import DefinePreserve from './components/Preserve/DefinePreserve';
import Calendar from './components/Calendar/Calendar';
import Navbar from './components/Basic/Navbar';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import CalendarReducer from './components/Calendar/CalendarReducer';
import { Provider } from 'react-redux'
import { store } from './components/Basic/store';
import Harvests from './components/Harvest/Harvests';
import DefineHarvest from './components/Harvest/DefineHarvest';


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App/>
  </Provider>
  </React.StrictMode>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
