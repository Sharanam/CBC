import { useContext } from "react";
import { Link } from "react-router-dom";
import { FlagContext } from "../../../context/Flag";
import "./header.css";
import Navbar from "./navbar/Index";

function Header() {
  const [flag, setFlag] = useContext(FlagContext);
  return (
    <header>
      <Link to="/">
        <h1 className="logo">Citybus</h1>
      </Link>
      <Navbar />
    </header>
  );
}
export default Header;
