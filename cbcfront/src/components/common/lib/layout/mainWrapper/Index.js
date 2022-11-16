import "./style.css";
function MainWrapper(props) {
  let aside;
  if (props.aside) {
    aside = (
      <aside
        style={{
          position: "fixed",
          bottom: 0,
          right: "0",
          backgroundColor: "var(--dark-blue)",
          display: "flex",
          flexDirection: "column-reverse",
          zIndex: "500",
          padding: "1em",
          color: "var(--white)",
        }}
      >
        {props.aside}
      </aside>
    );
  }
  return (
    <main>
      <div className="main-wrapper">
        {props.sidebar}
        <div>
          {aside}
          {props.children}
        </div>
      </div>
    </main>
  );
}
export default MainWrapper;
