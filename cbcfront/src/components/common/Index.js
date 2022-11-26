import { useParams } from "react-router-dom";
import ProfileOf from "../commuter/portal/profileOf/User";
import Announcement from "../homepage/announcement/Index";
import Gallery from "../homepage/gallery/Index";
import FourZeroFour from "./FourZeroFour";
import { MainWrapper } from "./lib/layout/Index";
import Sidebar from "./sidebar/Sidebar";

const ParentalPath = () => {
  let component;
  let { other, argA } = useParams();
  switch (other) {
    case "Announcements":
      component = <Announcement />;
      break;
    case "Gallery":
      component = <Gallery />;
      break;
    case "profile":
      component = <ProfileOf user={argA} />;
      break;
    default:
      component = <FourZeroFour />;
      break;
  }
  return (
    <MainWrapper sidebar={<Sidebar for="portal" />}>{component}</MainWrapper>
  );
};
export default ParentalPath;
