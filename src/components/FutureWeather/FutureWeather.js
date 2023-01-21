import React, { useEffect, useState } from "react";
import './FutureWeather.css'
import axios from "axios";

function FutureWeather() {
    const apiKey = '31d3fcd2a600f1a3035a3fd6e3e6239f';

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [forecast, setForecast] = useState([]);
    

    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    const fetchWeather = async () => {
        try {
            await navigator.geolocation.getCurrentPosition(savePositionToState);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
            setForecast(res.data.list.filter((value, index, arr) => {
                return (index % 8 === 0);
            }));
            //console.log(res.data);
        }
        catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [latitude, longitude]);


    return(
        <div>
            <h1>5-day Forecast</h1>
            <ul>
            {forecast.map((weather, key) => {
                    return (
                    <li className="main" key={key}>
                        {weather.dt_txt.slice(5, 10)}
                        <span>Min: {weather.main.temp_min.toFixed(0)}</span>
                        <span>Max: {weather.main.temp_max.toFixed(0)}</span>
                        <span>{weather.weather[0].main}</span>
                    </li>)  
                })}
            </ul>
        </div>
    );
};

export default FutureWeather;