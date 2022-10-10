import { useCallback, useEffect, useState } from "react";
import feedbacksModel from "../../../globalState/feedback";
import { Container } from "../../common/lib/layout/Index";
import getDateInFormat from "../../../utils/getDate";
import { Card } from "../../common/lib/styledElements/Index";
import { Button } from "../../common/lib/formElements/Index";

function FeedbackView({ feedback }) {
  return (
    <>
      <Card
        style={{
          color: "var(--bov-dark)",
          backgroundColor: "var(--tubelight)",
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
          <h2>{feedback.user.slice(0, 5)}</h2>
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
  }, []);
  if (id) {
    {
      return <>{id} Under development</>;
    }
  }
  return (
    <>
      <Container>
        <h1>Feedbacks</h1>
        {msg && <Card className="info-message">{msg}</Card>}
        {isLoading ? (
          <h3>Loading...</h3>
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
