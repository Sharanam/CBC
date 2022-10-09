import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userModel from "../../../globalState/user";
import { Label, Input, Form, Button } from "../lib/formElements/Index";
import { Container } from "../lib/layout/Index";
import { Card, Divider } from "../lib/styledElements/Index";

const type = { a: "admin", c: "commuter" };
function Field({ label, value }) {
  return (
    <>
      <Label
        style={{
          textTransform: "capitalize",
        }}
      >
        {label}
      </Label>
      <Input type="text" readOnly value={value} />
    </>
  );
}
const Profile = (props) => {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = useCallback(() => {
    setIsLoading(true);
    userModel.getMyProfile().then((result) => {
      setIsLoading(false);
      setData({ ...result });
    });
  }, []);
  useEffect(() => {
    fetchProfile();
  }, []);
  if (isLoading) return <h3>Loading...</h3>;
  return (
    <Container size="sm">
      <Form>
        {{
          title: "Profile",
          formFields: (
            <>
              <Field label="Name" value={data.name} />
              <Field label="email" value={data.email} />
              <Field label="phone" value={data.phone} />
              <Field label="Bio" value={data.bio} />
              <Field label="Social" value={data.social} />
              {props.view !== "minimal" && (
                <>
                  {" "}
                  <Field
                    label="Visibility"
                    value={data.public ? "Public" : "Private"}
                  />
                  <Field label="Type" value={type[data.type]} />
                  <Field
                    label="Authorized User"
                    value={data.isVerified ? "Yes" : "No"}
                  />
                  <Field
                    label="Blocked User"
                    value={data.isBlacklisted ? "Yes" : "No"}
                  />
                </>
              )}
            </>
          ),
          buttons: (
            <>
              {props.view !== "minimal" && (
                <Button className="positive">Update Profile</Button>
              )}
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default Profile;
