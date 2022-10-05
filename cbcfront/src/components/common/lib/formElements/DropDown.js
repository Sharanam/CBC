export default function DropDown(props) {
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
    >
      <option defaultChecked defaultValue={props.default} disabled>
        select one of the options:
      </option>
      {props.options.map((data, index) => (
        <option key={index} value={data}>
          {data}
        </option>
      ))}
    </select>
  );
}
