function Button({primary = false, label="Button"}) {
  let className = "storybook-button";
  if (primary) {
    className += " storybook-button--primary";
  }else {
    className += " storybook-button--secondary";
  }
  return <button className={className}>{label}</button>;
}

export default Button;
