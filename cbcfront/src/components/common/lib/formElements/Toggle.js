import { useState } from "react";

export default function Toggle(props) {
  const [isChecked, setIsChecked] = useState(props.checked || false);
  const handleToggle = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    props.onToggle();
  };
  return (
    <input
      type="button"
      className="toggle"
      onChange={handleToggle}
      onClick={handleToggle}
      name={props.name}
      checked={isChecked}
      style={{
        padding: "0.5rem",
        border: "0",
        outline: "0",
        backgroundColor: isChecked
          ? "var(--toggle-button-true)"
          : "var(--toggle-button-false)",
        cursor: props.disabled ? "not-allowed" : "pointer",
        borderBottomColor: isChecked ? "var(--dark-blue)" : "var(--light-red)",
        ...props.style,
      }}
      value={(isChecked ? props.trueText : props.falseText) || ""}
    />
  );
}
