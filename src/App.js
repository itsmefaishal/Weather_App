import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'cedc1849fd96dc9382fbb08416721020';
// url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=cedc1849fd96dc9382fbb08416721020'
// http://api.openweathermap.org/geo/1.0/direct?q=delhi&limit={limit}&appid=cedc1849fd96dc9382fbb08416721020


function App() {
  const [lat,setLat] = useState(null);
  const [lon,setLon] = useState(null);
  const [location,setLocation] = useState('');
  
  const latLon = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    axios.get(latLon).then(response => response.data)
    .then(data => {
      setLat(data[0].lat)
      setLon(data[0].lon)
    })
  })
  

  // useEffect(() => {

  //   if( lat !== null && lon !== null) {
  //     const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  //     axios.get(url).then(response => response.data)
  //     .then(data => {
  //     console.log(data)
  //   })
  //   }

  // }, [lat,lon])

  const searchLocation = (event) => {
    if(event.key === 'Enter' ) {
      if(lat !== null && lon !== null){
        const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const latLon = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;

      axios.get(url).then(response => response.data)
      .then(data => {
      console.log(data)
      })
    }
    setLocation('')
  }

  return (
    <div className="App"> 
    <input
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder='Enter location'
      type="text" />     
      <p>latitude : {lat}</p>
      <p>longitude : {lon}</p>
    </div>
  );
}
}

export default App;
