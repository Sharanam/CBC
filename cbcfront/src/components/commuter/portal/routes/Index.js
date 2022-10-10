import Container from "../../../common/lib/layout/Container";
import BetweenStops from "./BetweenStops";
import SpecificRoute from "./SpecificRoute";

const Routes = (props) => {
  if (props.identifier) {
    return <SpecificRoute identifier={props.identifier} />;
  } else if (props.from) {
    return <BetweenStops from={props.from} to={props.to} />;
  }
  return (
    <Container size="md">
      <BetweenStops />
      <SpecificRoute />
    </Container>
  );
};
export default Routes;
