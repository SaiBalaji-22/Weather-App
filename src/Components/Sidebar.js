import React, { useState, useContext, useEffect } from "react";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import IconButton from '@mui/material/IconButton';
// import weatherPng from '../Assets/HeavyCloud.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DataContext } from '../Contexts/DataContext';

import axios from 'axios';
import moment from "moment";



function Sidebar() {
  const [place, setPlace] = useState("");
  // const [date, setDate] = useState("");

  const { isCel, woeidData, setWoeidData, weatherData, setWeatherData, setSearchIn } = useContext(DataContext);
  
  // const [woeiddata, setWoeidData] = useState({});

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      let lat = Math.round(e.coords.latitude);
      let lon = Math.round(e.coords.longitude);
      // console.log(lat, lon);
      axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?lattlong=${lat},${lon}`)
        .then((data) => {
          setWoeidData(data.data[0].woeid);
          // console.log(data.data[0].woeid);
          return data.data[0];
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }

  useEffect(() => {
    axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${woeidData}`)
    .then((data) => {
      setWeatherData(data.data);
      // console.log(data.data);
    })
    // eslint-disable-next-line
  },[woeidData]);

  useEffect(() => {
    setPlace(weatherData.title);
  },[weatherData]);

  const searchIn = () => {
    setSearchIn(true);
  }

	return (
		<div className="sidebar">
			<div className="sidebar-container">
				<div className="sidebar-nav">
          <button className="btn-search" onClick={searchIn}>Seach for places </button>
          <IconButton className="btn-icon" aria-label="MyLocation" onClick={getLocation}> <MyLocationIcon className="icon" color="white"/> </IconButton>
        </div>
        
        <div className="sidebar-body">
          <div className="bg"></div>
          <div className="sidebar-weather">
            <img src={`https://www.metaweather.com/static/img/weather/${weatherData.consolidated_weather[0].weather_state_abbr}.svg`} alt="" />
            <div className="temperature">
              <span className="num">{isCel ? Math.round(weatherData.consolidated_weather[0].the_temp) : Math.round(32 + (weatherData.consolidated_weather[0].the_temp * 1.8))}</span>
              <span className="deg">{isCel ? <>&#8451;</> : <>&#8457;</>}</span>
              <p className="weather-type">{weatherData.consolidated_weather[0].weather_state_name}</p>
            </div>
            <div className="date">
              <span>Today</span>
              <span> . </span>
              <span>{moment(weatherData.consolidated_weather[0].applicable_date).format("ddd, DD MMMM")}</span>
            </div>
            <div className="place">
              <p> <LocationOnIcon fontSize="small"/> {place}</p>
            </div>
          </div>
        </div>
			</div>
		</div>
	);
}

export default Sidebar;