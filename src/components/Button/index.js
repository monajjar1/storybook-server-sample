function Button({primary = false, label="Button", theme}) {
  let className = "storybook-button";
  if (primary == 'true') {
    className += " storybook-button--primary";
  }else {
    className += " storybook-button--secondary";
  }
  return <button className={className}>{label}</button>;
}

export default Button;
