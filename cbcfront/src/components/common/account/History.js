import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userModel from "../../../globalState/user";
import serviceType from "../../../utils/getBusServiceTypes";
import getDateInFormat from "../../../utils/timekeeper";
import { Button } from "../lib/formElements/Index";
import { Container } from "../lib/layout/Index";
import { Card, Divider, Loading } from "../lib/styledElements/Index";

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(undefined);
  const fetchHistory = useCallback(() => {
    setIsLoading(true);
    userModel.getMyHistory().then((result) => {
      setIsLoading(false);
      if (result) {
        setHistory(() => userModel.getHistory());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <Loading />;
  return (
    <Container size="sm">
      <h2>History</h2>
      <Card
        style={{
          backgroundColor: "var(--less-white)",
          color: "var(--card-bg)",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <h3>Buses</h3>
        {history?.bus.length ? (
          history?.bus?.map((h, i) => (
            <div
              key={i}
              style={{
                margin: "0",
                padding: "0",
              }}
            >
              {
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    style={{
                      textTransform: "capitalize",
                    }}
                    to={`/portal/buses/${h?.busId?.registrationNumber}`}
                  >
                    <p>
                      {h?.busId?.registrationNumber} (
                      {serviceType[h?.busId?.serviceType]})
                      <span
                        style={{
                          fontSize: "0.8em",
                          margin: "0 0.5em",
                          color: "var(--black)",
                        }}
                      >
                        ({getDateInFormat(h?.time, { counter: true })})
                      </span>
                    </p>
                  </Link>
                  <Button
                    className="negative"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      userModel
                        .removeFromHistory({ historyId: h?._id, type: "bus" })
                        .then((result) => {
                          setIsLoading(false);
                          if (result) setHistory(() => userModel.getHistory());
                        });
                    }}
                  >
                    Delete
                  </Button>
                  <Divider
                    style={{
                      margin: "0.2em 0",
                    }}
                  />
                </div>
              }
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
            }}
          >
            No record found
          </p>
        )}
      </Card>
      <Card
        style={{
          backgroundColor: "var(--less-white)",
          color: "var(--card-bg)",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <h3>Routes</h3>
        {history?.route?.length ? (
          history?.route?.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {
                <>
                  <Link
                    style={{
                      textTransform: "capitalize",
                    }}
                    to={`/portal/routes/${h?.routeId?.identifier}`}
                  >
                    <p>
                      {h?.routeId?.identifier}
                      <span
                        style={{
                          fontSize: "0.8em",
                          margin: "0 0.5em",
                          color: "var(--black)",
                        }}
                      >
                        ({getDateInFormat(h?.time, { counter: true })})
                      </span>
                    </p>
                  </Link>

                  <Button
                    className="negative"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      userModel
                        .removeFromHistory({ historyId: h?._id, type: "route" })
                        .then((result) => {
                          setIsLoading(false);
                          if (result) setHistory(() => userModel.getHistory());
                        });
                    }}
                  >
                    Delete
                  </Button>
                  <Divider
                    style={{
                      margin: "0.2em 0",
                    }}
                  />
                </>
              }
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
            }}
          >
            No record found
          </p>
        )}
      </Card>
    </Container>
  );
};
export default History;
