const Link = ({label, type, size})=>{
    const onClick = ()=>{
        alert('its working now!!!!!!')
    }
    let classes = `btn btn--${type} btn--${size}`
    return (<input type="button" className={classes} onClick={onClick} value={label} />  )
}
export default Link;
