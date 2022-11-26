import { useParams } from "react-router-dom";
import AddReporting from "./AddReporting";
import ViewReportings from "./ViewReportings";

export default function Reporting() {
  let component;
  const { argA, argB } = useParams();
  switch (argA) {
    case "edit":
      component = <AddReporting id={argB} />;
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
