import { useNavigate } from "react-router-dom";
import getDateInFormat from "../../../../utils/getDate";
import { Button } from "../../../common/lib/formElements/Index";
import { Card } from "../../../common/lib/styledElements/Index";

export function FeedbackCard({ feedback, additional }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{
          color: "var(--dark-blue)",
          backgroundColor: "var(--white)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              color: feedback?.user?.isBlacklisted
                ? "var(--danger)"
                : "currentColor",
            }}
          >
            <span
              title={
                feedback?.user?.isBlacklisted
                  ? "User has been black listed."
                  : feedback?.user?.name
              }
            >
              {feedback?.user?.name}
            </span>
          </h2>
          <p
            style={{
              fontSize: "0.8em",
            }}
          >
            {getDateInFormat(feedback.updatedAt)}
          </p>
        </div>
        <p
          onClick={() => {
            navigate(feedback._id);
          }}
          style={{ cursor: "pointer" }}
        >
          {feedback.message}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
            justifyContent: "flex-end",
          }}
        >
          <Button className="positive">
            <span>Likes: {feedback.likes.length}</span>
          </Button>
          <Button className="negative">
            <span>Dislikes: {feedback.dislikes.length}</span>
          </Button>
        </p>
        {additional}
      </Card>
    </>
  );
}
