import { Container } from "../../../common/lib/layout/Index";
import { RouteView } from "./RouteView";

export function RouteList({ routes }) {
  return (
    <>
      <Container>
        {routes?.map((v, i) => (
          <RouteView
            route={v.identifier}
            routeId={v._id}
            tripTime={v.tripTime}
            stops={v.stops}
            schedule={v.schedule}
            key={i}
          />
        ))}
      </Container>
    </>
  );
}
