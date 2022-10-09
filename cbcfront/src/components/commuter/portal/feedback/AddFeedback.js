import { useState } from "react";
import { useNavigate } from "react-router-dom";
import feedbacksModel from "../../../../globalState/feedback";
import {
  Button,
  Error,
  Form,
  Input,
  Label,
} from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";

export default function AddFeedback() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    message: "",
  });
  const navigate = useNavigate();
  return (
    <Container size="sm">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const response = await feedbacksModel.newFeedback(payload);
          if (response.errors) {
            setErrors({ ...response.errors });
          }
          setIsLoading(false);
          if (response?.success) {
            alert("Feedback saved !!");
            navigate("/portal/feedback");
          } else {
            alert("Something is erroneous in the data");
          }
        }}
      >
        {{
          title: "Give Feedback",
          formFields: (
            <>
              <Label className="required" htmlFor="message">
                Message
              </Label>
              {errors?.message && <Error>{errors.message}</Error>}
              <Input
                type="text"
                placeholder="I want to say that..."
                value={payload.message}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    message: e.target.value,
                  }));
                }}
              />
            </>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive" disabled={isLoading}>
                Submit
              </Button>
              <Button
                type="reset"
                className="negative"
                disabled={isLoading}
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
}
