import { useNavigate } from "react-router-dom";
import getDateInFormat from "../../../../utils/timekeeper";
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
          <p
            onClick={() => {
              navigate(feedback._id);
            }}
            style={{ cursor: "pointer", fontSize: "1.1em", fontWeight: "bold" }}
          >
            {feedback.message}
          </p>
          <p
            style={{
              fontSize: "0.8em",
            }}
          >
            {getDateInFormat(feedback.updatedAt)}
          </p>
        </div>
        <p
          style={{
            color: feedback?.user?.isBlacklisted
              ? "var(--danger)"
              : "currentColor",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/profile/${feedback?.user?._id}`);
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
