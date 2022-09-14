import { Link } from "react-router-dom";

const PortalSide = () => {
  return (
    <ul>
      <li>
        <Link to="/portal/busstops">Bus Stops</Link>
      </li>
      <li>
        <Link to="/portal/buses">Buses</Link>
      </li>
      <li>
        <Link to="/portal/routes">Routes</Link>
      </li>
    </ul>
  );
};
export default PortalSide;
