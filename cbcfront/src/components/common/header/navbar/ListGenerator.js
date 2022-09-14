import { NavLink } from "react-router-dom";

export default function ListGenerator(props) {
  return (
    <>
      {props.routes.map((route) => (
        <li key={route.to}>
          <NavLink
            className={({ isActive }) => (isActive ? "current" : "")}
            to={route.to}
          >
            {route.name}
          </NavLink>
        </li>
      ))}
    </>
  );
}
