import React, { useEffect, useState } from "react"
import axios from 'axios'

const Search = ({value, onChange}) => (
  <div>
    find countries <input value={value} onChange={onChange}/>
  </div>
)

const ShowCountryList = ({countries, setSearch}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <ShowCountryInfo country={countries[0]} />
      </div>
    )
  } else {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.official}>
            {country.name.common} <button onClick={() => {setSearch(country.name.common)}}>show</button>
          </div>
        ))}
      </div>
    )
  }
}

const ShowCountryInfo = ({country}) => (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country Flag"/>
      <Weather countryName={country.name.common}/>
    </div>
)

const Weather = ({countryName}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const link = 'https://api.openweathermap.org/data/2.5/weather?q=' + countryName + '&units=metric&appid=' + api_key

  const [weather, setWeather] = useState({})

  const getDirection = (deg) => {
    if (deg > 11.25 & deg <= 33.75) {
      return 'NNE'
    } else if (deg > 33.75 & deg <= 56.25) {
      return 'NE'
    } else if (deg > 56.25 & deg <= 78.75) {
      return 'ENE'
    } else if (deg > 78.75 & deg <= 101.25) {
      return 'E'
    } else if (deg > 101.25 & deg <= 123.75) {
      return 'ESE'
    } else if (deg > 123.75 & deg <= 146.25) {
      return 'SE'
    } else if (deg > 146.25 & deg <= 168.75) {
      return 'SSE'
    } else if (deg > 168.75 & deg <= 191.25) {
      return 'S'
    } else if (deg > 191.25 & deg <= 213.75) {
      return 'SSW'
    } else if (deg > 213.75 & deg <= 236.25) {
      return 'SW'
    } else if (deg > 236.25 & deg <= 258.75) {
      return 'WSW'
    } else if (deg > 258.75 & deg <= 281.25) {
      return 'W'
    } else if (deg > 281.25 & deg <= 303.75) {
      return 'WNW'
    } else if (deg > 303.75 & deg <= 326.25) {
      return 'NW'
    } else if (deg > 326.25 & deg <= 348.75) {
      return 'NNW'
    } else {
      return 'N'
    }
  }

  useEffect(() => {
    axios
    .get(link)
    .then(response => {
        const weatherObject = {
          temp: response.data.main.temp,
          windSpeed: Math.round(response.data.wind.speed * 2.23694),
          windDirection: getDirection(response.data.wind.deg),
          iconId: response.data.weather[0].icon
        }
        setWeather(weatherObject)
    })
  }, [])
  
  return (
    <div>
      <h2>Weather in {countryName}</h2>
      <div><b>temperature:</b> {weather.temp} Celcius</div>
      <img src={'https://openweathermap.org/img/wn/' + weather.iconId + '@2x.png'} alt='weather icon'/>
      <div><b>wind:</b> {weather.windSpeed} mph direction {weather.windDirection}</div>
    </div>
  )


}

const App = () => {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')

  const filtered = (search === '') ? list : list.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setList(response.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <Search value={search} onChange={(event) => setSearch(event.target.value)}/>
      <ShowCountryList countries={filtered} setSearch={setSearch}/>
    </div>
  );
}

export default App;
