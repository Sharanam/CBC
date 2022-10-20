import { useNavigate } from "react-router-dom";
import { Button } from "../../common/lib/formElements/Index";
import { Card, Highlighter } from "../../common/lib/styledElements/Index";
import serviceType from "../../../utils/getBusServiceTypes";

const BusCard = ({ bus }) => {
  const navigate = useNavigate();
  if (!bus) return <>No bus is available</>;
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
                window.confirm(
                  `Are you sure you want to remove ${bus.registrationNumber} permanently?`
                ) && navigate(`/admin/buses/delete/${bus._id}`);
              }}
            >
              Delete This Bus
            </Button>
            <Button
              className="neutral"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/portal/buses/${bus._id}`);
              }}
            >
              View Bus
            </Button>
            <Button
              className="positive"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/buses/edit/${bus._id}`);
              }}
            >
              Edit Bus Details
            </Button>
            <Button
              className="positive"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  // `/admin/link?bus=${bus._id}&busNumber=${bus.registrationNumber}`
                  `/admin/link?${new URLSearchParams({
                    bus: bus._id,
                    busNumber: bus.registrationNumber,
                  }).toString()}`
                );
              }}
            >
              Edit Bus Link
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
            {bus.registrationNumber}
          </span>
          <span
            style={{
              fontSize: "0.8em",
            }}
          >
            {serviceType[bus.serviceType]}
          </span>
        </p>
        <p>
          Maximum Capacity:{" "}
          <Highlighter color="correct">
            <span
              style={{
                padding: "0.2rem",
                textTransform: "capitalize",
                color: "var(--black)",
              }}
            >
              {bus.capacity}
            </span>
          </Highlighter>
        </p>
        <p
          style={{
            fontSize: "0.8em",
          }}
        >
          The bus is{" "}
          <Highlighter color="correct">
            <span
              style={{
                padding: "0.2rem",
                textTransform: "capitalize",
                color: "var(--black)",
              }}
            >
              {bus.status}
            </span>
          </Highlighter>
        </p>
      </Card>
    </>
  );
};
export function BusList(props) {
  return (
    <>
      {props?.buses?.map(function (bus, i) {
        return <BusCard bus={bus} key={i} />;
      })}
    </>
  );
}
