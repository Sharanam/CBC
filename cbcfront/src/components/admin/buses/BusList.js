import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";
import { Button, Label } from "../../common/lib/formElements/Index";
import {
  Card,
  Divider,
  Highlighter,
} from "../../common/lib/styledElements/Index";

const serviceType = {
  0: "Ordinary",
  1: "AC",
  2: "Sofa",
};

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
          backgroundColor: "var(--white-light)",
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
