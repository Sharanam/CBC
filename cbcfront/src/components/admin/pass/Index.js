import { useState } from "react";
import Button from "../../common/lib/formElements/button/Button";
import Error from "../../common/lib/formElements/Error";
import Input from "../../common/lib/formElements/Input";
import Label from "../../common/lib/formElements/label/Label";
import Container from "../../common/lib/layout/Container";

const { default: Form } = require("../../common/lib/formElements/Form");

const Pass = (props) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    props.callback(payload);
    setIsLoading(false);
  };
  return (
    <Container size="lg">
      <h3 style={{ textAlign: "center", color: "var(--danger)" }}>
        <mark>Under development</mark>
      </h3>
      <Form onSubmit={handleSubmit}>
        {{
          title: "Issue bus pass",
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
export default Pass;
