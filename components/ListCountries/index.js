import styles from './ListCountries.module.css'
import CardCountry from '../CardCountry'

export default function ListCountries(props = {}) {
  const { countries = [], selectCountry = () => {}, previousPage, nextPage } = props

  return (
    <div className={styles.ListCountries}>
      {countries.map((country, index) => (
        <CardCountry
          key={index}
          onClick={selectCountry}
          country={country}
          isSelectable={true}
        />
      ))}

      <div className={styles.footer}>
        <button type="button" onClick={() => previousPage()}>Anterior</button>
        <button type="button" onClick={() => nextPage()}>Próximo</button>
      </div>
    </div>
  )
}