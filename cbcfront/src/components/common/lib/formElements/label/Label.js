import "./label.css";
export default function Label(props) {
  return (
    <label
      {...props}
      style={{
        color: "var(--light-dark)",
        ...props.style,
      }}
    >
      {props.children}
    </label>
  );
}
