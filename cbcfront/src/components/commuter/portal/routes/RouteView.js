import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/lib/formElements/Index";
import { Card, Highlighter } from "../../../common/lib/styledElements/Index";

export function RouteView({ route, tripTime, stops, schedule }) {
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
              View Buses
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
            Trip time: {tripTime} mins
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
