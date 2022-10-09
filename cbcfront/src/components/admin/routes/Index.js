import { useParams } from "react-router-dom";
import ViewRoutes from "./ViewRoutes";
import AddRoute from "./AddRoute";

const Route = () => {
  let component;
  const { argA, argB } = useParams();
  switch (argA) {
    case "view":
      component = `View Route ${argB}. here "buses/ForSpecificRoute.js`;
      break;
    case "delete":
      component = `delete route ${argB}`;
      break;
    case "edit":
      component = `edit route ${argB}`;
      break;
    case "add":
      component = <AddRoute />;
      break;
    default:
      component = <ViewRoutes />;
      break;
  }
  return <>{component}</>;
};
export default Route;
