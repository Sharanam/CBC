import { Link } from "react-router-dom";

const DashboardSide = () => {
  return (
    <ul>
      <li>
        <Link to="/admin/routes">Manage Routes</Link>
      </li>
      <li>
        <Link to="/admin/buses">Manage Buses</Link>
      </li>
      <li>
        <Link to="/admin/busstops">View Bus Stops</Link>
      </li>
      <li>
        <Link to="/admin/reportings">Manage Reportings</Link>
      </li>
      <li>
        <Link to="/admin/reports">View Reports</Link>
      </li>
      <li>
        <Link to="/admin/humanresource">Manage Staff</Link>
      </li>
      <li>
        <Link to="/admin/users">Manage Users</Link>
      </li>
      <li>
        <Link to="/admin/announcements">Announcements</Link>
      </li>
      <li>
        <Link to="/admin/feedback">Manage Feedback</Link>
      </li>
    </ul>
  );
};
export default DashboardSide;
