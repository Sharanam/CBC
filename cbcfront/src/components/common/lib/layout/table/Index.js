import "./style.css";
function Table(props) {
  return (
    <>
      <table {...props} className={(props.className || "") + " custom-table"}>
        {props.children}
      </table>
    </>
  );
}

export default Table;
