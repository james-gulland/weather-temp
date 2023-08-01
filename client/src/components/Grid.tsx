import { Destination } from '../types/interfaces'
import GridItem from './GridItem'

interface Props {
  filteredDestinations: Destination[]
  month: string
}

const Grid: React.FC<Props> = ( { filteredDestinations, month }) => {
  return (
    <>
      {filteredDestinations.length > 0 ? 
        <>
          {filteredDestinations.map((dest) => {
            const weatherDataForMonth = dest.weatherdata.find(data => data.month === month)
            const averageTemperature = weatherDataForMonth ? weatherDataForMonth.average_temperature : 'n/a'
            const heatIndex = weatherDataForMonth ? weatherDataForMonth.heat_index : 'n/a'
            const humidity = weatherDataForMonth ? weatherDataForMonth.relative_humidity : 'n/a'
            const averageRainfall = weatherDataForMonth ? weatherDataForMonth.precipitation_levels : 'n/a'

            return (
              <GridItem dest={dest} key={dest.id} month={month} averageTemperature={averageTemperature} heatIndex={heatIndex} humidity={humidity} averageRainfall={averageRainfall}/>
            )
          })}
        </>
        :
        <div>Choose your preference and hit Go!</div>
      }
    </>
  )
}

export default Grid