import { useParams } from "react-router-dom";
import ViewRoutes from "./ViewRoutes";
import ManageRoute from "./AddRoute";
import DeleteRoute from "./DeleteRoute";

const Route = () => {
  let component;
  const { argA, argB } = useParams();
  switch (argA) {
    case "delete":
      component = <DeleteRoute route={argB} />;
      break;
    case "edit":
      component = <ManageRoute edit={argB} />;
      break;
    case "add":
      component = <ManageRoute />;
      break;
    default:
      component = <ViewRoutes />;
      break;
  }
  return <>{component}</>;
};
export default Route;
