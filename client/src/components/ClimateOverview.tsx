import { WeatherData, weatherOptions } from "../types/interfaces"

interface Props {
  weatherdata: WeatherData[]
}

const ClimateOverview: React.FC<Props> = ({ weatherdata }) => {
  return (
    <table className="climate-table">
      <thead> {/* COLUMN HEADINGS */}
        <tr>
          <th className="table-col-heading"></th>
          {weatherdata.map((month) => <th key={month.id}>{month.month.substring(0,3)}</th>)}
        </tr>
      </thead> 

      <tbody>
        {/* AVG FEELS ROW */}
        <tr>
          <td>{weatherOptions[1].label}</td>
          {weatherdata.map((month) => <td key={month.id} className="table-climate-data">{month.average_feels_like_temperature}</td>)}
        </tr>

        {/* AVG TEMP ROW */}
        <tr>
          <td>{weatherOptions[0].label}</td>
          {weatherdata.map((month) => <td key={month.id} className="table-climate-data">{month.average_temperature}</td>)}
        </tr>

        {/* REL HUMIDITY ROW */}
        <tr>
          <td>{weatherOptions[2].label}</td>
          {weatherdata.map((month) => <td key={month.id} className="table-climate-data">{month.relative_humidity}</td>)}
        </tr>

        {/* PRECIPITATION ROW */}
        <tr>
          <td>{weatherOptions[3].label}</td>
          {weatherdata.map((month) => <td key={month.id} className="table-climate-data">{month.precipitation_levels}</td>)}
        </tr>
      </tbody>
    </table>
  )
}

export default ClimateOverview