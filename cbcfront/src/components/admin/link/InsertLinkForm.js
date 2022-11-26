import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";
import linksModel from "../../../globalState/links";
import routesModel from "../../../globalState/routes";
import {
  Button,
  DropDown,
  Error,
  Form,
  Label,
  SearchAutocomplete,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";

export default function InsertLinkForm(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [payload, setPayload] = useState({
    route: props.route || "",
    bus: props.bus || "",
    schedule: [],
  });

  const timeList = (rts) => {
    return rts
      ?.filter((v) => v.identifier === payload.route || v._id === payload.route)
      ?.map((d) => d.schedule)[0];
  };

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

  useEffect(() => {
    fetchRoutes();
    fetchBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container size="sm">
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            // const schedule = payload.schedule.map((v) => toDateFrom(v));
            const response = await linksModel.addLink({
              ...payload,
              // schedule,
            });
            if (response.errors) {
              setErrors({ ...response.errors });
              console.log("errors", response.errors);
            }
            setIsLoading(false);
            if (response.msg) alert(response.msg);
            if (response?.success) {
              navigate(-1);
            } else {
              alert("Something went wrong");
            }
          }}
        >
          {{
            title: "New Assignment",
            formFields: (
              <>
                {/* Route */}
                <Label className="required" htmlFor="route">
                  Route
                </Label>
                {errors?.route && <Error>{errors.route}</Error>}
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
                {/* Bus */}
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
                {/* Schedule */}
                <Label className="required" htmlFor="schedule">
                  Only for below schedule:
                </Label>
                {payload.schedule.map((value, i) => (
                  <div key={i}>
                    <div style={{ width: "100%" }}>
                      {errors && errors[`schedule.${i}`] && (
                        <Error>{errors[`schedule.${i}`]}</Error>
                      )}
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <DropDown
                        options={timeList(routes)}
                        default={payload.schedule[i]}
                        onChange={(time) => {
                          const temp = [...payload.schedule];
                          temp[i] = time;
                          setPayload((payload) => ({
                            ...payload,
                            schedule: temp,
                          }));
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          margin: "auto",
                        }}
                      />
                      <Button
                        className="negative"
                        onClick={(e) => {
                          e.preventDefault();
                          const s = [...payload.schedule];
                          s.splice(i, 1);
                          setPayload((payload) => ({
                            ...payload,
                            schedule: s,
                          }));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    className="positive"
                    disabled={isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      const s = payload.schedule;
                      s.push(timeList(routes)[0]);
                      setPayload((payload) => ({
                        ...payload,
                        schedule: s,
                      }));
                    }}
                  >
                    + Time
                  </Button>
                </div>
              </>
            ),
            buttons: (
              <>
                <Button type="submit" className="positive" disabled={isLoading}>
                  Submit
                </Button>
                <Button
                  type="reset"
                  className="negative"
                  disabled={isLoading}
                  onClick={(e) => {
                    props.onCancel();
                  }}
                >
                  Cancel
                </Button>
              </>
            ),
          }}
        </Form>
      </Container>
    </>
  );
}
