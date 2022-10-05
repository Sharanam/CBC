import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form, Input, Label, Button, Error } from "./lib/formElements/Index";
import { Container } from "./lib/layout/Index";
import userModel from "../../globalState/user";
import { useSessionStorage } from "../../utils/browserStore";
import { FlagContext } from "../../context/Flag";
import Divider from "./lib/styledElements/Divider";

const initialState = {
  email: "admin@g.com",
  password: "abcd@W33",
};

export default function LoginPage() {
  const [flag, setFlag] = useContext(FlagContext);
  const [user, setUser] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  // const { isAuthenticated, errors }
  const [sessionUser, setSessionUser] = useSessionStorage(
    "user",
    userModel.user
  );
  // const { type }
  const [userDetails, setUserDetails] = useSessionStorage(
    "userDetails",
    userModel.userDetails
  );
  const { signIn, clearErrors } = userModel;

  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate(); // it's been used below
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signIn(userModel, { ...user })
      .then((res) => {
        if (res.success) {
          setSessionUser({ ...sessionUser, isAuthenticated: true });
          setUserDetails(res);
        } else {
          setSessionUser({ ...sessionUser, errors: res.errors });
        }
        setIsLoading(false);
      })
      .catch((e) => alert());
  };

  useEffect(() => {
    if (!isLoading) {
      if (sessionUser.isAuthenticated) {
        setFlag((_) => Date.now());
        // navigate("/portal");
        window.location.href = "/admin";
        // trick, but it works
      }
      return () => {
        clearErrors();
      };
    }
  }, [isLoading]);

  return (
    <main>
      <Container size="xs">
        <Form onSubmit={handleSubmit}>
          {{
            title: "Login",
            formFields: (
              <>
                <Label className="required" htmlFor="EmailId">
                  Email
                </Label>
                {sessionUser.errors?.user && (
                  <Error>{sessionUser.errors.user}</Error>
                )}
                <Input
                  type="email"
                  placeholder="Enter Email Id"
                  value={user.email}
                  onChange={(e) => {
                    setUser((User) => ({
                      ...User,
                      email: e.target.value,
                    }));
                  }}
                />
                <Label className="required" htmlFor="Password">
                  Password
                </Label>
                {sessionUser.errors?.password && (
                  <Error>{sessionUser.errors.password}</Error>
                )}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser((User) => ({
                      ...User,
                      password: e.target.value,
                    }));
                  }}
                />
                <Label
                  style={{
                    alignItems: "baseline",
                    color: "var(--black)",
                  }}
                >
                  <Input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((state) => !state)}
                  />
                  <span style={{ margin: "3px" }}>Show Password</span>
                </Label>
              </>
            ),
            buttons: (
              <>
                <Button type="submit" className="positive" disabled={isLoading}>
                  Sign In
                </Button>
              </>
            ),
            additional: (
              <>
                <Link to="/signup">New User? Create Account</Link>
                <Link to="/ForgotPassword">Forgot Password?</Link>
                <Divider style={{ margin: "0.1rem 0" }} />
                <Link to="/ResetPassword">Reset Password</Link>
                <Link to="/ResendToken">
                  Missed to Verify within given time?
                </Link>
                <Link to="/ConfirmToken">Do Verification</Link>
              </>
            ),
          }}
        </Form>
      </Container>
    </main>
  );
}
