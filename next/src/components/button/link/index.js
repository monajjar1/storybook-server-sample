const Link = ({label})=>{
    const onClick = ()=>{
        alert('its working now!!!!!!')
    }
    return (<input type="button" onClick={onClick} value={label} />  )
}
export default Link;
