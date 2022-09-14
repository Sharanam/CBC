import "./style.css";
function MainWrapper(props) {
  return (
    <main>
      <div className="main-wrapper">
        {props.sidebar}
        <div>{props.children}</div>
      </div>
    </main>
  );
}
export default MainWrapper;
