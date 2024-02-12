import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import humidity_icon from '../Assests/humidity.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';

const WeatherApp = () => {
    //API key for fetching the data
    let api_key = 'b46d555e15347551695c4840ec0cfc69';
    
    //using useState to set icons according to the weather condition
    const [wicon, setWicon] = useState(cloud_icon);

    //converting normal function to a async funtion
    const search = async () => {
        //get the city name after writing it in a search bar
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "") {
            return 0;
        }
        //converting url to template literal so that we can use it
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        //waiting to fetch url to feed in response
        let response = await fetch(url)
        //waiting to parse response for data
        let data = await response.json();

        //assigning the variable to element according to their className 
        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        //changing the value in HTML, through the data fetched
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+"km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
            setWicon(cloud_icon)
        }
        else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
            setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
            setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon === '010d' || data.weather[0].icon === '010n') {
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon === '013d' || data.weather[0].icon === '013n') {
            setWicon(snow_icon)
        }
        else {
            setWicon(clear_icon)
        }

    }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className='search-icon' onClick={() => {search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt="" />
        </div>
        <div className='weather-temp'> 24°c</div>
        <div className='weather-location'> London</div>

        <div className="data-container">

            <div className="element">
                <img src={humidity_icon} alt="" className='icon'/>
                <div className='data'>
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>

                <div className="element">
                <img src={wind_icon} alt="" className='icon'/>
                <div className='data'>
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp;