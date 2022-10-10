import { Link } from "react-router-dom";

const AccountSide = () => {
  return (
    <ul>
      <li>
        <Link to="/account/favourites">Favourites</Link>
      </li>
      <li>
        <Link to="/account/buspass">Bus Pass</Link>
      </li>
      <li>
        <Link to="/account/profile">Profile</Link>
      </li>
      {/* <li>
        <Link to="/account/contact">Contact</Link>
      </li> */}
      <li>
        <Link to="/account/history">History</Link>
      </li>
      <li>
        <Link to="/account/myContributions">My Contributions</Link>
      </li>
      <li>
        <Link to="/account/deleteAccount">Delete Account</Link>
      </li>
    </ul>
  );
};
export default AccountSide;
