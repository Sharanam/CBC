import { Link } from "react-router-dom";

const PortalSide = () => {
  return (
    <ul>
      <li>
        <Link to="/portal/busstops">Live Bus Stops</Link>
      </li>
      <li>
        <Link to="/portal/buses">Live Bus</Link>
      </li>
      <li>
        <Link to="/portal/routes">Search Routes</Link>
      </li>
      <li>
        <Link to="/portal/feedback">Give Feedback</Link>
      </li>
    </ul>
  );
};
export default PortalSide;
