import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import AddFeedback from "./AddFeedback";

export default function Feedback(props) {
  const { id } = props;
  const navigate = useNavigate();
  if (id === "add") {
    return <AddFeedback />;
  }
  return (
    <>
      <Container>
        <h1>Feedbacks</h1>
        <Button
          className="positive"
          onClick={() => navigate("add")}
          style={{ width: "100%" }}
        >
          Give Feedback
        </Button>
        {id}
      </Container>
    </>
  );
}
