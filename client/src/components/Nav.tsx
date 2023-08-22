import NavComponent from "./NavComponent"
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <Link to="/">OnlySun</Link>
      </div>
      <NavComponent />
    </div>
  )
}

export default Nav