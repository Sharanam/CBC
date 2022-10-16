export default function Form(props) {
  return (
    <form
      {...props}
      style={{
        margin: props.margin || "2rem auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",

        padding: "1rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--dull-white)",
        ...props.style,
      }}
    >
      <h1
        style={{
          fontSize: "1.6rem",
          marginBottom: "1rem",

          ...props.style,
        }}
      >
        {props.children.title}
      </h1>
      {props.children.formFields}
      {props.children.buttons}

      {props.children.additional}
    </form>
  );
}
