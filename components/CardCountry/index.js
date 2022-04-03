import styles from './CardCountry.module.css'

export default function CardCountry(props = {}) {
  const { country = {}, theme, isSelectable, onClick } = props

  function isSelected (country) {
    return isSelectable && (country.selected || country.isThirst) ? styles.selected : ''
  }

  function getIsSelectable() {
    return isSelectable ? styles.isSelectable : ''
  }

  function getTheme() {
    return theme === 'light' ? styles.light : ''
  }

  return (
    <div
      onClick={() => isSelectable && onClick(country)}
      className={
        `${styles.CardCountry} ${getTheme()} ${isSelected(country)} ${getIsSelectable()}`
      }
    >
      <img src={country.rankingItem.flag.src} alt={country.rankingItem.name} />
      <span>{country.rankingItem.name}</span>
      {country.isThirst && <span className={styles.isThirst}></span>}
    </div>
  )
}