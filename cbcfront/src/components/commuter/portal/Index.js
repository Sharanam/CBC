import Sidebar from "../../common/sidebar/Sidebar";
import PortalRoutes from "./routes/Index";
import PortalBuses from "./bus/Index";
import PortalBusStops from "./busstops/Index";
import { MainWrapper } from "../../common/lib/layout/Index";
import Home from "./Home";
import { useParams } from "react-router-dom";
import Feedback from "./feedback/Index";
import ProfileOf from "./profileOf/User";

const Desk = () => {
  let component;
  let { path, argA, argB } = useParams();
  switch (path) {
    case "routes":
      component = argB ? (
        <PortalRoutes from={argA} to={argB} />
      ) : (
        <PortalRoutes identifier={argA} />
      );
      break;
    case "buses":
      component = <PortalBuses regNumber={argA} />;
      break;
    case "busstops":
      component = <PortalBusStops name={argA} />;
      break;
    case "feedback":
      component = <Feedback id={argA} />;
      break;
    case "profile":
      component = <ProfileOf userId={argA} />;
      break;
    default:
      component = <Home />;
      break;
  }
  return (
    <MainWrapper sidebar={<Sidebar for="portal" />}>{component}</MainWrapper>
  );
};
export default Desk;
