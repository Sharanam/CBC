import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userModel from "../../globalState/user";
import { Button, Form, Label } from "./lib/formElements/Index";
import Input from "./lib/formElements/Input";
import Container from "./lib/layout/Container";

const ResetPassword = () => {
  const [payload, setPayload] = useState({
    id: "",
    token: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  return (
    <main>
      <Container size="xs">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const { id, token, password } = payload;
            userModel.resetPassword({ id, token, password }).then((res) => {
              if (res) navigate("/login");
            });
          }}
        >
          {{
            title: "Reset Password",
            formFields: (
              <>
                <Label className="required" htmlFor="id">
                  Id
                </Label>
                <Input
                  type="text"
                  placeholder="Enter Permanent Id"
                  value={payload.id}
                  name="id"
                  onChange={(e) => {
                    setPayload((payload) => {
                      return { ...payload, [e.target.name]: e.target.value };
                    });
                  }}
                />
                <Label className="required" htmlFor="token">
                  Token
                </Label>
                <Input
                  type="text"
                  placeholder="Enter Private Token"
                  value={payload.token}
                  name="token"
                  onChange={(e) => {
                    setPayload((payload) => {
                      return { ...payload, [e.target.name]: e.target.value };
                    });
                  }}
                />
                <Label className="required" htmlFor="password">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Create New Password"
                  value={payload.password}
                  name="password"
                  onChange={(e) => {
                    setPayload((payload) => {
                      return { ...payload, [e.target.name]: e.target.value };
                    });
                  }}
                />
                <Label className="required" htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter New Password Again"
                  value={payload.confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => {
                    setPayload((payload) => {
                      return { ...payload, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </>
            ),
            buttons: (
              <>
                <Button type="submit" className="positive">
                  Get Email for Account Recovery
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
export default ResetPassword;
