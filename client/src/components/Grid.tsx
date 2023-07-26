import { Destination, weatherOptions } from '../types/interfaces'

interface Props {
  filteredDestinations: Destination[]
  month: string
}

const Grid: React.FC<Props> = ( { filteredDestinations, month }) => {
  return (
    <>
      {filteredDestinations.length > 0 ? 
        <div className="destination-card">
          {filteredDestinations.map((dest) => {
            const weatherDataForMonth = dest.weatherdata.find(data => data.month === month)
            const averageTemperature = weatherDataForMonth ? weatherDataForMonth.average_temperature : 'n/a'
            const heatIndex = weatherDataForMonth ? weatherDataForMonth.heat_index : 'n/a'

            return (
              <ul key={dest.name}>
                <li>{dest.name}, {dest.country}</li>
                <li>{weatherOptions[0].label}: {averageTemperature}</li>
                <li>{weatherOptions[1].label}: {heatIndex}</li>
              </ul>
            )
          })}
        </div>
        :
        <div>Choose your preference and hit Go!</div>
      }
    </>
  )
}

export default Grid