import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import feedbacksModel from "../../../../globalState/feedback";
import getDateInFormat from "../../../../utils/getDate";
import { Button } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import { Card } from "../../../common/lib/styledElements/Index";
import AddFeedback from "./AddFeedback";
import UnitFeedback from "./UnitFeedback";

function Feedback({ feedback }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{
          color: "var(--dark-blue)",
          backgroundColor: "var(--white)",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(feedback._id);
        }}
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

export default function ViewFeedbacks(props) {
  const { id } = props;
  const navigate = useNavigate();
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
    if (id === "add") {
      return <AddFeedback />;
    } else {
      return <UnitFeedback id={id} />;
    }
  }
  return (
    <>
      <Container>
        <h1>Feedbacks</h1>
        {msg && <Card className="info-message">{msg}</Card>}

        <Button
          className="positive"
          onClick={() => navigate("add")}
          style={{ width: "100%" }}
        >
          Give Feedback
        </Button>
        {feedbacks && JSON.stringify(feedbacks[0] || {})}
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            {feedbacks?.map((f, i) => (
              <Feedback feedback={f} key={i} />
            ))}
          </>
        )}
      </Container>
    </>
  );
}
