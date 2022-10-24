import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../../globalState/buses";
import { colorOf } from "../../../../utils/getBusServiceStatuses";
import serviceType from "../../../../utils/getBusServiceTypes";
import { Button } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import {
  Card,
  Highlighter,
  Loading,
} from "../../../common/lib/styledElements/Index";

function BusRunner(props) {
  const {
    time,
    busDetails: { route, bus },
  } = props;
  const [open, setOpen] = useState(false);
  return (
    <Container size="sm">
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
                setOpen(!open);
              }}
            >
              {open ? "Close" : "Open"}
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
            onClick={() => setOpen(!open)}
          >
            {bus.registrationNumber}
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
            Departure time: {time}
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
        <p>
          {bus?.serviceType >= 0 && (
            <span
              style={{
                fontSize: "0.8em",
              }}
            >
              Type of bus is: ({serviceType[bus.serviceType]})
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
      </Card>
    </Container>
  );
}

export default function BusView(props) {
  const regNumber = props?.number || 0;
  const [isLoading, setIsLoading] = useState(true);
  const [busDetails, setBusDetails] = useState(null);
  const navigate = useNavigate();
  const fetchBus = async () => {
    setIsLoading(true);
    const res = await busesModel.getLiveBus(regNumber, { live: true });
    if (res.msg) {
      alert(res.msg);
      navigate(-1);
    }
    setBusDetails(res.link || {});
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regNumber]);
  if (isLoading) return <Loading />;
  if (busDetails)
    return (
      <>
        {busDetails?.schedule?.length === 0 ? (
          <h2>Nothing to display</h2>
        ) : (
          busDetails?.schedule?.map((time, key) => (
            <BusRunner key={key} time={time} busDetails={busDetails} />
          ))
        )}
        {Object.keys(busDetails)?.map((d, i) => {
          return (
            <p key={i}>
              {d}: <b>{JSON.stringify(busDetails[d])}</b>
            </p>
          );
        })}
      </>
    );
  return <h1>Something is wrong</h1>;
}
