


export const FilteredCountries = ({ countries }) => {
  return (
    countries.map(country =>
      (
        <>
          <p>{country.name.official}</p>
        </>
      )
    )
  )
}
