import { useState } from "react";
import {
  Input,
  Label,
  Form,
  Error,
  Button,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";

const AddBus = (props) => {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    user: "",
    from: "",
    to: "",
    date: "",
    validity: "1",
    price: "0",
  });
  return (
    <Container size="lg">
      <h3 style={{ textAlign: "center", color: "var(--danger)" }}>
        <mark>Under development</mark>
      </h3>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          props.callback(payload);
          setIsLoading(false);
        }}
      >
        {{
          title: "Add Bus into Database",
          formFields: (
            <>
              <Label className="required" htmlFor="user">
                User
              </Label>
              {errors?.user && <Error>{errors.user}</Error>}
              <Input
                type="text"
                placeholder="Enter user id"
                value={payload.user}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    user: e.target.value,
                  }));
                }}
              />
            </>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive" disabled={isLoading}>
                Announce It
              </Button>
              <Button
                className="neutral"
                onClick={(e) => {
                  e.preventDefault();
                  setPayload({
                    title: "",
                    description: "",
                  });
                }}
              >
                Clear
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default AddBus;
