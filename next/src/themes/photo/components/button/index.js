import './index.scss'
import Link from './link'
const Button = ({label, type, size})=>{
    return (<Link label={label} type={type} size={size} />  )
}
export default Button;
