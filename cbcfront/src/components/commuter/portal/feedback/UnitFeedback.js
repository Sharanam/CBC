import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import feedbacksModel from "../../../../globalState/feedback";
import { Container } from "../../../common/lib/layout/Index";
import { FeedbackCard } from "./FeedbackCard";

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
      <FeedbackCard
        feedback={feedback}
        updateFeedback={(f) => {
          setFeedback((s) => ({ ...s, likes: f.likes, dislikes: f.dislikes }));
        }}
        additional={<></>}
      />
    </Container>
  );
}
