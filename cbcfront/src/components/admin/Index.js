import { useParams } from "react-router-dom";
import { Container, MainWrapper } from "../common/lib/layout/Index";
import Sidebar from "../common/sidebar/Sidebar";
import Announcement from "./announcement/Index";
import Routes from "./routes/Index";
import Buses from "./buses/Index";
import BusStops from "./busStops/Index";
import HumanResources from "./humanResources/Index";
import Users from "./users/Index";
import Feedback from "./feedback/Index";
import Home from "./Home";
import User from "./users/User";
import Reports from "./reports/Index";
import Reporting from "./reporting/Index";
import ViewLinks from "./link/ViewLinks";
import Passes from "./passes/Index";

const Desk = () => {
  let component;
  const { path, argA, argB } = useParams();
  switch (path) {
    case "routes":
      component = <Routes />;
      break;
    case "buses":
      component = <Buses />;
      break;
    case "link":
      component = <ViewLinks task={argA} link={argB} />;
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
    case "user":
      component = <User id={argA} />;
      break;
    case "passes":
      component = <Passes />;
      break;
    case "announcements":
      component = <Announcement />;
      break;
    case "feedback":
      component = <Feedback />;
      break;
    case "reportings":
      component = <Reporting />;
      break;
    case "reports":
      component = <Reports />;
      break;
    default:
      component = <Home />;
      break;
  }
  return (
    <>
      <MainWrapper sidebar={<Sidebar for="dashboard" />}>
        <Container size="xl">{component}</Container>
      </MainWrapper>
    </>
  );
};
export default Desk;
