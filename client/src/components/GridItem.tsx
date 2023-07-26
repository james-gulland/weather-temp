import { Destination, weatherOptions } from '../types/interfaces'

interface Props {
  dest: Destination
  averageTemperature: number | string
  heatIndex: number | string
}

const GridItem: React.FC<Props> = ({ dest, averageTemperature, heatIndex }) => {
  return (
    <div className="destination-card" key={dest.id}>
      <div className="top-card">top part</div>
      <div className="bottom-card">
        <div className="dest-name">{dest.name}, {dest.country}</div>
        <ul className="dest-weather">
          <li>{weatherOptions[0].label}: {averageTemperature}</li>
          <li>{weatherOptions[1].label}: {heatIndex}</li>
        </ul>
      </div>
    </div>
  )
}

export default GridItem