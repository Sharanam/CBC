function Container(props) {
  let maxWidth;
  switch (props.size) {
    case "xs":
      maxWidth = "500px";
      break;
    case "sm":
      maxWidth = "640px";
      break;
    case "md":
      maxWidth = "768px";
      break;
    case "lg":
      maxWidth = "1024px";
      break;
    case "xl":
      maxWidth = "1280px";
      break;
    case "2xl":
      maxWidth = "1536px";
      break;

    default:
      maxWidth = "100%";
      break;
  }
  return (
    <>
      <div
        {...props}
        style={{
          ...props.style,
          margin: "auto",
          padding: "0.4rem",
          hyphens: "auto",
          wordWrap: "break-word",
          maxWidth,
        }}
        className={(props.className || "") + " container"}
      >
        {props.children}
      </div>
    </>
  );
}

export default Container;
