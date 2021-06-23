import "./App.css";
import { useEffect, useState } from "react";
import "weather-icons/css/weather-icons.css";
import ShowWeather from "./components/ShowWeather";

function App() {
  const axios = require("axios");
  const API_KEY = process.env.API_KEY;

  const [city, setCity] = useState();
  const [info, setInfo] = useState({});
  const [icon, setIcon] = useState({});

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(icons.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(icons.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(icons.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(icons.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(icons.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(icons.Clouds);
        break;
      default:
        setIcon(icons.Clouds);
    }
  };

  const getWeather = async (city) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then(function (response) {
        setInfo({
          city: response.data.name,
          country: response.data.sys.country,
          celsius: response.data.main.temp,
          celsius_max: response.data.main.temp_max,
          celsius_min: response.data.main.temp_min,
          description: response.data.weather[0].description,
        });

        getWeatherIcon(weatherIcon, response.data.weather[0].id);
      })
      .catch(function (error) {
        alert("Error", error);
      });
  };

  useEffect(() => {
    if (city !== undefined) {
      getWeather(city);
    }
  }, [city]);

  const finish = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <div className="App">
      <form onSubmit={finish}>
        <input name="city" />
        <button type="submit">Ok</button>
      </form>
      <ShowWeather
        weatherIcon={icon}
        city={info.city}
        celsius={info.celsius}
        celsius_min={info.celsius_min}
        celsius_max={info.celsius_max}
        description={info.description}
      />
    </div>
  );
}

export default App;
