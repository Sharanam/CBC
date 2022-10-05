import "./style.css";
function Table(props) {
  return (
    <>
      <table {...props} className={(props.className || "") + " customtable"}>
        {props.children}
      </table>
    </>
  );
}

export default Table;
