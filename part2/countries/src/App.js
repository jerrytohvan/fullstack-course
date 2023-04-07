import { useState, useEffect } from 'react'
import { Country } from './components/Country'
import { FilteredCountries } from './components/FilteredCountries'
import { getAllCountries } from './services/countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const allCountriesData = getAllCountries().then(countries => setAllCountries(countries));
    console.log(allCountriesData);
  }, []);

  const handleChange = (event) => {
    setCountry(null)
    setSearch(event.target.value)
  }

  const filterCountries = () => {
    if (!country && search && allCountries) {
      const filteredCountries = allCountries.filter(country => country.name.official.toLocaleLowerCase().includes(search))
      if (filteredCountries.length === 1) {
        setCountry(filteredCountries[0]);
        return [];
      }
      return filteredCountries;
    }
    return [];
  }

  return (
    <div>
      find countries: <input value={search} onChange={handleChange} />
      <div>
        {
          (filterCountries().length > 10) ?
            'Too many matches, specify another filter' :
            <FilteredCountries countries={filterCountries()} setCountry={setCountry} />
        }

      </div>
      <div>
        {
          country && <Country country={country} />
        }
      </div>
    </div>
  )
}

export default App;
