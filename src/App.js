import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [lat,setLat] = useState(null);
  const [lon,setLon] = useState(null);
  const [temp,setTemp] = useState("");
  const [humidity, setHumidity] = useState('');
  const [speed,setSpeed] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [location,setLocation] = useState('');
  
  const latLon = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    if(location){
      axios.get(latLon).then(response => response.data)
      .then(data => {
      setLat(data[0].lat)
      setLon(data[0].lon)
    })
    }
  },[location, latLon])
  

  useEffect(() => {

    if( lat !== null && lon !== null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      axios.get(url).then(response => response.data)
      .then(data => {
      setTemp(data.main.temp.toFixed(0))
      setHumidity(data.main.humidity)
      setSpeed(data.wind.speed)
      setWeatherDescription(data.weather[0].description)
    })
    }

  }, [lat,lon])

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      setLocation(event.target.value);
      event.target.value= "";
    }
  }


  return (
   
    <div className="App">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter location'
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{location}</p>
            <div className="temp">
              <h1>{temp}°C</h1>
            </div>
            <div className="description">
              <p>{weatherDescription}</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className='bold'>{temp}°C</p>
            <p>Temperature</p>
          </div>
          <div className="humidity">
            <p className='bold'>{humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className='bold'>{speed} KMPH</p>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
