import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routesModel from "../../../globalState/routes";
import { Button } from "../../common/lib/formElements/Index";
import { Card } from "../../common/lib/styledElements/Index";
import { RouteList } from "./RouteList";

export default function ViewRoutes() {
  const [routes, setRoutes] = useState(null);
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  const fetchRoutes = useCallback(() => {
    routesModel.getRoutes().then((result) => {
      if (result.success) setRoutes(result.routes);
      if (result.msg) {
        setMsg(msg);
      }
    });
  }, []);
  useEffect(() => {
    fetchRoutes();
  }, []);
  return (
    <>
      {msg && <Card className="info-message">{msg}</Card>}
      <Button className="positive" onClick={() => navigate("add")}>
        New Route
      </Button>
      <h1>Buses</h1>
      <RouteList routes={routes} />
    </>
  );
}
