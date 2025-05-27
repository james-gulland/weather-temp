import NavComponent from './NavComponent'
import { Link } from 'react-router-dom'

interface Props {
  tempUnit: 'C' | 'F'
  setTempUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>
}

const Nav: React.FC<Props> = ({ tempUnit, setTempUnit }) => { 
return (
    <div className="nav-container">
      <div className="nav-logo">
        <Link to="/">OnlySun</Link>
      </div>
      <NavComponent tempUnit={tempUnit} setTempUnit={setTempUnit} />
    </div>
  )
}

export default Nav
