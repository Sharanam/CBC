import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { colorOf } from "../../../../utils/getBusServiceStatuses";
import serviceType from "../../../../utils/getBusServiceTypes";
import { addTimeInto, timeDistributor } from "../../../../utils/timekeeper";
import { Input, Toggle } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import {
  Card,
  Divider,
  Highlighter,
} from "../../../common/lib/styledElements/Index";
import "./style.css";
export function BusRunner(props) {
  const [inBus, setInBus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("time");
  const {
    busDetails: { route, bus, schedule },
  } = props;
  return (
    <Container size="sm">
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
          {inBus ? (
            <p>We can capture your location to provide the GPS service</p>
          ) : (
            <p>
              Please allow us to capture your location, if you are traveling via
              this bus.
            </p>
          )}
        </div>
      </Card>
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
            {time ? `Departure Time: ${time}` : "Select Time"}
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
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}

function ContributiveStop({ stop, tripTime, depTime }) {
  return (
    <>
      <p>
        <span
          style={{
            flexGrow: "1",
          }}
        >
          {stop}
        </span>
      </p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          flexDirection: "row",
          gap: "0.5em",
        }}
      >
        <span
          style={{
            fontSize: "0.65em",
          }}
        >
          <Input
            type="time"
            style={{
              backgroundColor: "var(--dull-white)",
              color: "var(--black)",
              fontSize: "1em",
              padding: "0.2em",
              margin: "0 5px 0 0",
            }}
            value={(
              addTimeInto(depTime, tripTime, { time: 1 }) || ""
            ).toString()}
            readOnly
          />
          ETA
        </span>
        <span
          style={{
            fontSize: "0.8em",
          }}
        >
          Contribute
        </span>
      </p>
    </>
  );
}
