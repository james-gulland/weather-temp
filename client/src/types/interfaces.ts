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

export interface ImageData {
  id: number
  is_primary: boolean
  image_parameter: string
}

export interface WeatherSelection {
  value: string
  label: string
}

export interface Destination {
  id: number
  name: string
  country: string
  continent: string
  latitude: number
  longitude: number
  description: string
  slug: string
  weatherdata: WeatherData[]
  images: ImageData[]
}

export const weatherOptions: WeatherSelection[] = [
  { value: 'average_temperature', label: 'Avg Temp' },
  { value: 'heat_index', label: 'Feels Like' },
  { value: 'relative_humidity', label: 'Humidity' },
  { value: 'precipitation_levels', label: 'Avg Rainfall' }
]