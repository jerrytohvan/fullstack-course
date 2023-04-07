
const getLanguages = (languages) => {
  const keys = Object.keys(languages);
  const mappedLanguages = keys.map(key => languages[key]);
  return mappedLanguages;
} 

export const Country = ({ country }) => {
  return (
    <>
      <h1>
        {country.name.official}
      </h1>
      <br/>
      <p>capital {country.capital[0] ?? 'None'}</p>
      <p>area {country.area}</p>
      <br/>
      <p><b>languages:</b></p>
      <ul>
        {
          getLanguages(country.languages).map(language => <li>{language}</li>)
        }
      </ul>
      <br/>
      <img src={country.flags['png']} alt={country.alt} />
    </>
  )
}
