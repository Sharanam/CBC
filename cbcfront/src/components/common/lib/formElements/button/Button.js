import "./button.css";
export default function Button(props) {
  return (
    <button
      {...props}
      style={{
        marginBottom: "0.5rem",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "0",
        outline: "0",
        cursor: props.disabled ? "not-allowed" : "pointer",
        ...props.style,
      }}
    >
      {props.children}
    </button>
  );
}
