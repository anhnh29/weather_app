import React from "react";
import "./index.css";

const ShowWeather = (props) => {
  const celsiusCustom = (temp) => {
    const cell = Math.round(temp - 273.15);
    return cell;
  };
  const showMaxMinTemp = (min, max) => {
    if (min && max) {
      return (
        <>
          <span>{celsiusCustom(min)} &deg;</span> <span>-</span>{" "}
          <span> {celsiusCustom(max)} &deg;</span>
        </>
      );
    }
  };

  return (
    <div className="container">
      <div className="Card">
        <h1 className="">{props?.city}</h1>
        <h5 className="">
          <i className={`wi ${props?.weatherIcon}`} />
        </h5>

        {props?.celsius ? (
          <h1 className="">{celsiusCustom(props?.celsius)}&deg;</h1>
        ) : null}

        {showMaxMinTemp(props?.celsius_min, props?.celsius_max)}
        {props?.description && (
          <h4 className="">
            {props?.description?.charAt(0)?.toUpperCase() +
              props?.description?.slice(1)}
          </h4>
        )}
      </div>
    </div>
  );
};

export default ShowWeather;
