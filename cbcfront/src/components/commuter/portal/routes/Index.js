import BetweenStops from "./BetweenStops";
import SpecificRoute from "./SpecificRoute";

const Routes = (props) => {
  if (props.identifier) {
    return <SpecificRoute identifier={props.identifier} />;
  } else if (props.from) {
    return <BetweenStops from={props.from} to={props.to} />;
  }
  return (
    <>
      <BetweenStops />
      <SpecificRoute />
    </>
  );
};
export default Routes;
