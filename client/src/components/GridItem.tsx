import { Destination, weatherOptions } from '../types/interfaces'

interface Props {
  dest: Destination
  averageTemperature: number | string
  heatIndex: number | string
  humidity: number | string
  averageRainfall: number | string
}

const GridItem: React.FC<Props> = ({ dest, averageTemperature, heatIndex, humidity, averageRainfall }) => {
  return (
    <div className="destination-card">
      <div className="top-card">top part</div>
      <div className="bottom-card">
        <div className="dest-name">{dest.name}, {dest.country}</div>
        <div className="dest-weather-data">
          <div className="weather-data">{weatherOptions[0].label}: <span>{averageTemperature}</span></div>
          <div className="weather-data">{weatherOptions[1].label}: <span>{heatIndex}</span></div>
          <div className="weather-data">{weatherOptions[2].label}: <span>{humidity}%</span></div>
          <div className="weather-data">{weatherOptions[3].label}: <span>{averageRainfall}mm</span></div>
        </div>
      </div>
    </div>
  )
}

export default GridItem