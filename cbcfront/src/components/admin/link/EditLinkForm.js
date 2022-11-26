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

export default function EditLinkForm(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [payload, setPayload] = useState({
    _id: props.link || "",
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

  // fetch prefilled payload
  const fetchLink = useCallback(() => {
    setIsLoading(true);
    linksModel.getSpecificLinkInstance(props.link).then((result) => {
      setIsLoading(false);
      if (result.success) {
        const t = result.link;
        t.bus = result?.link?.bus?.registrationNumber || result?.link?.bus;
        t.route = result?.link?.route?.identifier || result?.link?.route;
        setPayload(t);
      } else alert("something went wrong");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchRoutes();
    fetchBuses();
    fetchLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container size="sm">
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const response = await linksModel.editLink(payload);
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
            title: (
              <>
                Edit Link{" "}
                <span
                  style={{
                    color: "var(--black)",
                  }}
                >
                  {props.link}
                </span>
              </>
            ),
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
                    // commitment: upgraded the solution but is not robust yet
                    if (
                      selected &&
                      routes.filter((v) => v.identifier.includes(selected))
                        .length
                    ) {
                      setErrors((e) => ({
                        ...e,
                        route: null,
                      }));
                      if (selected !== payload.route) {
                        setPayload((payload) => ({
                          ...payload,
                          route: selected,
                          // Issue: it needs to remove redundant elements
                          // i.e., schedule of old route
                          schedule: payload?.schedule?.filter((t) =>
                            routes
                              .filter((v) => v.identifier === selected)
                              .map((v) => v.schedule)
                              .filter((v) => v.includes(t))
                          ),
                        }));
                      }
                    } else {
                      setErrors((e) => ({
                        ...e,
                        route: "This will give an error !!!",
                      }));
                    }
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
