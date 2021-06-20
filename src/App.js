import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const axios = require("axios");
  const API_KEY = process.env.API_KEY;

  const [city, setCity] = useState();
  const [info,setInfo] =useState({});

  const celsius = (temp)=>{
    const cell = Math.round(temp- 273.15)
    return cell;
  }

  const getWeather = async (city) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then(function (response) {
        setInfo({city: response.data.name , country : response.data.sys.country,celsius: celsius(response.data.main.temp), celsius_max : celsius(response.data.main.temp_max) , celsius_min: celsius(response.data.main.temp_min), description: response.data.weather[0].description});
      })
      .catch(function (error) {
        console.log(error);
      });

    // const call_apt = await fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?q=Londonn&appid=${API_KEY}`
    // );
    // const res = await call_apt.json();
  };

  console.log('info', info);

  useEffect(() => {
    getWeather(city);
  }, [city]);

  const finish = (e) => {
    e.preventDefault();
    console.log("Ok", e.target.elements.city.value);
    setCity(e.target.elements.city.value);
  };

  return (
    <div className="App">
      <form onSubmit={finish}>
        <input name="city" />
        <button type="submit">Ok</button>
      </form>
      <ul>
        <li>{info.country}</li>
        <li>{info.city}</li>
        <li>{info.celsius}</li>
        <li>{info.celsius_max}</li>
        <li>{info.celsius_min}</li>
        <li>{info.description}</li>
      </ul>
    </div>
  );
}

export default App;
