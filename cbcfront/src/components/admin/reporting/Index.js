import { useParams } from "react-router-dom";
import AddReporting from "./AddReporting";
import DeleteReporting from "./DeleteReporting";
import EditReportingDetails from "./EditReportingDetails";
import ForSpecificRoute from "./ForSpecificRoute";
import ViewReportings from "./ViewReportings";

export default function Reporting() {
  let component;
  const { argA, argB } = useParams();
  switch (argA) {
    case "forRoute":
      component = <ForSpecificRoute route={argB} />;
      break;
    case "delete":
      component = <DeleteReporting id={argB} />;
      break;
    case "edit":
      component = <EditReportingDetails number={argB} />;
      break;
    case "add":
      component = <AddReporting />;
      break;
    default:
      component = <ViewReportings />;
      break;
  }
  return <>{component}</>;
}
