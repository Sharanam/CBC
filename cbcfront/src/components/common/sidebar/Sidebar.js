import "./sidebar.css";
import AccountSide from "./for/AccountSide";
import PortalSide from "./for/PortalSide";
import DashboardSide from "./for/DashboardSide";
export default function Sidebar(props) {
  let links;
  switch (props.for) {
    case "account":
      links = <AccountSide />;
      break;
    case "portal":
      links = <PortalSide />;
      break;
    case "dashboard":
      links = <DashboardSide />;
      break;
    default:
      links = <AccountSide />;
  }
  return (
    <>
      <div className="sidebar">{links}</div>
    </>
  );
}
