import React, { useState, useEffect } from "react";

const api = {
  key: "59a63de6b9361710b74887f7d217de3d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const response = await fetch(
          `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`
        );
        const data = await response.json();

        if (response.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country}: ${data.main.temp}°C, ${data.weather[0].description}`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div style={{ color: "green" }}>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default Weather;
