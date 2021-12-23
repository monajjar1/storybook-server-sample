function Button({primary = false, label="Button"}) {
  const alertTitle = ()=>{
    alert('aaaaaaaah')
  }

  let className = "storybook-button";
  if (primary == 'true') {
    className += " storybook-button--primary";
  }else {
    className += " storybook-button--secondary";
  }


  return <button onClick={alertTitle} className={className}>'TETE'</button>;
}

export default Button;
