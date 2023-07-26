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

            return (
              <GridItem dest={dest} averageTemperature={averageTemperature} heatIndex={heatIndex} />
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