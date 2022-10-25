import "./style.css";
export default function Highlighter(props) {
  return (
    <mark className={props.color} style={props.style}>
      {props.children}
    </mark>
  );
}
