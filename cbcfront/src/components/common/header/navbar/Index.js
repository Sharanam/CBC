import { useState } from "react";

import "./navbar.css";
import ListGenerator from "./ListGenerator";
import { useSessionStorage } from "../../../../utils/browserStore";
import userModel from "../../../../globalState/user";

const routes = {
  universal: [
    { to: "portal", name: "Portal" },
  ],
  forVisitor: [{ to: "login", name: "Login" }],
  forCommuter: [{ to: "account", name: "Account" }],
  forAdmin: [
    { to: "admin", name: "Dashboard" },
    { to: "account", name: "Account" },
  ],
};

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const close = () => {
    setExpanded(false);
  };

  const user =
    JSON.parse(window.sessionStorage.getItem("user")) || userModel.user;

  const [userDetails] = useSessionStorage(
    "userDetails",
    userModel.userDetails
  );
  const GeneratedList = () => {
    if (!user.isAuthenticated) {
      return (
        <ListGenerator routes={[...routes.universal, ...routes.forVisitor]} />
      );
    }
    if (user.isAuthenticated && /^c/i.test(userDetails.type)) {
      return (
        <ListGenerator routes={[...routes.universal, ...routes.forCommuter]} />
      );
    }
    if (user.isAuthenticated && /^a/i.test(userDetails.type)) {
      return (
        <ListGenerator routes={[...routes.universal, ...routes.forAdmin]} />
      );
    }
  };
  return (
    <>
      <button
        aria-controls="nav"
        aria-expanded={expanded}
        className="mobile-nav-toggle"
        onClick={() => {
          setExpanded(!expanded);
        }}
      />

      <nav data-visible={expanded} onBlur={close}>
        <ul>
          <GeneratedList />
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
