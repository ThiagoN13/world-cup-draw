import styles from './ListPots.module.css'
import Arrays from '../../helpers/Arrays'
import CardCountry from '../CardCountry'

export default function ListPots({ countries = [] }) {
  const pots = [1, 2, 3, 4]

  function getCountries(bowl) {
    switch (bowl) {
      case 1:
        return countries.slice(0, 8)
      case 2:
        return countries.slice(8, 16)
      case 3:
        return countries.slice(16, 24)
      case 4:
        return countries.slice(24, 32)
    }
  }

  function getRenderContry(country, index) {
    return (
      <CardCountry
        key={index}
        onClick={(country) => selectCountry(country)}
        country={country}
        theme="light"
      />
    )
  }

  return (
    <div className={styles.ListPots}>
      {Arrays.isEmpty(countries)
        ? (<h2>Nenhuma seleção selecionada!</h2>)
        : (
          <>
          {pots.map(bowl => {
            return (
              <div key={bowl} className={styles.col}>
                <h2>Pote {bowl}</h2>

                {getCountries(bowl).map(getRenderContry)}
              </div>
            )
          })}
          </>
        )
      }
    </div>
  )
}