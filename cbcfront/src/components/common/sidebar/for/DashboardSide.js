import { Link } from "react-router-dom";

const DashboardSide = () => {
  return (
    <ul>
      <li>
        <Link to="/admin/routes">Routes</Link>
      </li>
      <li>
        <Link to="/admin/buses">Buses</Link>
      </li>
      <li>
        <Link to="/admin/busstops">Bus Stops</Link>
      </li>
      <li>
        <Link to="/admin/humanresource">Human Resource</Link>
      </li>
      <li>
        <Link to="/admin/users">Users</Link>
      </li>
      <li>
        <Link to="/admin/announcements">Announcements</Link>
      </li>
      <li>
        <Link to="/admin/pass">Pass</Link>
      </li>
    </ul>
  );
};
export default DashboardSide;
