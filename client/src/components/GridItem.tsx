import { Destination, weatherOptions } from '../types/interfaces'

interface Props {
  dest: Destination
  averageTemperature: number | string
  heatIndex: number | string
}

const GridItem: React.FC<Props> = ({ dest, averageTemperature, heatIndex }) => {
  return (
    <div className="destination-card">
      <ul key={dest.name}>
        <li>{dest.name}, {dest.country}</li>
        <li>{weatherOptions[0].label}: {averageTemperature}</li>
        <li>{weatherOptions[1].label}: {heatIndex}</li>
      </ul>
    </div>
  )
}

export default GridItem