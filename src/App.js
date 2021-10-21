import "./App.css";
import Mainbody from "./Components/Mainbody";
import Sidebar from "./Components/Sidebar";
import { useState, useEffect } from "react";
import { DataContext } from "./Contexts/DataContext";

import axios from 'axios';
import Searchbar from "./Components/Searchbar";

function App() {
  const obj = {
    consolidated_weather: [
      {
        id: 5325735834157056,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "SW",
        created: "2021-10-19T15:59:02.159635Z",
        applicable_date: "2021-10-19",
        min_temp: 15.98,
        max_temp: 19.880000000000003,
        the_temp: 19.6,
        wind_speed: 10.539695336877967,
        wind_direction: 220.67009788155238,
        air_pressure: 1013.0,
        humidity: 76,
        visibility: 7.858792153821682,
        predictability: 73,
      },
      {
        id: 4911250015256576,
        weather_state_name: "Light Rain",
        weather_state_abbr: "lr",
        wind_direction_compass: "SW",
        created: "2021-10-19T15:59:01.750399Z",
        applicable_date: "2021-10-20",
        min_temp: 11.030000000000001,
        max_temp: 17.634999999999998,
        the_temp: 17.685000000000002,
        wind_speed: 11.999608252374133,
        wind_direction: 226.66619627955163,
        air_pressure: 1000.0,
        humidity: 75,
        visibility: 11.949900083512288,
        predictability: 75,
      },
      {
        id: 6371467869552640,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "WNW",
        created: "2021-10-19T15:59:01.956264Z",
        applicable_date: "2021-10-21",
        min_temp: 7.08,
        max_temp: 11.219999999999999,
        the_temp: 11.42,
        wind_speed: 10.922024501757734,
        wind_direction: 296.60604845632,
        air_pressure: 1008.0,
        humidity: 57,
        visibility: 14.518337906625309,
        predictability: 73,
      },
      {
        id: 6688617784147968,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "WNW",
        created: "2021-10-19T15:59:02.253248Z",
        applicable_date: "2021-10-22",
        min_temp: 6.205,
        max_temp: 12.565000000000001,
        the_temp: 12.215,
        wind_speed: 9.044116627050029,
        wind_direction: 283.8651360664052,
        air_pressure: 1022.0,
        humidity: 62,
        visibility: 15.09590242980991,
        predictability: 71,
      },
      {
        id: 6037149922099200,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "SSW",
        created: "2021-10-19T15:59:01.807992Z",
        applicable_date: "2021-10-23",
        min_temp: 6.49,
        max_temp: 13.995000000000001,
        the_temp: 13.08,
        wind_speed: 6.184451157610224,
        wind_direction: 207.83356698802845,
        air_pressure: 1023.0,
        humidity: 67,
        visibility: 14.515852421856358,
        predictability: 71,
      },
      {
        id: 4745373252845568,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "S",
        created: "2021-10-19T15:59:04.982302Z",
        applicable_date: "2021-10-24",
        min_temp: 10.43,
        max_temp: 14.48,
        the_temp: 13.85,
        wind_speed: 6.203915930963174,
        wind_direction: 188.0,
        air_pressure: 1016.0,
        humidity: 65,
        visibility: 9.999726596675416,
        predictability: 71,
      },
    ],
    time: "2021-10-19T19:47:42.364551+01:00",
    sun_rise: "2021-10-19T07:31:33.268353+01:00",
    sun_set: "2021-10-19T17:58:28.825290+01:00",
    timezone_name: "LMT",
    parent: {
      title: "England",
      location_type: "Region / State / Province",
      woeid: 24554868,
      latt_long: "52.883560,-1.974060",
    },
    sources: [
      {
        title: "BBC",
        slug: "bbc",
        url: "http://www.bbc.co.uk/weather/",
        crawl_rate: 360,
      },
      {
        title: "Forecast.io",
        slug: "forecast-io",
        url: "http://forecast.io/",
        crawl_rate: 480,
      },
      {
        title: "HAMweather",
        slug: "hamweather",
        url: "http://www.hamweather.com/",
        crawl_rate: 360,
      },
      {
        title: "Met Office",
        slug: "met-office",
        url: "http://www.metoffice.gov.uk/",
        crawl_rate: 180,
      },
      {
        title: "OpenWeatherMap",
        slug: "openweathermap",
        url: "http://openweathermap.org/",
        crawl_rate: 360,
      },
      {
        title: "Weather Underground",
        slug: "wunderground",
        url: "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
        crawl_rate: 720,
      },
      {
        title: "World Weather Online",
        slug: "world-weather-online",
        url: "http://www.worldweatheronline.com/",
        crawl_rate: 360,
      },
    ],
    title: "London",
    location_type: "City",
    woeid: 44418,
    latt_long: "51.506321,-0.12714",
    timezone: "Europe/London",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [searchIn, setSearchIn] = useState(false);

  const [isCel, setIsCel] = useState(true);
  const [woeidData, setWoeidData] = useState(44418);
  const [weatherData, setWeatherData] = useState(obj);
  
  useEffect(() => {
    axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${woeidData}`)
    .then((data) =>{
      // console.log(data);
      setWeatherData(data.data);
    })
    // eslint-disable-next-line
  },[]);

  return (
    <div className="App">
      <DataContext.Provider value={{ isCel, setIsCel, woeidData, setWoeidData, weatherData, setWeatherData, isLoading, setIsLoading, searchIn, setSearchIn }}>
        <Sidebar />
        <Mainbody />
        <Searchbar />
      </DataContext.Provider>
    </div>
  );
}

export default App;
