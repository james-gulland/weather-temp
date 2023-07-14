// this function takes a min temp and a max temp, and
// returns an array of all numbers within that temp range
export const generateTemperatureRange = (minTemp: number, maxTemp: number): number[] => {
  const range: number[] = [];
  for (let i = minTemp; i <= maxTemp; i++) {
    range.push(i);
  }
  return range
}