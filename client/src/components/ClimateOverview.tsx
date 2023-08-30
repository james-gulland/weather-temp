import { WeatherData } from "../types/interfaces"

interface Props {
  weatherdata: WeatherData[]
}

const ClimateOverview: React.FC<Props> = ({ weatherdata }) => {
  return (
    <>
    {weatherdata.map((data, i) => {
        return (
          <div key={data.id}>{data.month}</div>
        )
      })
    }
    </>
  )
}

export default ClimateOverview