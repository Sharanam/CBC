import Profile from "./Profile";
import { MainWrapper } from "../lib/layout/Index";
import Sidebar from "../sidebar/Sidebar";
import Home from "./Home";
import Contact from "./Contact";
import BusPass from "./BusPass";
import Favourites from "./Favourites";
import History from "./History";
import DeleteAccount from "./DeleteAccount";

const Account = (props) => {
  let component;
  switch (props.path) {
    case "buspass":
      component = <BusPass />;
      break;
    case "profile":
      component = <Profile />;
      break;
    case "contact":
      component = <Contact />;
      break;
    case "favourites":
      component = <Favourites />;
      break;
    case "history":
      component = <History />;
      break;
    case "deleteAccount":
      component = <DeleteAccount />;
      break;
    default:
      component = <Home />;
      break;
  }
  return (
    <MainWrapper sidebar={<Sidebar for="account" />}>{component}</MainWrapper>
  );
};
export default Account;
