import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userModel from "../../../../globalState/user";
import { Button } from "../../../common/lib/formElements/Index";
import {
  Card,
  Favorite,
  Highlighter,
} from "../../../common/lib/styledElements/Index";

export function RouteView({ route, tripTime, stops, schedule, routeId }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(
    userModel?.getFavorites()?.includes(routeId) || false
  );
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
              className="positive"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/portal/routes/${route}`);
              }}
            >
              View Available Buses
            </Button>
            <Favorite
              liked={favorite}
              onClick={(task) => {
                userModel.updateFavorites({ routeId, task }).then((res) => {
                  setFavorite((f) =>
                    userModel?.getFavorites()?.includes(routeId)
                  );
                });
              }}
            />
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
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/portal/routes/${route}`);
            }}
          >
            {route}
          </span>
          <span
            style={{
              fontSize: "0.8em",
            }}
          >
            Maximum Trip Time: {tripTime} mins
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
