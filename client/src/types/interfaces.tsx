export interface WeatherData {
  id: number
  month: string
  average_temperature: number
  highest_temperature: number
  lowest_temperature: number
  average_feels_like_temperature: number
  highest_feels_like_temperature: number
  lowest_feels_like_temperature: number
  relative_humidity: number
  heat_index: number
  precipitation_levels: number
  air_quality_index: number
  cloud_cover: number
  destination: number
}

export interface Destination {
  name: string
  country: string
  continent: string
  latitude: number
  longitude: number
  description: string
  weatherdata: WeatherData[]
}