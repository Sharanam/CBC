import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";
import busStandsModel from "../../../globalState/busStands";
import reportingsModel from "../../../globalState/reporting";
import routesModel from "../../../globalState/routes";
import {
  Button,
  DropDown,
  Error,
  Form,
  Input,
  Label,
  SearchAutocomplete,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";
import { Divider, Loading } from "../../common/lib/styledElements/Index";

export default function AddReporting(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [payload, setPayload] = useState({
    route: "",
    bus: "",
    passengers: [{ from: "", to: "", count: 0 }],
    schedule: "",
  });
  // fetch buses
  const [buses, setBuses] = useState([]);
  const fetchBuses = useCallback(() => {
    setIsLoading(true);
    busesModel.viewBuses().then((result) => {
      result = result?.buses?.map((v) => v.registrationNumber);
      setBuses(result || buses);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch routes
  const [routes, setRoutes] = useState([]);
  const fetchRoutes = useCallback(() => {
    setIsLoading(true);
    routesModel.getAllRoutes().then((result) => {
      setIsLoading(false);
      if (result.success) setRoutes(result.routes || routes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch bus stands

  const [busStands, setBusStands] = useState(undefined);
  useEffect(() => {
    setIsLoading(true);
    busStandsModel.busStandNames().then((result) => {
      setBusStands(result);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchRoutes();
    fetchBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const timeList = (rts) => {
    return rts
      ?.filter((v) => v.identifier === payload.route || v._id === payload.route)
      ?.map((d) => d.schedule)[0];
  };

  useEffect(() => {
    if (props.id) {
      setIsLoading(true);
      reportingsModel.getInstanceOfReporting(props.id).then((result) => {
        result = result.reporting;
        setPayload((st) => ({
          route: result?.route?.identifier || result?.route,
          bus: result?.bus?.registrationNumber || result?.bus,
          passengers: result?.passengers || st.passengers,
          schedule: result?.schedule || st.schedule,
          _id: props.id,
        }));
        setIsLoading(false);
      });
    }
  }, [props.id]);

  const navigate = useNavigate();
  if (isLoading) <Loading />;
  return (
    <Container size="sm">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          let response;
          if (props.id) {
            response = await reportingsModel.editReporting(payload);
          } else {
            response = await reportingsModel.addReporting(payload);
          }

          if (response.errors) {
            setErrors({ ...response.errors });
          }
          setIsLoading(false);
          if (response.msg) alert(response.msg);
          if (response?.success) {
            navigate(-1);
          }
        }}
      >
        {{
          title: props.id ? "Edit Reporting" : "Add Reporting",
          formFields: (
            <>
              <Label className="required" htmlFor="route">
                Route
              </Label>
              {errors && errors.route && <Error>{errors.route}</Error>}
              <SearchAutocomplete
                injected={payload.route}
                data={routes?.map((v) => v.identifier)}
                handleCallback={(selected) => {
                  setPayload((payload) => ({
                    ...payload,
                    route: selected,
                  }));
                }}
                placeholder="Enter Route Identifier"
                style={{ width: "100%" }}
              />
              <Label className="required" htmlFor="bus">
                Bus
              </Label>
              {errors?.bus && <Error>{errors.bus}</Error>}
              <SearchAutocomplete
                injected={payload.bus}
                data={buses}
                handleCallback={(selected) => {
                  setPayload((payload) => ({
                    ...payload,
                    bus: selected,
                  }));
                }}
                placeholder="Enter Bus Number"
                style={{ width: "100%" }}
              />
              <Label className="required" htmlFor="schedule">
                Only for below schedule:
              </Label>
              <DropDown
                options={timeList(routes)}
                default={payload.schedule}
                onChange={(time) => {
                  setPayload((payload) => ({
                    ...payload,
                    schedule: time,
                  }));
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "auto",
                  backgroundColor: "var(--white)",
                }}
              />
              <Label className="required" htmlFor="passengers">
                Point-to-Point Passengers
              </Label>
              {errors && (
                <Error>
                  {JSON.stringify({
                    ...errors,
                    route: undefined,
                    bus: undefined,
                    schedule: undefined,
                  })}
                </Error>
              )}
              {payload.passengers?.map((v, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: "0.5em",
                  }}
                >
                  <SearchAutocomplete
                    injected={v.from}
                    data={busStands}
                    handleCallback={(selected) => {
                      let temp = [...payload.passengers];
                      temp[i].from = selected;
                      setPayload((payload) => ({
                        ...payload,
                        passengers: temp,
                      }));
                    }}
                    placeholder="From"
                    style={{ width: "100%", flexGrow: 1 }}
                  />
                  <SearchAutocomplete
                    injected={v.to}
                    data={busStands}
                    handleCallback={(selected) => {
                      let temp = [...payload.passengers];
                      temp[i].to = selected;
                      setPayload((payload) => ({
                        ...payload,
                        passengers: temp,
                      }));
                    }}
                    placeholder="To"
                    style={{ width: "100%", flexGrow: 1 }}
                  />
                  <Input
                    type="number"
                    value={v.count}
                    onChange={(e) => {
                      let temp = [...payload.passengers];
                      temp[i].count = e.target.value;
                      setPayload((payload) => ({
                        ...payload,
                        passengers: temp,
                      }));
                    }}
                    min={0}
                    placeholder="Count"
                  />

                  <Button
                    className="negative"
                    onClick={(e) => {
                      e.preventDefault();
                      let temp = [...payload.passengers];
                      temp.splice(i, 1);
                      setPayload((payload) => ({
                        ...payload,
                        passengers: temp,
                      }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="positive"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  const s = [...payload.passengers];
                  s.push({
                    from: "",
                    to: "",
                    count: 0,
                  });
                  setPayload((payload) => ({
                    ...payload,
                    passengers: s,
                  }));
                }}
                style={{
                  margin: "1em 0",
                }}
              >
                New entry
              </Button>
              <Divider
                style={{
                  margin: "0.5em 0",
                }}
              />
            </>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive" disabled={isLoading}>
                {props.id ? "Save Reporting" : "Add Reporting"}
              </Button>
              {props.id ? (
                <Button
                  className="negative"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    reportingsModel
                      .deleteReporting({ _id: props.id })
                      .then((response) => {
                        if (response.msg) alert(response.msg);
                        if (response?.success) {
                          navigate(-1);
                        }
                      });
                  }}
                >
                  Delete Reporting
                </Button>
              ) : null}
              <Button
                type="reset"
                className="negative"
                disabled={isLoading}
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
}
