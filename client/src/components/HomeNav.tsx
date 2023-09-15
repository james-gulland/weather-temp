import NavComponent from "./NavComponent"

interface Props {
  tempUnit: 'C' | 'F'
  setTempUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>
}

const HomeNav: React.FC<Props> = ( {tempUnit, setTempUnit} ) => {
  return (
    <NavComponent tempUnit={tempUnit} setTempUnit={setTempUnit}/>
  )
}

export default HomeNav