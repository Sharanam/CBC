import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminModel from "../../../globalState/admin";
import Button from "../../common/lib/formElements/button/Button";
import Form from "../../common/lib/formElements/Form";
import Input from "../../common/lib/formElements/Input";
import Label from "../../common/lib/formElements/label/Label";
import Container from "../../common/lib/layout/Container";
import Divider from "../../common/lib/styledElements/Divider";

export default function User(props) {
  const [user, setUser] = useState("");
  let { id } = props;

  const fetchUser = useCallback(() => {
    adminModel.getUser({ userId: id }).then((result) => {
      setUser(result || "");
    });
  }, [id]);

  useEffect(() => {
    if (id) fetchUser();
  }, [fetchUser, id]);

  const [pass, setPass] = useState({
    from: "",
    to: "",
    date: "",
    validity: 1,
    price: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  return (
    <>
      {user === "" ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Container size="xs">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setErrors(null);
                const payload = { user: id, ...pass };
                adminModel.issuePass(payload).then((result) => {
                  if (result?.msg) alert(result?.msg);
                  if (result.success) navigate(-1);
                  if (result.errors) setErrors(...result.errors);
                });
                // pending
                // .then((res) => {
                //   if (res) navigate("/login");
                // });
              }}
            >
              {{
                title: "Issue Pass",
                formFields: (
                  <>
                    <Label className="required" htmlFor="Id">
                      Id
                    </Label>
                    <Input
                      type="text"
                      placeholder="User Id"
                      value={id}
                      readOnly={true}
                    />
                    <Label className="required" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="User name"
                      value={user.name}
                      readOnly={true}
                    />
                    <Label className="required" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="User email"
                      value={user.email}
                      readOnly={true}
                    />
                    <Label className="required" htmlFor="bio">
                      Bio
                    </Label>
                    <Input
                      type="text"
                      placeholder="User bio"
                      value={user.bio}
                      readOnly={true}
                    />
                    <Label className="required" htmlFor="social">
                      Social
                    </Label>
                    <Input
                      type="text"
                      placeholder="User social"
                      value={user.social}
                      readOnly={true}
                    />
                    <Divider style={{ margin: "0.5rem 0" }} />
                    <Label className="required" htmlFor="from">
                      From
                    </Label>
                    <Input
                      autoFocus
                      type="text"
                      placeholder="From"
                      value={pass.from}
                      onChange={(e) => {
                        e.preventDefault();
                        setPass((state) => ({
                          ...state,
                          from: e.target.value,
                        }));
                      }}
                    />
                    <Label className="required" htmlFor="to">
                      To
                    </Label>
                    <Input
                      type="text"
                      placeholder="To"
                      value={pass.to}
                      onChange={(e) => {
                        e.preventDefault();
                        setPass((state) => ({
                          ...state,
                          to: e.target.value,
                        }));
                      }}
                    />
                    <Label className="required" htmlFor="date">
                      Commencement Date
                    </Label>
                    <Input
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      placeholder="Date"
                      value={pass.date}
                      onChange={(e) => {
                        e.preventDefault();
                        setPass((state) => ({
                          ...state,
                          date: e.target.value,
                        }));
                      }}
                    />
                    <Label className="required" htmlFor="validity">
                      Validity (Months)
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      max={12}
                      placeholder="Validity"
                      value={pass.validity}
                      onChange={(e) => {
                        e.preventDefault();
                        setPass((state) => ({
                          ...state,
                          validity: e.target.value,
                        }));
                      }}
                    />
                    <Label className="required" htmlFor="price">
                      Price
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Price"
                      value={pass.price}
                      onChange={(e) => {
                        e.preventDefault();
                        setPass((state) => ({
                          ...state,
                          price: e.target.value,
                        }));
                      }}
                    />
                  </>
                ),
                buttons: (
                  <>
                    <Button type="submit" className="positive">
                      Issue Pass
                    </Button>
                  </>
                ),
                additional: (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this procedure?"
                        )
                      )
                        navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                ),
              }}
            </Form>
          </Container>
        </>
      )}
    </>
  );
}
