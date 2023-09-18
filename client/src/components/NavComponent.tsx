import Switch from 'rc-switch'
import 'rc-switch/assets/index.css'
import { useEffect } from 'react' 

interface Props {
  tempUnit: 'C' | 'F'
  setTempUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>
}

const NavComponent: React.FC<Props> = ( {tempUnit, setTempUnit} ) => {

  const toggleTempUnit = () => {
    setTempUnit(prevUnit => prevUnit === 'C' ? 'F' : 'C')
  }

  useEffect (() => {
    localStorage.setItem('tempUnit', tempUnit)
    console.log(tempUnit)
  }, [tempUnit])

  // useEffect (() => {
  //   const savedTempUnit = localStorage.getItem('tempUnit')

  //   if (savedTempUnit === 'C' || savedTempUnit === 'F') setTempUnit(savedTempUnit)
  // }, [setTempUnit])

  return (
    <div className="nav">
      <Switch
        onChange={toggleTempUnit}
        checked={tempUnit === 'C'}
        // disabled={disabled}
        checkedChildren="°C"
        unCheckedChildren="°F"
      />
    </div>
  )
}

export default NavComponent