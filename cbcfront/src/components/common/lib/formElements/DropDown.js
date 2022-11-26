export default function DropDown(props) {
  const displayDefault = props.hideDefault ? (
    <></>
  ) : (
    <option defaultChecked={!props.default} disabled>
      select one of the options:
    </option>
  );
  return (
    <select
      style={{
        margin: "0.5rem 0",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "0",
        outline: "0",
        fontSize: "0.90rem",
        textTransform: "capitalize",
        ...props.style,
      }}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.default || ""}
    >
      {displayDefault}
      {props?.options?.map((data, index) => (
        <option key={index} value={data}>
          {data}
        </option>
      ))}
    </select>
  );
}
