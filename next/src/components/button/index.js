import './index.scss'
const Button = ({label})=>{

    const onClick = ()=>{
        alert('its working now 1DSADSAD3!')
    }
    return (<button onClick={onClick}>{label}</button>)
}
export default Button;
