import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import feedbacksModel from "../../../../globalState/feedback";
import getDateInFormat from "../../../../utils/getDate";
import { Button } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
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

export default function UnitFeedback(props) {
  const id = props?.id || 0;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const fetchFeedback = async () => {
    setIsLoading(true);
    const res = await feedbacksModel.getFeedback(id);
    if (res.msg) {
      alert(res.msg);
    }
    setFeedback(res.feedback);
    if (!res.feedback) navigate(-1);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (isLoading) return "Loading...";
  return (
    <Container>
      <FeedbackCard feedback={feedback} additional={<></>} />
    </Container>
  );
}
