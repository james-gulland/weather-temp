import { WeatherData } from "../types/interfaces"

interface Props {
  weatherdata: WeatherData[]
}

const ClimateOverview: React.FC<Props> = ({ weatherdata }) => {
  return (
    <>
    {weatherdata.map((data) => {
        return (
          <div key={data.id}>
            <div>{data.month}</div>
            <div>Avg feels like: {data.average_feels_like_temperature}</div>
            <div>Avg temp: {data.average_temperature}</div>
            <div>Humidity: {data.relative_humidity}</div>
            <div>Avg rainfall: {data.precipitation_levels}</div>
          </div>
        )
      })
    }
    </>
  )
}

export default ClimateOverview