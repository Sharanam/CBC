import "./index.css";
export default function Card(props) {
  return (
    <>
      <div
        className={"card " + (props.className || "")}
        style={{
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
