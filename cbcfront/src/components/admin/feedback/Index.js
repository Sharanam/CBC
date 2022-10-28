import { useCallback, useEffect, useState } from "react";
import feedbacksModel from "../../../globalState/feedback";
import { Container } from "../../common/lib/layout/Index";
import getDateInFormat from "../../../utils/timekeeper";
import { Card, Loading } from "../../common/lib/styledElements/Index";
import { Button } from "../../common/lib/formElements/Index";

function FeedbackView({ feedback }) {
  return (
    <>
      <Card
        style={{
          color: "var(--dark-blue)",
          backgroundColor: "var(--white)",
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.8rem",
            }}
          >
            <Button className="positive">Reply</Button>
            <Button className="neutral">View</Button>
            <Button className="negative">Delete</Button>
          </div>
        }
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
        <p>{feedback.message}</p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
            justifyContent: "flex-end",
          }}
        >
          <span>Likes: {feedback.likes.length}</span>
          <span>Dislikes: {feedback.dislikes.length}</span>
        </p>
      </Card>
    </>
  );
}

const Feedback = (props) => {
  const { id } = props;
  const [feedbacks, setFeedbacks] = useState(null);
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useCallback(() => {
    setIsLoading(true);
    feedbacksModel.viewFeedbacks().then((result) => {
      setIsLoading(false);
      if (result.success) setFeedbacks(result.feedbacks);
      if (result.msg) setMsg(result.msg);
    });
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (id) {
    return <>{id} Under development</>;
  }
  return (
    <>
      <Container size="md">
        <h1>Feedbacks</h1>
        {msg && <Card className="info-message">{msg}</Card>}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {feedbacks?.map((f, i) => (
              <FeedbackView feedback={f} key={i} />
            ))}
          </>
        )}
      </Container>
    </>
  );
};
export default Feedback;
