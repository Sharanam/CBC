import { useNavigate } from "react-router-dom";
import serviceType from "../../../utils/getBusServiceTypes";
import { Button } from "../../common/lib/formElements/Index";
import { Card, Highlighter } from "../../common/lib/styledElements/Index";

export function LinkCards(props) {
  const navigate = useNavigate();
  return (
    <>
      {props?.links?.map((link, key) => (
        <Card
          white={true}
          key={key}
          actions={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.8rem",
              }}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.confirm(
                    `Are you sure you want to remove this permanently?`
                  ) && navigate(`delete/${link._id}`);
                }}
                className="negative"
              >
                Delete Link
              </Button>
              <Button
                onClick={() => {
                  navigate(`edit/${link._id}`);
                }}
                className="neutral"
              >
                Edit Link
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
            {link?.bus?.serviceType >= 0 ? (
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
            ) : (
              ""
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
              margin: "3px 0",
            }}
          >
            Assigned onto route{" "}
            <mark className="correct">{link?.route?.identifier}</mark>
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
            <Highlighter color="correct">
              <span
                style={{
                  padding: "0.2rem",
                  textTransform: "capitalize",
                  color: "var(--black)",
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
            Maximum Capacity: {link?.bus?.capacity}
          </p>
        </Card>
      ))}
    </>
  );
}
