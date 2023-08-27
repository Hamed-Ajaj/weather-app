import React, { useEffect } from 'react'
import search_icon from '../assets/search.png'
import Rain_icon from '../assets/rain.png'
import Clouds_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'

import './weatherApp.css'
const WeatherApp = () => {
  const [data, setData] = React.useState([])
  const [input, setInput] = React.useState('')
  const [weatherIcon, setWeatherIcon] = React.useState(Clouds_icon)
  const api_key = 'b0df74578cd213ff80027effb80c7d12' 

  React.useEffect(() => {
    if (data.weather && data.weather.length > 0) {
      switch (data.weather[0]?.main) {
        case 'Rain':
          setWeatherIcon(Rain_icon);
          break;
        case 'Clouds':
          setWeatherIcon(Clouds_icon);
          break;
        case 'Drizzle':
          setWeatherIcon(drizzle_icon);
          break;
        case 'Snow':
          setWeatherIcon(snow_icon);
          break;
        case 'Clear':
          setWeatherIcon(clear_icon);
          break;
        default:
          setWeatherIcon(null);
      }
    }
  }, [data.weather]);

  

  const search = async () =>{
    if(!input){
      return ;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`
    const response = await fetch(url)
    const responseJson = await response.json()
    setData(responseJson)
  }

  if(data.cod === '404'){
    return (
      <div className="container">
        <div className="top-bar">
          <input type="text" className="city-input" placeholder='Search' value={input} onChange={(e)=> setInput(e.target.value) }/>
          <div className="search-icon" onClick={() => search()}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="error-message">
          <h1>{data.message} 😔</h1>
          <h2>Please Try Again!</h2>
        </div>
      </div>
    )
  }
  return (
    <div className='container'>
      <div className="top-bar">
        
        <input type="text" className="city-input" placeholder='Search' value={input} onChange={(e)=> setInput(e.target.value) }/>
        <div className="search-icon" onClick={() => search()}>
            <img src={search_icon} alt="search"/>
        </div>
    </div>
      <div className="weather-image">
            {data.main && <img src={weatherIcon} alt="" />}
      </div>
      <div className="weather-temp">
        {data?.main?.temp && `${(data.main.temp / 10.0).toFixed(0)}°c`}
      </div>
      <div className="weather-location">{data.name}</div>
      <div className="data-container">
        {data.main && (
          <div className="element">
            <img src={humidity_icon} className='icon' alt='' />
            <div className="data">
              <div className="humidity-percentage">{data.main.humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
        )}

        {data.wind && (
          <div className="element">
            <img src={wind_icon} className='icon' alt='' />
            <div className="data">
              <div className="wind-speed">{data.wind.speed} km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherApp
