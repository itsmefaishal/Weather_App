import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = "cedc1849fd96dc9382fbb08416721020";

// url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=apikey'
// http://api.openweathermap.org/geo/1.0/direct?q=delhi&limit={limit}&appid=apikey'


function App() {
  const [lat,setLat] = useState(null);
  const [lon,setLon] = useState(null);
  const [temp,setTemp] = useState("");
  const [humidity, setHumidity] = useState('');
  const [speed,setSpeed] = useState('');
  const [weather, setWeather] = useState('');
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
      setTemp(data.main.temp)
      setHumidity(data.main.humidity)
      setSpeed(data.wind.speed)
      setWeather(data.weather[0].main)
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
      <h1 placeholder='location'>{location}</h1> 
    <input
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder='Enter location'
      type="text" />     
      <p>latitude : {lat}</p>
      <p>longitude : {lon}</p>
      <p>Temperature : <b>{temp} °C</b></p>
      <p>Wind speed : {speed} KMPH</p>
      <p>Humidity : {humidity}%</p>
      <p>Weather is {weather}</p>
      <p><i>{weatherDescription}</i></p>
    </div>
  );
}


export default App;
