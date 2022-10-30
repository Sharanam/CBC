import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { locationCapture } from "../../../..";
import commutersModel from "../../../../globalState/commuter";
import { colorOf } from "../../../../utils/getBusServiceStatuses";
import serviceType from "../../../../utils/getBusServiceTypes";
import contMessages from "../../../../utils/getContributionMessages";
import { timeDistributor, toDateFrom } from "../../../../utils/timekeeper";
import { Button, Input, Toggle } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import {
  Card,
  Divider,
  Highlighter,
  Loading,
} from "../../../common/lib/styledElements/Index";
import { ContributiveStop } from "./ContributiveStop";
import "./style.css";

function process(contributions = [], stop) {
  let editable = false,
    message = contMessages[0],
    _id = null;
  let c = contributions.filter((c) => c.stop === stop);
  let mine = c.filter((c) => c.user);
  if (mine.length) {
    editable = true;
    message =
      mine[0].message === contMessages[0] ? contMessages[1] : contMessages[0];
    _id = mine[0]._id;
  }
  let arr = c.filter((c) => c.message === contMessages[0]).length || 0,
    nArr = c.filter((c) => c.message === contMessages[1]).length || 0;
  let latest, news;
  c.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  if (c.length) {
    [latest, news] = [c[0]?.updatedAt, c[0]?.message];
  }
  return [
    [editable, message, _id],
    [arr, nArr],
    [latest, news],
  ];
}

export function BusRunner(props) {
  const [inBus, setInBus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("time");
  const {
    busDetails: { route, bus, schedule },
  } = props;
  const fetchContributions = useCallback(async () => {
    if (!time) return;
    setContIsLoading(true);
    let result = await commutersModel.getContributionsFor({
      bus: bus._id,
      route: route._id,
      createdAfter: toDateFrom(time),
    });
    setContIsLoading(false);
    if (result.success) setContributions(result.contributions);
  }, [bus, route, time]);
  const [contributions, setContributions] = useState([]);
  const [contIsLoading, setContIsLoading] = useState(false);

  const [position, setPosition] = useState(null);
  useEffect(() => {
    fetchContributions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);
  useEffect(() => {
    locationCapture(
      (position) => {
        setPosition(position?.coords);
      },
      (error) => {
        setPosition(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nearbyBusStop(stops, location) {
    return stops[Math.floor(location % (stops.length - 1))];
  }
  return (
    <Container size="sm">
      {colorOf(bus?.status) !== "warning" ? (
        <Card
          white={true}
          style={{
            backgroundColor: "var(--lightblue)",
            color: "var(--white)",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              flexDirection: "row",
              gap: "0.5em",
            }}
          >
            <p>Are you in the bus?</p>
            <Toggle
              name="inBus"
              trueText="Yes"
              falseText="No"
              checked={inBus}
              onToggle={() => {
                setInBus(!inBus);
              }}
              style={{ color: "currentColor" }}
            />
          </div>
          <div
            style={{
              fontSize: "0.9em",
              color: "var(--dull-white)",
            }}
          >
            {inBus && position ? (
              <>
                <p>
                  <Highlighter color="warning">
                    DEVELOPMENT NOTE: The latitude and longitude are being
                    captured and updated by the navigator API.
                  </Highlighter>
                </p>
                <p>
                  <Highlighter color="warning">
                    But the name of the location is derived from the list of the
                    stops, it is not being determined by the Google Maps.
                  </Highlighter>
                </p>
                {position.message ? (
                  <>
                    <p
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Highlighter color="info">
                        message: {position.message}
                      </Highlighter>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Your current location is:{" "}
                      {JSON.stringify({
                        latitude: position.latitude,
                        longitude: position.longitude,
                        accuracy: parseInt(position.accuracy || 0) + " metres",
                      })}
                      . Which means, the bus is closest to the{" "}
                      <Highlighter color="correct">
                        <b>
                          "
                          {nearbyBusStop(
                            route?.stops || [],
                            position.latitude + position.longitude
                          )}
                          "
                        </b>
                      </Highlighter>
                      .
                    </p>
                    <p>
                      Do you agree that bus has been arrived at "
                      {nearbyBusStop(
                        route?.stops || [],
                        position.latitude + position.longitude
                      )}
                      "? If yes, then click the below button.
                    </p>
                    <Button
                      style={{
                        backgroundColor: "var(--white)",
                        color: "var(--lightblue)",
                        fontSize: "0.9rem",
                        margin: "0.5em 0",
                        width: "100%",
                      }}
                      onClick={async (e) => {
                        e.preventDefault();
                        const result = await commutersModel.makeContribution({
                          bus: bus._id,
                          route: route._id,
                          stop: nearbyBusStop(
                            route?.stops || [],
                            position.latitude + position.longitude
                          ),
                          createdAfter: toDateFrom(time),
                          message: contMessages[0],
                        });
                        if (result.success) {
                          fetchContributions();
                        }
                        if (result.msg) alert(result.msg);
                      }}
                    >
                      Yes, I agree
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <p>
                  Please allow us to capture your location, if you are traveling
                  via this bus. You might have blocked the location request,
                  please go to the settings and enable it.
                </p>
              </>
            )}
          </div>
        </Card>
      ) : null}
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "var(--less-white)",
          color: "var(--card-bg)",
        }}
      >
        <p
          style={{
            fontSize: "1.2em",
            margin: " 0 0 0.3rem 0",
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
          <span
            style={{
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onClick={() => setSearchParams()}
          >
            {bus?.registrationNumber}
          </span>

          <span
            style={{
              fontSize: "0.8em",
              marginLeft: "1em",

              flexGrow: "1",
            }}
          >
            <Highlighter color={colorOf(bus?.status)}>
              <span
                style={{
                  padding: "0.2rem",
                  textTransform: "capitalize",
                }}
              >
                {bus?.status}
              </span>
            </Highlighter>
          </span>
          <span
            style={{
              fontSize: "0.8em",
            }}
          >
            {time ? (
              `Departure Time: ${time}`
            ) : (
              <Highlighter color="warning">Select Time</Highlighter>
            )}
          </span>
        </p>
        <p
          style={{
            margin: "3px 0",
          }}
        >
          Assigned onto route{" "}
          <mark className="correct">{route?.identifier}</mark>
        </p>
        <p
          style={{
            display: "flex",
            gap: "0.5em",
            flexFlow: "row wrap",
          }}
        >
          Departure time(s):{" "}
          <span
            style={{
              display: "flex",
              gap: "0.5em",
              flexFlow: "row wrap",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {schedule?.map((t, key) => (
              <Input
                key={key}
                type="time"
                style={{
                  backgroundColor: time === t && "var(--light-blue)",
                  color: time === t && "var(--white)",
                  cursor: "pointer",
                }}
                value={t}
                onClick={(e) => {
                  e.preventDefault();
                  setSearchParams({ time: t });
                }}
                readOnly
              />
            ))}
          </span>
        </p>
        <p>
          {bus?.serviceType >= 0 && (
            <span
              style={{
                fontSize: "0.8em",
              }}
            >
              Type of bus is: ({serviceType[bus?.serviceType]})
            </span>
          )}
        </p>
        <p
          style={{
            fontSize: "0.8em",
          }}
        >
          Maximum Capacity: {bus?.capacity}
        </p>
        {time && (
          <>
            <Divider />
            {colorOf(bus?.status) === "warning" ? (
              <Highlighter
                color="warning"
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  borderRadius: "0.5em",
                }}
              >
                We cannot display the route, until the bus gets green flag.
              </Highlighter>
            ) : (
              <>
                {contIsLoading ? (
                  <Loading />
                ) : (
                  <ul className="printStop">
                    {route?.stops?.map((stop, key) => (
                      <li key={key}>
                        <ContributiveStop
                          stop={stop}
                          tripTime={timeDistributor(
                            route?.tripTime,
                            route?.stops?.length - 1,
                            key
                          )}
                          depTime={time}
                          bus={bus?._id}
                          route={route?._id}
                          onSubmit={() => {
                            fetchContributions();
                          }}
                          contributions={process(contributions, stop)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}
