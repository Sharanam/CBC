import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userModel from "../../globalState/user";
import { Button, Form, Label } from "./lib/formElements/Index";
import Input from "./lib/formElements/Input";
import Container from "./lib/layout/Container";

const ResendToken = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <main>
      <Container size="xs">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            userModel.resendToken({ email }).then((res) => {
              if (res) navigate("/login");
            });
          }}
        >
          {{
            title: "Resend Verification Token",
            formFields: (
              <>
                <Label className="required" htmlFor="EmailId">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="Enter Email Id"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </>
            ),
            buttons: (
              <>
                <Button type="submit" className="positive">
                  Get Account Verification Token Again
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
export default ResendToken;
