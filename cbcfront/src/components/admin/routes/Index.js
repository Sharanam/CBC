import { useParams } from "react-router-dom";
import ViewRoutes from "./ViewRoutes";
import AddRoute from "./AddRoute";
import DeleteRoute from "./DeleteRoute";

const Route = () => {
  let component;
  const { argA, argB } = useParams();
  switch (argA) {
    case "view":
      component = `View Route ${argB}. here "buses/ForSpecificRoute.js`;
      break;
    case "delete":
      component = <DeleteRoute route={argB} />;
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
