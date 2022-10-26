import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import linksModel from "../../../../globalState/links";
import { colorOf } from "../../../../utils/getBusServiceStatuses";
import serviceType from "../../../../utils/getBusServiceTypes";
import { Button } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import {
  Card,
  Highlighter,
  Loading,
} from "../../../common/lib/styledElements/Index";

export function BusList({ route }) {
  const navigate = useNavigate();

  const [links, setLinks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchLinks = async ({ route }) => {
    let res;
    if (route) res = await linksModel.getRouteSpecificLinks(route);
    if (res?.msg) alert(res?.msg);
    if (res?.links) {
      setLinks(res?.links);
      setIsLoading(false);
      setMsg(`${res?.links?.length} bus(es) found on route ${route}`);
    }
  };

  useEffect(() => {
    if (!route) navigate(-1);
    fetchLinks({ route });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const [msg, setMsg] = useState(null);

  return (
    <Container size="md">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {links?.length === 0 ? (
            <h3
              style={{
                margin: "1em 0",
                textAlign: "center",
                color: "var(--danger)",
              }}
            >
              No Bus Found
            </h3>
          ) : (
            <>
              <h1>Buses on route {route}</h1>
              {msg && (
                <Card
                  className="info-message"
                  style={{
                    textTransform: "unset",
                  }}
                >
                  {msg}
                </Card>
              )}
              {links?.map((link, key) => (
                <Card
                  key={key}
                  style={{
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
                        className="positive"
                        onClick={() => {
                          navigate(
                            `/portal/buses/${link?.bus?.registrationNumber}`
                          );
                        }}
                      >
                        View Live Status
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
                          marginLeft: "1em",
                          color: "var(--black)",
                          flexGrow: "1",
                        }}
                      >
                        ({serviceType[link.bus.serviceType]})
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "0.8em",
                      }}
                    >
                      {link?.route?.tripTime} mins
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
                        {link?.route?.stops?.join(", ")}
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
                    {link?.schedule?.map((s, i) => (
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
                  <p
                    style={{
                      fontSize: "0.8em",
                    }}
                  >
                    The bus is{" "}
                    <Highlighter color={colorOf(link?.bus?.status)}>
                      <span
                        style={{
                          padding: "0.2rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {link?.bus?.status}
                      </span>
                    </Highlighter>
                  </p>
                  <p
                    style={{
                      fontSize: "0.8em",
                    }}
                  >
                    Maximum {link?.bus?.capacity} people can sit.
                  </p>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
}
