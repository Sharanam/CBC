import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routesModel from "../../../globalState/routes";
import { Button } from "../../common/lib/formElements/Index";
import { Card } from "../../common/lib/styledElements/Index";
import { RouteList } from "./RouteList";

export default function ViewRoutes() {
  const [routes, setRoutes] = useState(null);
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRoutes = useCallback(() => {
    setIsLoading(true);
    routesModel.getAllRoutes().then((result) => {
      setIsLoading(false);
      if (result.success) setRoutes(result.routes);
      if (result.msg) {
        setMsg((_) => result.msg);
        console.log();
      }
    });
  }, []);
  useEffect(() => {
    fetchRoutes();
  }, []);
  if (isLoading) return <h3>Loading...</h3>;
  return (
    <>
      {msg && <Card className="info-message">{msg}</Card>}
      <Button
        style={{ width: "100%" }}
        className="positive"
        onClick={() => navigate("add")}
      >
        New Route
      </Button>
      <h1>Routes</h1>
      <RouteList routes={routes} />
    </>
  );
}
