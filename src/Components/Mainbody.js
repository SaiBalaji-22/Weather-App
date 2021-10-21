import React,{useContext} from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import { DataContext } from '../Contexts/DataContext';
import moment from "moment";

function Mainbody() {
	const { isCel, setIsCel, weatherData } = useContext(DataContext);
	const handleClickCel = () => {
		if (!isCel) {
			setIsCel(true);
		}
	}

	const handleClickFau = () => {
		if (isCel) {
			setIsCel(false);
		}
	}

	const bar = {
		width: `${weatherData.consolidated_weather[0].humidity}%`
	}

	return (
		<div className="main-body">
			<div className="body-container">
				<div className="toggle">
					<span className= {isCel ? "sym cel active" : "sym cel"} onClick={handleClickCel} >&#8451;</span>
					<span className= {isCel ? "sym fau" : "sym fau active"} onClick={handleClickFau}>&#8457;</span>
				</div>
				<ul className="week-weather">
					{
						weatherData.consolidated_weather.map((data,idx) => {
							if(idx !== 0) {
								return (
									<li key={data.id}>
										<p className="dates">{moment(data.applicable_date).format("ddd, DD MMM")}</p>
										<img src={`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`} alt=""/>
										<div className="temps">
											<span className="max">{isCel ? Math.round(data.max_temp) : Math.round(32 + (data.max_temp * 1.8))}{isCel ? <>&#8451;</> : <>&#8457;</>}</span>
											<span className="min">{isCel ? Math.round(data.min_temp) : Math.round(32 + (data.min_temp * 1.8))}{isCel ? <>&#8451;</> : <>&#8457;</>}</span>
										</div>
									</li>
								)
							}
							return null;
						})
					}
				</ul>

				<h2>Today&#8217;s Highlights</h2>
				<div className="grid-1">
					<div className="grid-item wind-status">
						<p>Wind Status</p>
						<div className="status-num">
							<span>{Math.round(weatherData.consolidated_weather[0].wind_speed)}</span>
							<div>mph</div>
						</div>
						<span className="direction">
							<ExploreIcon className="explore"/> {weatherData.consolidated_weather[0].wind_direction_compass}
						</span>
					</div>

					<div className="grid-item humidity">
						<p>Humidity</p>
						<div className="humidity-num">
							<span>{weatherData.consolidated_weather[0].humidity}</span>
							<span className="per">%</span>
						</div>

            <div className="percent-bar">
              <div className="bar-nums">
              <span>0</span>
              <span>50</span>
              <span>100</span>
              </div>
							<div className="bar-container">
								<div className="bar" style={bar}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid-2">
					<div className="grid-item visibility">
            <p>visibility</p>
            <div className="vis-distance">
              <span className="dis-num">{Math.round(weatherData.consolidated_weather[0].visibility)}</span>
              <span className="dis-unit">miles</span>
            </div>
					</div>
					<div className="grid-item air-pressure">
            <p>Air pressure</p>
            <div className="pressure-value">
              <span className="pressure-num">{weatherData.consolidated_weather[0].air_pressure}</span>
              <span className="pressure-unit">mb</span>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Mainbody;
