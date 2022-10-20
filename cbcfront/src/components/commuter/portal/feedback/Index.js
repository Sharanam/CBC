import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import feedbacksModel from "../../../../globalState/feedback";
import { Button } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import { Card } from "../../../common/lib/styledElements/Index";
import AddFeedback from "./AddFeedback";
import UnitFeedback from "./UnitFeedback";
import { FeedbackCard } from "./FeedbackCard";

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
    if (!id && id !== "add") fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
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
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            {feedbacks?.map((f, i) => (
              <FeedbackCard feedback={f} key={i} />
            ))}
          </>
        )}
      </Container>
    </>
  );
}
