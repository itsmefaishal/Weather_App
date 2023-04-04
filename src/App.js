import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  lat : "",
  lon : "",
  temp : "",
  humidity : "",
  speed : "",
  weather : "",
  location : "",
  tempMax : "",
  tempMin : "",
  seaLevel : "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LAT" :
      return { ...state, lat : action.payload };
    case "SET_LON" : 
      return { ...state, lon : action.payload };
    case "SET_TEMP" : 
      return { ...state, temp : action.payload };
    case "SET_HUMIDITY" : 
      return { ...state, humidity : action.payload };
    case "SET_SPEED" : 
      return { ...state, speed : action.payload };
    case "SET_WEATHER" : 
      return { ...state, weather : action.payload };
    case "SET_LOCATION" : 
      return { ...state, location : action.payload };
    case "SET_TEMPMAX" : 
      return { ...state, tempMax : action.payload };
    case "SET_TEMPMIN" : 
      return { ...state, tempMin : action.payload };
    case "SET_SEALEVEL" : 
      return { ...state, seaLevel : action.payload };
    default:
      return state;
  }
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const { lat, lon, temp, humidity, speed, weather, tempMin, tempMax, seaLevel } = state;
  const [location,setLocation] = useState('');
  
  const latLon = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    if(location){
      axios.get(latLon).then(response => response.data)
      .then(data => {
       dispatch({ type : "SET_LAT" , payload : data[0].lat})
       dispatch({ type : "SET_LON" , payload : data[0].lon})
    })
    }
  },[location, latLon])
  

  useEffect(() => {

    if( lat !== null && lon !== null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      axios.get(url).then(response => response.data)
      .then(data => {
        dispatch({ type : "SET_TEMP", payload : data.main.temp.toFixed(0)})
        dispatch({ type : "SET_HUMIDITY" , payload : data.main.humidity})
        dispatch({ type : "SET_SPEED" ,payload : data.wind.speed})
        dispatch({ type : "SET_TEMPMAX", payload : data.main.temp_max})
        dispatch({ type : "SET_TEMPMIN", payload : data.main.temp_min})
        dispatch({ type : "SET_SEALEVEL", payload : data.main.sea_level})
        dispatch({ type : "SET_WEATHER", payload : data.weather[0].description})
    })
    }

  }, [lat,lon])

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      setLocation(event.target.value);
    }
  }


  return (
   
    <div className="App">
      <div className="search">
        <input
        defaultValue={location}
        onSubmit={searchLocation}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      {
        location ? 
        
        <div className="container">
        <div className="top">    
          <p>{location}</p>
          <h1>{temp}°C</h1>
          <p>{weather}</p>   
        </div>
        <div className="middle">
          <p><span>Maximum temperature</span><span><b>{tempMax}°C</b></span></p>
          <p><span>Minimum temperature</span><span><b>{tempMin}°C</b></span></p>
          <p><span>Sea level </span><span><b>{seaLevel}m</b></span></p>
        </div>
        <div className="bottom">
          <div className="feels">
            <p><b>{temp}°C</b></p>
            <p>Temperature</p>
          </div>
          <div className="humidity">
            <p><b>{humidity}%</b></p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p><b>{speed} KMPH</b></p>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
         : <></>
      }
    </div>
  );
}


export default App;
