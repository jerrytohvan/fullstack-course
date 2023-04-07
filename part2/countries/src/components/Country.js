import { useState, useEffect } from 'react'
import { getWeather } from '../services/weather'

const getLanguages = (languages) => {
  const keys = Object.keys(languages);
  const mappedLanguages = keys.map(key => languages[key]);
  return mappedLanguages;
}

export const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const capitalCity = country.capital[0] ?? null;

  useEffect(() => {
    getWeather(capitalCity).then(
      data => setWeather(data)
    ).catch(
      error => {
        console.error(`Something wrong with fetching ${capitalCity} weather`, error.message)
      }
    )
  }, []);

  return (
    <>
      <h1>
        {country.name.official}
      </h1>
      <br />
      <p>capital {capitalCity ?? 'None'}</p>
      <p>area {country.area}</p>
      <br />
      <p><b>languages:</b></p>
      <ul>
        {
          getLanguages(country.languages).map(language => <li key={language}>{language}</li>)
        }
      </ul>
      <br />
      <img src={country.flags['png']} alt={country.alt} />
      <br />
      {
        weather &&
        (
          <>
            <h1>Weather in {weather.name}</h1>
            <>
              <p>temperature {weather.main.temp} Celcius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.name} />
              <p>wind {weather.wind.speed} m/s</p>
            </>
          </>
        )
      }
    </>
  )
}
