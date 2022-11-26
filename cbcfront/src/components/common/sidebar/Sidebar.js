import "./sidebar.css";
import AccountSide from "./for/AccountSide";
import PortalSide from "./for/PortalSide";
import DashboardSide from "./for/DashboardSide";
export function sidebarGenerator(propsFor) {
  let links;
  switch (propsFor) {
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
  return links;
}
export default function Sidebar(props) {
  return (
    <>
      <div className="sidebar">{sidebarGenerator(props.for)}</div>
    </>
  );
}
