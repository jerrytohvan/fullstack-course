


export const FilteredCountries = ({ countries, setCountry }) => {
  return (
    countries.map(country =>
    (
      <div key={country.name.official}>
        <p>{country.name.official}
          <button onClick={() => setCountry(country)}>show</button></p>
      </div>
    )
    )
  )
}
