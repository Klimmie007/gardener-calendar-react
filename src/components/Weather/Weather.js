import React, { useEffect, useState } from "react";
import './Weather.css'
import axios from "axios";

function Weather() {
    const apiKey = '31d3fcd2a600f1a3035a3fd6e3e6239f';

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [feelsLike, setFeelsLike] = useState(0);
    const [forecastForTimeline, setForecastForTimeline] = useState([]);

    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    const fetchWeather = async () => {
        try {
            await navigator.geolocation.getCurrentPosition(savePositionToState);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
            setTemperature(res.data.list[0].main.temp);
            setCity(res.data.city.name);
            setCountry(res.data.city.country);
            setFeelsLike(res.data.list[0].main.feels_like);
            setForecastForTimeline(res.data.list.slice(0, 8));
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
            <div>
                <h2>{city}, {country}</h2>
                <h2>Temperature: {temperature.toFixed(0)} °C</h2>
                <h2>Feels like: {feelsLike.toFixed(0)} °C</h2>
            </div>
            <div className="timeline">
                <h1>3-hour Forecast</h1>
                {forecastForTimeline.map((weather, key) => {
                    return (
                    <div key={key}>
                        <h2>{weather.main.temp.toFixed(0)} °C</h2>
                        <h2>{weather.dt_txt.slice(-8, -3)}</h2>
                    </div>)  
                })}
            </div>
        </div>
    );
};

export default Weather;