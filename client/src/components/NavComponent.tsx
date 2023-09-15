import Switch from 'rc-switch'
import 'rc-switch/assets/index.css'

const NavComponent = () => {
  return (
    <div className="nav">
      <Switch
        // onChange={onChange}
        // disabled={disabled}
        checkedChildren="°C"
        unCheckedChildren="°F"
      />
    </div>
  )
}

export default NavComponent