export default function Error(props) {
  return (
    <p
      style={{
        textAlign: "right",
        ...props.style,
        color: "var(--danger)",
        fontSize: "0.75rem",
        marginBottom: "2px",
        textTransform: "capitalize",
      }}
    >
      {props.children}
    </p>
  );
}
