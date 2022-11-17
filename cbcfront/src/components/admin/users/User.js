import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import adminModel from "../../../globalState/admin";
import busStandsModel from "../../../globalState/busStands";
import { PassPrinter } from "../../common/account/passPrinter/PassPrinter";
import {
  Button,
  Label,
  Input,
  Form,
  SearchAutocomplete,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";
import { Divider, Card, Loading } from "../../common/lib/styledElements/Index";
import Blacklist from "./Blacklist";
import { FavoriteViewer } from "./FavoriteViewer";
import { HistoryViewer } from "./HistoryViewer";
import SetAdmin from "./SetAdmin";

function OffDays({ data, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5em",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ].map((day, index) => (
        <div key={index}>
          <Label htmlFor={day}>{day}</Label>
          <Input
            type="checkbox"
            id={day}
            checked={data.includes(index)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...data, index]);
              } else {
                onChange(data.filter((d) => d !== index));
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
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
    date: new Date().toLocaleDateString("en-CA"),
    validity: 1,
    price: "0",
    offFor: [0],
  });

  useEffect(() => {
    if (id) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (pass.from && pass.to) {
      // fetch price ({from,to}).then(res=>setPass(p=>({...p,price:res})))
    }
  }, [pass.from, pass.to]);
  const navigate = useNavigate();
  const [busStands, setBusStands] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!pass.issue || busStands !== undefined) return;
    setIsLoading(true);
    busStandsModel.busStandNames().then((result) => {
      setBusStands(result);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass.issue]);

  if (isLoading) <Loading />;

  return (
    <>
      {user === "" ? (
        <Loading />
      ) : (
        <>
          <Container size="lg">
            {pass.issue ? (
              <Container size="xs">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const payload = { user: id, ...pass };
                    if (pass._id) {
                      adminModel.updatePass(payload).then((result) => {
                        if (result) {
                          navigate(-1);
                        }
                      });
                    } else {
                      adminModel.issuePass(payload).then((result) => {
                        if (result?.msg) alert(result?.msg);
                        if (result.success) navigate(-1);
                      });
                    }
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
                        <SearchAutocomplete
                          data={busStands}
                          injected={pass.from}
                          autoFocus
                          handleCallback={(selected) => {
                            setPass({ ...pass, from: selected });
                          }}
                          placeholder="From"
                          style={{
                            width: "100%",
                          }}
                        />
                        <Label className="required" htmlFor="to">
                          To
                        </Label>
                        <SearchAutocomplete
                          data={busStands}
                          injected={pass.to}
                          handleCallback={(selected) => {
                            setPass({ ...pass, to: selected });
                          }}
                          placeholder="To"
                          style={{
                            width: "100%",
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
                        <Label htmlFor="days">Off For: </Label>
                        <OffDays
                          onChange={(offFor) => {
                            setPass((state) => ({ ...state, offFor }));
                          }}
                          data={pass.offFor}
                        />
                      </>
                    ),
                    buttons: (
                      <>
                        <Button type="submit" className="positive">
                          {pass._id ? "Update Pass" : "Issue Pass"}
                        </Button>
                      </>
                    ),
                    additional: (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setPass((pass) => ({ ...pass, issue: 0 }));
                        }}
                      >
                        Cancel
                      </Button>
                    ),
                  }}
                </Form>
              </Container>
            ) : (
              <>
                <Card
                  white={true}
                  style={{
                    backgroundColor: "transparent",
                    margin: "1rem 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5em",
                      flexWrap: "wrap",
                      flexDirection: "row",
                    }}
                  >
                    <Card
                      white={true}
                      style={{
                        width: "100%",
                      }}
                      actions={
                        <>
                          <Button
                            className="positive"
                            onClick={() => {
                              setPass((pass) => ({ ...pass, issue: 1 }));
                            }}
                            style={{ width: "100%" }}
                          >
                            Issue new pass to <b>{user.name}</b>
                          </Button>
                        </>
                      }
                    >
                      <h2 style={{ textAlign: "center" }}>Passes</h2>
                      <PassPrinter
                        passes={user.passes}
                        admin={true}
                        user={user._id}
                        onUpdate={(i) => {
                          const pass = user.passes.find((p) => i === p._id);
                          setPass((state) => ({
                            ...state,
                            _id: i,
                            ...pass,
                            date: new Date(pass.date).toLocaleDateString(
                              "en-CA"
                            ),
                            issue: 1,
                          }));
                        }}
                        onDelete={(pass) => {
                          setUser((user) => ({
                            ...user,
                            passes: user.passes.filter((p) => p._id !== pass),
                          }));
                        }}
                      />
                    </Card>
                    <Card
                      white={true}
                      style={{
                        width: "100%",
                      }}
                      actions={
                        <Blacklist
                          isBlacklisted={user["isBlacklisted"]}
                          _id={user["_id"]}
                          style={{
                            width: "100%",
                          }}
                        />
                      }
                    >
                      <p>
                        Blacklisted user cannot contribute to the bus status
                      </p>
                    </Card>
                    <Card
                      white={true}
                      style={{
                        width: "100%",
                      }}
                      actions={
                        <SetAdmin
                          type={user["type"]}
                          _id={user["_id"]}
                          style={{
                            width: "100%",
                          }}
                        />
                      }
                    >
                      <p>
                        You can transform a commuter to an admin and vice versa.
                      </p>
                    </Card>
                  </div>
                  <div
                    style={{
                      color: "var(--card-bg)",
                    }}
                  >
                    <h2 style={{ textAlign: "center" }}>History</h2>

                    <HistoryViewer
                      bus={user?.history?.bus.reverse()}
                      route={user?.history?.route.reverse()}
                    />

                    <Divider style={{ margin: "0.5rem 0" }} />

                    <FavoriteViewer route={user?.favorites} />
                  </div>
                  <Divider style={{ margin: "0.5rem 0" }} />
                </Card>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
}
