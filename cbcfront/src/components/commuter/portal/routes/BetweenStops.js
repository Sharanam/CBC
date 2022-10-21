import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busStandsModel from "../../../../globalState/busStands";
import routesModel from "../../../../globalState/routes";
import {
  Button,
  Form,
  SearchAutocomplete,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";
import {
  Card,
  Highlighter,
  Loading,
} from "../../../common/lib/styledElements/Index";

const dummy = [
  {
    stops: ["GIDC", "Alavanaka", "Market"],
    schedule: ["06:30", "07:25"],
    _id: "63410bd6e668862ed81fee0a",
    identifier: "10A",
    tripTime: 50,
  },
  {
    stops: ["This", "is", "Fafda", "ni", "dish"],
    schedule: ["03:11", "08:12"],
    _id: "6341ed94009f1920787857c3",
    identifier: "11A",
    tripTime: 45,
  },
];

function RouteView({ route, tripTime, stops, schedule }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "var(--less-white)",
          color: "var(--card-bg)",
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.8rem",
            }}
          >
            <Button
              className="negative"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/portal/routes/${route}`);
              }}
            >
              View Available Buses
            </Button>
          </div>
        }
      >
        <p
          style={{
            fontSize: "1.2em",
            margin: " 0 0 0.3rem 0",
            display: "flex",
          }}
        >
          <span
            style={{
              flexGrow: "1",
              textTransform: "uppercase",
            }}
          >
            {route}
          </span>
          <span
            style={{
              fontSize: "0.8em",
            }}
          >
            {tripTime} mins
          </span>
        </p>
        <p
          style={{
            fontSize: "0.8em",
          }}
        >
          {/* Status: */}
          <Highlighter color="correct">
            <span
              style={{
                padding: "0.2rem",
                textTransform: "capitalize",
                color: "var(--black)",
              }}
            >
              {stops?.join(", ")}
            </span>
          </Highlighter>
        </p>
        <p
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            fontSize: "0.8em",
            margin: "0.2rem",
          }}
        >
          {schedule?.map((s, i) => (
            <Highlighter
              key={i}
              style={{
                backgroundColor: "var(--light-blue)",
                color: "var(--yellow)",
              }}
            >
              <span
                style={{
                  padding: "0.05rem",
                }}
              >
                {s}
              </span>
            </Highlighter>
          ))}
        </p>
      </Card>
    </>
  );
}
function RouteList({ data }) {
  const [routes, setRoutes] = useState(dummy);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    // setIsLoading(true);
    // routesModel.getRoutes({ from: data.from, to: data.to }).then((result) => {
    //   setIsLoading(false);
    //   setRoutes(result.routes || routes);
    //   if (result.msg) {
    //     alert(result.msg);
    //   }
    // });
  }, []);

  return (
    <>
      <h1>
        Routes to go from <u>{data.from}</u> to <u>{data.to}</u>
      </h1>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <Container>
          <mark>
            This list is dummy, back-end is being debugged. <br />
            After solving the bug, data will be injected from the server
          </mark>
          {routes ? (
            <>
              {routes?.map((v, i) => (
                <RouteView
                  route={v.identifier}
                  tripTime={v.tripTime}
                  stops={v.stops}
                  schedule={v.schedule}
                  key={i}
                />
              ))}
            </>
          ) : (
            <mark>No direct route for given stops</mark>
          )}
        </Container>
      )}
    </>
  );
}

const BetweenStops = (props) => {
  const [stops, setStops] = useState({ from: "", to: "" });
  const [busStands, setBusStands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    busStandsModel.getStands().then((result) => {
      setBusStands(result);
      setIsLoading(false);
    });
  }, []);
  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  if (props.from && props.to) return <RouteList data={props} />;
  return (
    <Container size="md">
      <Form
        margin="unset"
        onSubmit={(e) => {
          e.preventDefault();
          if (stops.from && stops.to && stops.from !== stops.to)
            navigate(`/portal/routes/${stops.from}/${stops.to}`);
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
