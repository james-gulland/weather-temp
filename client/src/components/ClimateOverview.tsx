import { WeatherData, weatherOptions } from "../types/interfaces"

interface Props {
  weatherdata: WeatherData[]
}

const ClimateOverview: React.FC<Props> = ({ weatherdata }) => {
  return (
    <table>
      <thead> {/* COLUMN HEADINGS */}
        <tr>
          <th></th>
          {weatherdata.map((month) => <th key={month.id}>{month.month.substring(0,3)}</th>)}
        </tr>
      </thead> 

      <tbody>
        {/* AVG FEELS ROW */}
        <tr>
          <td>{weatherOptions[1].label}</td>
          {weatherdata.map((month) => <td key={month.id}>{month.average_feels_like_temperature}</td>)}
        </tr>

        {/* AVG TEMP ROW */}
        <tr>
          <td>{weatherOptions[0].label}</td>
          {weatherdata.map((month) => <td key={month.id}>{month.average_temperature}</td>)}
        </tr>

        {/* REL HUMIDITY ROW */}
        <tr>
          <td>{weatherOptions[2].label}</td>
          {weatherdata.map((month) => <td key={month.id}>{month.relative_humidity}</td>)}
        </tr>

        {/* PRECIPITATION ROW */}
        <tr>
          <td>{weatherOptions[3].label}</td>
          {weatherdata.map((month) => <td key={month.id}>{month.precipitation_levels}</td>)}
        </tr>
      </tbody>
    </table>
  )
}

export default ClimateOverview