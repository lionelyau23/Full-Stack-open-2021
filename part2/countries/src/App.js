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

const ShowCountryInfo = ({country}) => { 

  let langs = []
  for (let lang in country.languages) {
    langs.push(country.languages[lang])
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {langs.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country Flag"/>
    </div>
)}

const App = () => {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  // const [filtered, setFiltered] = useState([])

  const filtered = (search === '') ? list : list.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setList(response.data)
    })
  }

  // console.log(list[0].name)

  useEffect(hook, [])

  return (
    <div>
      <Search value={search} onChange={(event) => setSearch(event.target.value)}/>
      <ShowCountryList countries={filtered} setSearch={setSearch}/>
    </div>
  );
}

export default App;
