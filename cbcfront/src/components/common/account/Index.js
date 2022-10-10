import Profile from "./Profile";
import { MainWrapper } from "../lib/layout/Index";
import Sidebar from "../sidebar/Sidebar";
import Home from "./Home";
import Contact from "./Contact";
import BusPass from "./BusPass";
import Favourites from "./Favourites";
import History from "./History";
import DeleteAccount from "./DeleteAccount";
import { useParams } from "react-router-dom";
import MyContributions from "./MyContributions";

const Account = (props) => {
  let component;
  let { path } = useParams();
  switch (path) {
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
    case "myContributions":
      component = <MyContributions />;
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
