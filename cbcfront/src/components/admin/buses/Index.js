import { useParams } from "react-router-dom";
import ForSpecificRoute from "./ForSpecificRoute";
import ViewBuses from "./ViewBuses";
import BusCurrent from "./BusCurrent";
import DeleteBus from "./DeleteBus";
import AddBus from "./AddBus";
import EditBusDetails from "./EditBusDetails";

const Buses = () => {
  let component;
  const { argA, argB } = useParams();
  switch (argA) {
    case "forRoute":
      component = <ForSpecificRoute route={argB} />;
      break;
    case "view":
      component = <BusCurrent number={argB} />;
      break;
    case "delete":
      component = <DeleteBus id={argB} />;
      break;
    case "edit":
      component = <EditBusDetails number={argB} />;
      break;
    case "add":
      component = <AddBus />;
      break;
    default:
      component = <ViewBuses />;
      break;
  }
  return <>{component}</>;
};
export default Buses;
