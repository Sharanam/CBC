import { useCallback, useEffect, useState } from "react";
import routesModel from "../../../globalState/routes";
import userModel from "../../../globalState/user";
import { RouteView } from "../../commuter/portal/routes/RouteView";
import { Container } from "../lib/layout/Index";
import { Loading } from "../lib/styledElements/Index";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoutes = useCallback(() => {
    setIsLoading(true);
    routesModel.getAllRoutes().then((result) => {
      setIsLoading(false);
      if (result.success) {
        const fvt = userModel.getFavorites();
        let routes = result.routes.filter((v) =>
          fvt.includes(v._id.toString())
        );
        setFavorites(routes || []);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <Loading />;
  return (
    <Container size="sm">
      <h1>Favorites</h1>
      <div>
        {favorites?.map((f, i) => (
          <RouteView
            route={f.identifier}
            routeId={f._id}
            tripTime={f.tripTime}
            stops={f.stops}
            schedule={f.schedule}
            key={i}
          />
        ))}
      </div>
    </Container>
  );
};
export default Favorites;
