


export const FilteredCountries = ({ countries, setCountry }) => {
  return (
    countries.map(country =>
    (
      <>
        <p>{country.name.official}
          <button onClick={() => setCountry(country)}>show</button></p>
      </>
    )
    )
  )
}
