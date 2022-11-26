import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busStandsModel from "../../../../globalState/busStands";
import { Container } from "../../../common/lib/layout/Index";
import { Card, Loading } from "../../../common/lib/styledElements/Index";
import { RouteList } from "../routes/RouteList";

export default function LiveBusStop(props) {
  const { name } = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [routes, setRoutes] = useState([]);
  const [msg, setMsg] = useState("Nothing to display.");

  useEffect(() => {
    if (!name) navigate(-1);
    setIsLoading(true);
    busStandsModel.relatedRoutesTo(name).then((result) => {
      setIsLoading(false);
      if (result?.success) {
        setRoutes(result?.routes);
        if (result?.routes?.length === 1)
          setMsg(`${result?.routes?.length} route found.`);
        else if (result?.routes?.length > 1)
          setMsg(`${result?.routes?.length} routes found.`);
      } else {
        if (result.msg) setMsg(result.msg);
        else setMsg("something went wrong");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  if (isLoading) return <Loading />;

  return (
    <Container>
      <h1>
        Routes across <u>{name}</u>
      </h1>
      {msg && <Card className="info-message">{msg}</Card>}
      {
        routes && <RouteList routes={routes} />

        // routes.map((route, key) => (
        //   <Card white={true} key={key}>
        //     {JSON.stringify(route)}
        //   </Card>
        // ))
      }
    </Container>
  );
}
