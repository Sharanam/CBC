import "./index.css";
export default function Card(props) {
  const whiteStyle = props.white
    ? {
        color: "var(--dark-blue)",
        backgroundColor: "var(--white)",
      }
    : {};
  return (
    <>
      <div
        className={"card " + (props.className || "")}
        style={{
          ...whiteStyle,
          ...props.style,
        }}
      >
        {props.children}
        {props.actions && (
          <>
            <hr style={{ margin: "0.5rem 0" }} />
            {props.actions}
          </>
        )}
      </div>
    </>
  );
}
