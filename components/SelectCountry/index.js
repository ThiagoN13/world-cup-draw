import Select from 'react-select'

const formatOptionLabel = ({ name, label, flag }) => (
  <div style={{ display: "flex" }}>
    <img src={flag} style={{ width: '30px', height: '20px', marginRight: '10px' }}/>
    <div style={{ color: '#000' }}>{label}</div>
  </div>
);


export default function SelectCountry({ countries = [], onChange = () => {} }) {
  const options = countries.map(country => ({
    value: country.rankingItem.countryCode,
    label: country.rankingItem.name,
    flag: country.rankingItem.flag.src
  }))

  function onChangeValue({ value }) {
    const country = countries.find(country => country.rankingItem.countryCode === value)

    onChange(country)
  }

  return (
    <Select
      instanceId="select-country"
      placeholder="Selecione a sede"
      formatOptionLabel={formatOptionLabel}
      options={options}
      menuPlacement="top"
      onChange={onChangeValue}
    />
  )
}
