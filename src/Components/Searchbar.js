import React, { useState, useContext } from "react";
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from '../Contexts/DataContext'

function Searchbar() {
  const [input, setInput] = useState('');
  const [placeData, setPlaceData] = useState([]);

  const {setWoeidData, searchIn, setSearchIn} = useContext(DataContext);

  const search = () => {
    axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=${input}`)
    .then((data) => {
      console.log(data.data);
      setPlaceData(data.data);
    })
  }

  const searchout = () => {
    setSearchIn(false);
  }

  return (
    <div className={searchIn ? "search search-in" : "search"} >
      <div className="search-container">
        <div className="search-nav" onClick={searchout}>
          <CloseIcon fontSize="large" />
        </div>
        <div className="search-input">
          <input className="search-field" placeholder="Search for places" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className = "search-btn" onClick={search}>Search</button>
        </div>
        <ul className ="search-list">
          {
            placeData.map((data) => {
              return(
                <li key={data.woeid} className="search-item" onClick={() => {
                    setWoeidData(data.woeid)
                    setSearchIn(false);
                  }}>
                  {data.title}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default Searchbar;
