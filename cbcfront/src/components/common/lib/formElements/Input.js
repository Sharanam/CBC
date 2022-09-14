export default function Input(props) {
  return (
    <input
      {...props}
      style={{
        marginBottom: "0.5rem",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "0",
        outline: "0",
        ...props.style,
      }}
    />
  );
}
