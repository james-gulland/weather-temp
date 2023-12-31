import { Destination } from '../types/interfaces'
import GridItem from './GridItem'

interface Props {
  filteredDestinations: Destination[]
  month: string
  tempUnit: 'C' | 'F'
}

const Grid: React.FC<Props> = ({ filteredDestinations, month, tempUnit }) => {
  return (
    <>
      {filteredDestinations.length > 0 ? (
        <>
          {filteredDestinations.map((dest) => {
            // Get weather data
            const weatherDataForMonth = dest.weatherdata.find(
              (data) => data.month === month
            )
            const averageTemperature = weatherDataForMonth
              ? weatherDataForMonth.average_temperature
              : 'n/a'
            const heatIndex = weatherDataForMonth
              ? weatherDataForMonth.heat_index
              : 'n/a'
            const humidity = weatherDataForMonth
              ? weatherDataForMonth.relative_humidity
              : 'n/a'
            const averageRainfall = weatherDataForMonth
              ? weatherDataForMonth.precipitation_levels
              : 'n/a'

            return (
              <GridItem
                dest={dest}
                key={dest.id}
                month={month}
                averageTemperature={averageTemperature}
                heatIndex={heatIndex}
                humidity={humidity}
                averageRainfall={averageRainfall}
                tempUnit={tempUnit}
              />
            )
          })}
        </>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Grid
