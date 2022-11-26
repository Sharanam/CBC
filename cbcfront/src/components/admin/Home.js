import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import busesModel from "../../globalState/buses";
import linksModel from "../../globalState/links";
import statuses, { colorOf } from "../../utils/getBusServiceStatuses";
import serviceType from "../../utils/getBusServiceTypes";
import { Button, DropDown } from "../common/lib/formElements/Index";
import { Container } from "../common/lib/layout/Index";
import { Card, Highlighter, Loading } from "../common/lib/styledElements/Index";
import RouteSelection from "./RouteSelection";

const Home = () => {
  const [links, setLinks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchLinks = async () => {
    setIsLoading(true);
    let res;
    res = await linksModel.getAllLinks();
    if (res?.msg) alert(res?.msg);
    if (res?.links) {
      setLinks(res?.links);
      setIsLoading(false);
    }
  };
  const [status, setStatus] = useState({
    bus: "",
    status: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  function routeList() {
    return Array.from(
      new Set(Object.values(links?.map((v) => v.route.identifier)))
    );
  }
  function selectedRoute() {
    const route = searchParams.get("route");
    if (route) {
      if (routeList()?.includes(route)) {
        return links?.filter((v) => v?.route?.identifier === route);
      }
    }
    return links;
  }
  function setSearchRoute(route) {
    if (searchParams.get("route") === route) {
      setSearchParams({});
    } else {
      setSearchParams({ route });
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Admin-Panel
      </h1>
      <Container
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
          borderRadius: "0.5em",
          color: "var(--lightblue)",
          backgroundColor: "var(--dull-white)",
        }}
        size="xl"
      >
        {isLoading ? (
          <Loading />
        ) : links?.length ? (
          <>
            <h3>Live Update</h3>
            <RouteSelection
              routes={routeList()}
              onClick={setSearchRoute}
              selected={searchParams.get("route")}
            />
            {routeList()?.map((route, key) => (
              <Card
                key={key}
                style={{
                  backgroundColor: "var(--light-blue)",
                }}
              >
                <span onClick={() => setSearchRoute(route)}>{route}</span>
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    gap: "0.2em",
                  }}
                >
                  {selectedRoute()
                    ?.filter((v) => v?.route?.identifier === route)
                    ?.map((link, key) => (
                      <Card white={true} key={key}>
                        <p
                          style={{
                            fontSize: "1.2em",
                            display: "flex",
                            alignItems: "baseline",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate(`/portal/buses/${link?.bus?._id}`);
                            }}
                            title="View Bus"
                          >
                            {link?.bus?.registrationNumber}
                          </span>
                          {link?.bus?.serviceType >= 0 && (
                            <span
                              style={{
                                fontSize: "0.8em",
                                marginLeft: "0.2em",
                                color: "var(--black)",
                                flexGrow: "1",
                              }}
                            >
                              ({serviceType[link.bus.serviceType]})
                            </span>
                          )}
                          <Highlighter
                            style={{
                              padding: "0.2rem",
                              textTransform: "capitalize",
                              fontSize: "0.8em",
                              marginLeft: "0.3em",
                            }}
                            color={colorOf(link?.bus?.status)}
                          >
                            {link?.bus?.status}
                          </Highlighter>
                        </p>
                        <p>
                          <DropDown
                            options={statuses}
                            default={
                              status.bus === link?.bus?.registrationNumber
                                ? status.status
                                : link?.bus?.status
                            }
                            onChange={(s) => {
                              setStatus({
                                bus: link?.bus?.registrationNumber,
                                status: s,
                              });
                            }}
                          />
                          <Button
                            className="positive"
                            style={{
                              display:
                                status.bus === link?.bus?.registrationNumber &&
                                status.status !== link?.bus?.status
                                  ? "inline"
                                  : "none",
                            }}
                            onClick={async (e) => {
                              e.preventDefault();
                              setIsLoading(true);
                              const response = await busesModel.editBus({
                                busId: status.bus,
                                status: status.status,
                              });
                              setIsLoading(false);
                              if (response.success) {
                                fetchLinks();
                                setStatus({ bus: "", status: "" });
                              }
                            }}
                          >
                            Update
                          </Button>
                        </p>
                      </Card>
                    ))}
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            <p>No links found.</p>
          </>
        )}
      </Container>
    </>
  );
};
export default Home;
