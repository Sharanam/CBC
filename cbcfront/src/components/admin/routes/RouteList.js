import { useNavigate } from "react-router-dom";
import { Button } from "../../common/lib/formElements/Index";
import { Card, Highlighter } from "../../common/lib/styledElements/Index";

const RouteCard = ({ route }) => {
  const navigate = useNavigate();
  if (!route) return <>No route is available</>;
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
                  `Are you sure you want to remove ${route.registrationNumber} permanently?`
                ) && navigate(`/admin/routes/delete/${route._id}`);
              }}
            >
              Delete This Route
            </Button>
            <Button
              className="neutral"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/portal/route/${route._id}`);
              }}
            >
              View Route
            </Button>
            <Button
              className="positive"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/routes/edit/${route._id}`);
              }}
            >
              Edit Route Details
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
            {route.identifier}
          </span>
          <span
            style={{
              fontSize: "0.8em",
            }}
          >
            {route.tripTime} mins
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
              {route?.stops.join(", ")}
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
          {route?.schedule.map((s, i) => (
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
};
export function RouteList(props) {
  return (
    <>
      {props?.routes?.map((route, i) => (
        <RouteCard route={route} key={i} />
      ))}
    </>
  );
}
