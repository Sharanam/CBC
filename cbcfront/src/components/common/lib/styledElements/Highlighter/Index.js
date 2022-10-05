import "./style.css";
export default function Highlighter(props) {
  return <mark className={props.color}>{props.children}</mark>;
}
