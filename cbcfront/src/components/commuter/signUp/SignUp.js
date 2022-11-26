import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Label,
  Button,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";
import Error from "../../common/lib/formElements/Error";
import { useSessionStorage } from "../../../utils/browserStore";
import userModel from "../../../globalState/user";

const initialState = {
  name: "sharanam",
  email: "s@g.com",
  phone: "1234597",
  password: "abcd@W33",
  confirmPassword: "abcd@W33",
};

export default function SignUp() {
  const [user, setUser] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [sessionUser, setSessionUser] = useSessionStorage(
    "user",
    userModel.user
  );
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, clearErrors } = userModel;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signUp(userModel, { ...user }).then((response) => {
      if (response.message) {
        alert(response.message);
      } else {
        setSessionUser({ ...sessionUser, errors: response.errors });
      }
      setIsLoading(false);
      if (response.success) {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    if (sessionUser.isAuthenticated) {
      navigate("/portal");
    }
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUser.isAuthenticated]);

  return (
    <main>
      <Container size="xs">
        <Form onSubmit={handleSubmit}>
          {{
            title: "Sign Up",
            formFields: (
              <>
                <Label className="required" htmlFor="Name">
                  Name
                </Label>
                {sessionUser.errors?.name && (
                  <Error>{sessionUser.errors.name}</Error>
                )}
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={user.name}
                  onChange={(e) => {
                    setUser((User) => ({
                      ...User,
                      name: e.target.value,
                    }));
                  }}
                  error="Name require"
                />
                <Label className="required" htmlFor="EmailId">
                  Email
                </Label>
                {sessionUser.errors?.email && (
                  <Error>{sessionUser.errors.email}</Error>
                )}
                <Input
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser((User) => ({
                      ...User,
                      email: e.target.value,
                    }));
                  }}
                  placeholder="Enter Email Id"
                />
                <Label className="required" htmlFor="PhoneNumber">
                  Phone Number
                </Label>
                {sessionUser.errors?.phone && (
                  <Error>{sessionUser.errors.phone}</Error>
                )}
                <Input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={user.phone}
                  onChange={(e) => {
                    setUser((User) => ({
                      ...User,
                      phone: e.target.value,
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
                <Label className="required" htmlFor="ConfirmPassword">
                  Confirm Password
                </Label>
                {sessionUser.errors?.confirmPassword && (
                  <Error>{sessionUser.errors.confirmPassword}</Error>
                )}

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password Again"
                  value={user.confirmPassword}
                  onChange={(e) => {
                    setUser((User) => ({
                      ...User,
                      confirmPassword: e.target.value,
                    }));
                  }}
                  onBlur={() => {
                    if (user.password !== user.confirmPassword)
                      if (
                        window.confirm(
                          "Password does not match with Confirmed password. Press ok to CLEAR dissimilar passwords..."
                        )
                      )
                        setUser((User) => ({
                          ...User,
                          password: "",
                          confirmPassword: "",
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
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span style={{ margin: "3px" }}>Show Password</span>
                </Label>
              </>
            ),
            buttons: (
              <Button className="positive" disabled={isLoading}>
                Create Account
              </Button>
            ),
            additional: <Link to="/Login">Have already an account?</Link>,
          }}
        </Form>
      </Container>
    </main>
  );
}
