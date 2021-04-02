import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState('')
  const [weather, setWeather] = useState('')
  const [searchString, setSearchString] = useState('')
  const API_KEY = process.env.REACT_APP_API_KEY

  let countriesToShow = searchString ? countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase())) : countries
  if (countriesToShow.length === 1 && currentCountry.name !== countriesToShow[0].name) {
    setCurrentCountry(countriesToShow[0])
  }

  useEffect(() => {
    const getData = async () => {
      countries.length < 1 && await axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
          console.log(`country data fetched`)
          setCountries(response.data)
        })

      currentCountry && await axios
        .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${currentCountry.capital}`)
        .then(response => {
          console.log(`weather data fetched`)
          setWeather(response.data.current)
        })
    }
    getData()
    //eslint-disable-next-line 
  }, [currentCountry, API_KEY])

  const handleSearch = (e) => {
    setSearchString(e.target.value)
  }

  const handleClick = (country) => {
    setSearchString(country.name)
    setCurrentCountry(country)
  }

  let render

  if (countriesToShow.length === 1) {
    render =
      <div key={currentCountry.name}>
        <h2>{currentCountry.name}</h2>
        <p>capital {currentCountry.capital}</p>
        <p styles={"font-size: 50px"}>population {currentCountry.population}</p>
        <h3>languages</h3>
        {
          currentCountry && currentCountry.languages.map(language =>
            <p key={language.name}>{language.name}</p>
          )
        }
        <img src={currentCountry.flag} alt={"country flag"} style={{ height: "100px", width: "100px" }} />
        <h3>weather in {currentCountry.capital}</h3>
        {
          weather && <div>
            <p><strong>temperature: </strong>{weather.temperature} Celcius</p>
            <img src={weather.weather_icons[0]} alt={"weather icon"} style={{ height: "50px", width: "50px" }} />
            <p><strong>wind: </strong>{weather.wind_speed} km/h direction {weather.wind_dir}</p>
          </div>
        }

      </div>
  } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    render = countriesToShow.map(country =>
      <div key={country.name}>
        <p >{country.name} <button onClick={() => handleClick(country)}>show</button></p>
      </div>
    )
  } else if (countriesToShow.length > 10) {
    render = <p>Too many matches, specify another filter</p>
  } else {
    render = <p>no matches found</p>
  }

  return (
    < div >
      <form>
        <Filter searchString={searchString} handleSearch={handleSearch} />
      </form>
      {render}
    </div >
  )
}

export default App