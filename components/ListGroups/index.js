import styles from './ListGroups.module.css'
import Arrays from '../../helpers/Arrays'
import { useState } from 'react'

export default function ListGroups({ countries = [] }) {
  const [showGroups, setShowGroups] = useState(false)
  const [groups, setGroups] = useState([
    { name: 'A', countries: [] },
    { name: 'B', countries: [] },
    { name: 'C', countries: [] },
    { name: 'D', countries: [] },
    { name: 'E', countries: [] },
    { name: 'F', countries: [] },
    { name: 'G', countries: [] },
    { name: 'H', countries: [] }
  ])

  function onGenerateGroups() {
    if (countries.length < 32) {
      return
    }

    generateGroups()
    setShowGroups(true)
  }


  function generateGroups () {
    const listGroups = [...groups]

    countries.forEach((country, index) => {
      const bowl = Math.floor(index / 8) + 1
      const group = randomGroup(listGroups, bowl, country)
      const position = randomPosition(group)

      group.countries[position] = country

      const indexGroup = listGroups.findIndex(g => g.name === group.name)

      listGroups.splice(indexGroup, 1, group)
    })

    setGroups(listGroups)
  }

  function randomPosition(group) {
    if (!group.countries.length) {
      return 0
    }

    const position = Math.floor(Math.random() * 4)

    if (group.countries[position]) {
      return randomPosition(group)
    }

    return position
  }

  function randomGroup(listGroups, bowl, country) {
    if (country.isThirst) {
      return listGroups[0]
    }

    const random = Math.floor(Math.random() * listGroups.length)
    const group = listGroups[random]

    const amount = group.countries.filter(g => g)

    if (amount.length === bowl) {
      return randomGroup(listGroups, bowl, country)
    }

    return group
  }

  function getRenderContry(country, index) {
    return (
      <div key={index} className={styles.item}>
        <img src={country.rankingItem.flag.src} alt={country.rankingItem.name} />
        <span>{country.rankingItem.name}</span>
      </div>
    )
  }

  function getRenderGroup() {
    if (countries.length < 32) {
      return (
        <h2>Selecione as 32 seleções!</h2>
      )
    }

    if (!showGroups) {
      return (
        <button onClick={onGenerateGroups}>Gerar grupos</button>
      )
    }

    return (
      <>
        {groups.map(group => {
          return (
            <div key={group.name} className={styles.col}>
              <h2>Grupo {group.name}</h2>

              {group.countries.map(getRenderContry)}
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className={styles.ListGroups}>
      {Arrays.isEmpty(countries)
        ? (
            <h2>Nenhuma seleção selecionada!</h2>
          )
        : getRenderGroup()
      }
    </div>
  )
}