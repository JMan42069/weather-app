import 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './App.css';
import { useState, useRef } from 'react';
import { fetchWeatherInfo} from './api/WeatherAPI';

import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';

import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';


function LocationButton({name, onBtnClick}) {
  return (
    <button onClick={onBtnClick}>
      {name}
    </button>
  );
}

function App() {
  
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [ prevInput, setPrevInput ] = useState('');


  async function getWeatherInfo(argument){
    fetchWeatherInfo(argument).then(data => {
      setWeatherInfo(data);
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  function WeatherInfoBox() {
    return (weatherInfo != null ?
      <div>
        Location: {weatherInfo.location.name}
        <br></br>
        Current Temp 	&#40;&#8451;&#41;: {weatherInfo.current.temp_c}
        
        <br></br>
        Current Temp 	&#40;&#8457;&#41;: {weatherInfo.current.temp_f}
        <br></br>
        Conditions: {weatherInfo.current.condition.text}
        
      </div>
      :
      <div></div>
    );
  }

  function SearchBar(){
    const API_Geoapify = "5e6ccbd5d70e499ebaaa411b80cc5226"
  

    async function OnPlaceSelect(value) {
      if(prevInput != value){
        const lat = value.properties.lat;
        const lon = value.properties.lon;
        setPrevInput(value.properties.city);
        
        fetchWeatherInfo(`${lat},${lon}`).then(data => {
          setWeatherInfo(data);
        }).catch(error => {
          console.log('Error:'. error);
        });

        // console.log(value.properties.city);
        // console.log(value.properties.lat);
        // console.log(value.properties.lon);
      }
    }

    return(
        <div>
          <GeoapifyContext apiKey={API_Geoapify} className="important">
            <GeoapifyGeocoderAutocomplete
              placeholder='enter a location'
              value={prevInput}
              placeSelect={OnPlaceSelect}
              skipIcons="true"
              
            />
          </GeoapifyContext>
        </div>
    );
  }

  function Map(){
    const pos = [51.505, -0.09]

    return( weatherInfo != null ?
      <MapContainer center={[weatherInfo.location.lat, weatherInfo.location.lon]} zoom={13} scrollWheelZoom={false} >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[weatherInfo.location.lat, weatherInfo.location.lon]}>
          <Popup>
            {weatherInfo.location.name}<br/>
            {weatherInfo.current.temp_c}&#8451;<br/>
            {weatherInfo.current.condition.text}
          </Popup>
        </Marker>
      </MapContainer>
      :
      <MapContainer center={[0,0]} zoom={13} scrollWheelZoom={false} >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    );
  }


  return (
    <div className="App">
      <header className="App-header">
        <LocationButton name='London' onBtnClick={() => getWeatherInfo('London')}/>
        <LocationButton name='Toronto' onBtnClick={() => getWeatherInfo('Toronto')}/>
        <LocationButton name='Mexico City' onBtnClick={() => getWeatherInfo('Mexico')}/>
        <LocationButton name='Los Angeles' onBtnClick={() => getWeatherInfo('Los Angeles')}/>
        <LocationButton name='Bangkok' onBtnClick={() => getWeatherInfo('Bangkok')}/>

        </header>
          <div className='App-body'>
          <SearchBar />

          <Map />
    
          <WeatherInfoBox />
          </div>
        <footer className='App-footer'>
          <div >
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"/>
          </a>
          Powered by <a href="https://www.weatherapi.com/" title="Weather API" className='App-link'>WeatherAPI.com</a>
          </div>
        </footer>
    </div>
  );
}

export default App;
