import { useEffect, useState } from 'react'
import ListCountries from '../components/ListCountries'
import ListGroups from '../components/ListGroups'
import ListPots from '../components/ListPots'
import SelectCountry from '../components/SelectCountry'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [countSelecteds, setCountSelecteds] = useState(0)
  const [search, setSearch] = useState('')
  let [page, setPage] = useState(0)
  const pageSize = 100

  useEffect(() => {
    fetchCountries()
  }, [])

  async function fetchCountries() {
    const data = await fetch('/api/fifa/ranking')

    const countriesList = await data.json()

    setCountries(countriesList.rankings)
  }

  function selectCountry(country) {
    const selectedCountries = onCountSelecteds()

    if (selectedCountries >= 32 && !country.selected) {
      return scrollTo('#slide3')
    }

    selectedCountries += country.selected ? -1 : 1

    country.selected = !country.selected

    updateCountry(country)
    setCountSelecteds(selectedCountries)
  }

  function updateCountry(country) {
    const newCountry = { ...country }

    const index = countries.findIndex(c => c.rankingItem.countryCode === country.rankingItem.countryCode)

    countries.slice(index, 1, newCountry)

    setCountries([...countries])
  }

  function onCountSelecteds() {
    return countries.filter(country => country.selected).length
  }

  function scrollTo(href) {
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
  }

  function getSeletectedsContries () {
    const selectedsCountries = countries.filter(country => country.selected)

    selectedsCountries.sort((a, b) => {
      if (a.isThirst) return -1
      if (b.isThirst) return 1

      return a.rankingItem.rank - b.rankingItem.rank
    })

    return selectedsCountries
  }

  function onChangeCountry (country) {
    const newCountries = countries.map(c => {
      c.isThirst = c.rankingItem.countryCode === country.rankingItem.countryCode

      return c
    })

    setCountries(newCountries)
    if (!country.selected) {
      selectCountry(country)
    }
  }

  function onChangeSearch (e) {
    setSearch(e.target.value)
  }

  function getCountries () {
    const filteredCountries = countries.filter(country => {
      return country.rankingItem.name.toLowerCase().includes(search.toLowerCase())
    })
    const initial = page * pageSize

    return filteredCountries.slice(initial, initial + pageSize)
  }

  function nextPage() {
    page++

    if (page * pageSize > countries.length) {
      page--
    }

    setPage(page)
  }

  function previousPage() {
    page--

    if (page < 0) {
      page = 0
    }

    setPage(page)
  }

  return (
    <>
      <main className="container">
        <section className="slide parallax" id="slide1">
          <h1>Chaveamento copa do mundo</h1>

          <div className="select">
            <label>Sede: </label>
            <SelectCountry countries={countries} onChange={onChangeCountry}/>
          </div>
        </section>

        <section className="slide" id="slide2">
          <div className="navbar-slide2">
            <div>
              <h1>Selecione as seleções.</h1>
              <span>{countSelecteds} /32 seleções selecionadas</span>
            </div>

            <input type="text" placeholder="Pesquisar..." onChange={onChangeSearch}/>
          </div>

          <ListCountries
            countries={getCountries()}
            selectCountry={selectCountry}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </section>

        <section className="slide parallax" id="slide3">
          <h1>Potes</h1>

          <ListPots
            countries={getSeletectedsContries()}
          />
        </section>

        <section className="slide" id="slide4">
          <h1>Grupos</h1>

          <ListGroups
            countries={getSeletectedsContries()}
          />
        </section>

        <section className="slide" id="slide5">
          <h1>Eliminatórias</h1>
        </section>
      </main>
    </>
  )
}
