import { Link } from "react-router-dom";

const AccountSide = () => {
  return (
    <ul>
      <li>
        <Link to="/account/favourites">My Favourites</Link>
      </li>
      <li>
        <Link to="/account/buspass">My Bus Pass</Link>
      </li>
      <li>
        <Link to="/account/profile">Edit Profile</Link>
      </li>
      <li>
        <Link to="/account/history">View History</Link>
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
