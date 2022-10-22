import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userModel from "../../globalState/user";
import { Button, Form, Label } from "./lib/formElements/Index";
import Input from "./lib/formElements/Input";
import { Container } from "./lib/layout/Index";

const ConfirmToken = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  return (
    <main>
      <Container size="xs">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            userModel.confirmToken({ token }).then((res) => {
              if (res) navigate("/login");
            });
          }}
        >
          {{
            title: "Confirm Token",
            formFields: (
              <>
                <Label className="required" htmlFor="Token">
                  Token
                </Label>
                <Input
                  type="text"
                  placeholder="Enter Token"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                  }}
                />
              </>
            ),
            buttons: (
              <>
                <Button type="submit" className="positive">
                  Verify
                </Button>
              </>
            ),
            additional: <Link to="/login">Back to login page</Link>,
          }}
        </Form>
      </Container>
    </main>
  );
};
export default ConfirmToken;
