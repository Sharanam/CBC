import { MainWrapper } from "../common/lib/layout/Index";
import Sidebar from "../common/sidebar/Sidebar";
import Announcement from "./announcement/Index";
import Routes from "./routes/Index";
import Buses from "./buses/Index";
import BusStops from "./busStops/Index";
import HumanResources from "./humanResources/Index";
import Users from "./users/Index";
import Pass from "./pass/Index";
import Home from "./Home";

const Desk = (props) => {
  let component;
  switch (props.path) {
    case "routes":
      component = <Routes />;
      break;
    case "buses":
      component = <Buses />;
      break;
    case "busstops":
      component = <BusStops />;
      break;
    case "humanresource":
      component = <HumanResources />;
      break;
    case "users":
      component = <Users />;
      break;
    case "announcements":
      component = <Announcement />;
      break;
    case "pass":
      component = <Pass />;
      break;
    default:
      component = <Home />;
      break;
  }
  return (
    <>
      <MainWrapper sidebar={<Sidebar for="dashboard" />}>
        {component}
      </MainWrapper>
    </>
  );
};
export default Desk;
