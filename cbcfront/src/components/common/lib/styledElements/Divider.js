export default function Divider(props) {
  return (
    <div
      style={{
        border: `1px solid ${props.color || "grey"}`,
        width: props.vertical ? "1px" : props.length || "100%",
        height: props.vertical ? props.length || "100%" : "1px",
        ...props.style,
      }}
    ></div>
  );
}
