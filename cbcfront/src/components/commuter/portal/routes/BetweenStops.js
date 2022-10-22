import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busStandsModel from "../../../../globalState/busStands";
import routesModel from "../../../../globalState/routes";
import {
  Button,
  Form,
  SearchAutocomplete,
} from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import {
  Card,
  Highlighter,
  Loading,
} from "../../../common/lib/styledElements/Index";
import { RouteList } from "./RouteList";

const BetweenStops = (props) => {
  const flagFrontPage = props.from && props.to;
  const [stops, setStops] = useState({ from: "", to: "" });

  const [busStands, setBusStands] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (flagFrontPage) {
      setIsLoading(true);

      routesModel
        .getRoutes({ from: props.from, to: props.to })
        .then((result) => {
          setIsLoading(false);
          if (result.success) {
            setRoutes(result?.routes);
          }
          if (result.msg) setMsg(result.msg);
        });
    } else {
      setIsLoading(true);
      busStandsModel.busStandNames().then((result) => {
        setBusStands(result);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagFrontPage]);
  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  if (flagFrontPage)
    return (
      <>
        <h1>
          Routes to go from <Highlighter>{props.from}</Highlighter> to{" "}
          <Highlighter>{props.to}</Highlighter>
        </h1>
        {msg && <Card className="info-message">{msg}</Card>}
        <RouteList routes={routes} />
      </>
    );
  return (
    <Container size="md">
      <Form
        margin="unset"
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          if (stops.from && stops.to && stops.from !== stops.to) {
            navigate(`/portal/routes/${stops.from}/${stops.to}`);
          }
          setIsLoading(false);
        }}
      >
        {{
          title: "Get Available Routes",
          formFields: (
            <Container
              size="sm"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "space-around",
                gap: "1em",
              }}
            >
              <SearchAutocomplete
                data={busStands}
                injected={stops.from}
                tabIndex="1"
                handleCallback={(selected) => {
                  setStops({ ...stops, from: selected });
                }}
                placeholder="from"
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setStops({ from: stops.to, to: stops.from });
                }}
                tabIndex="3"
              >
                Swap
              </Button>
              <SearchAutocomplete
                tabIndex="2"
                injected={stops.to}
                data={busStands}
                handleCallback={(selected) => {
                  setStops({ ...stops, to: selected });
                }}
                placeholder="to"
              />
            </Container>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive">
                Search Buses
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default BetweenStops;
