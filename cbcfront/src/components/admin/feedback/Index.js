import { useCallback, useEffect, useState } from "react";
import feedbacksModel from "../../../globalState/feedback";
import { Container } from "../../common/lib/layout/Index";

const Feedback = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBuses = useCallback(() => {
    setIsLoading(true);
    feedbacksModel.viewFeedbacks().then((result) => {
      setIsLoading(false);
      if (result.success) setData(result.buses);
      if (result.msg) alert(result.msg);
    });
  }, []);
  useEffect(() => {
    fetchBuses();
  }, []);
  if (isLoading)
    return (
      <Container>
        <h3>Loading...</h3>
      </Container>
    );
  return (
    <Container size="lg">
      <h1>Feedbacks</h1>
      {JSON.stringify(data)}
    </Container>
  );
};
export default Feedback;
