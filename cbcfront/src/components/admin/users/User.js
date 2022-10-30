import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import adminModel from "../../../globalState/admin";
import {
  Button,
  Label,
  Input,
  Form,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";
import { Divider, Card, Loading } from "../../common/lib/styledElements/Index";

export default function User(props) {
  const [user, setUser] = useState("");
  let { id } = props;
  const [searchParams] = useSearchParams();

  const fetchUser = useCallback(() => {
    adminModel.getUser({ userId: id }).then((result) => {
      setUser(result || "");
    });
  }, [id]);

  const [pass, setPass] = useState({
    issue: searchParams.get("issuePass") || 0,
    from: "",
    to: "",
    date: "",
    validity: 1,
    price: "",
  });

  useEffect(() => {
    if (id) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const navigate = useNavigate();

  return (
    <>
      {user === "" ? (
        <Loading />
      ) : (
        <>
          <Container size="xs">
            {pass.issue ? (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  const payload = { user: id, ...pass };
                  adminModel.issuePass(payload).then((result) => {
                    if (result?.msg) alert(result?.msg);
                    if (result.success) navigate(-1);
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
            ) : (
              <>
                <Card white={true}>
                  <div
                    style={{
                      color: "var(--card-bg)",
                    }}
                  >
                    <h2 style={{ textAlign: "center" }}>History</h2>
                    <div
                      style={{
                        maxHeight: "40vh",
                        overflowY: "auto",
                      }}
                    >
                      {user?.history}
                    </div>
                  </div>
                  <Divider style={{ margin: "0.5rem 0" }} />
                  <Button
                    className="positive"
                    onClick={() => {
                      setPass((pass) => ({ ...pass, issue: 1 }));
                    }}
                    style={{ width: "100%" }}
                  >
                    Issue Pass
                  </Button>
                  Blacklist, set Admin
                </Card>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
}
