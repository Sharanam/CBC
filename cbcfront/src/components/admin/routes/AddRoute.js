import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routesModel from "../../../globalState/routes";
import {
  Button,
  Error,
  Form,
  Input,
  Label,
} from "../../common/lib/formElements/Index";
import SearchAutocomplete from "../../common/lib/formElements/searchAutocomplete/SearchAutocomplete";
import { Container } from "../../common/lib/layout/Index";

const AddRoute = (props) => {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    identifier: "",
    stops: [""],
    schedule: [""],
    tripTime: 0,
  });
  const navigate = useNavigate();
  return (
    <Container size="sm">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const response = await routesModel.addRoute(payload);
          setIsLoading(false);
          if (response.errors) {
            setErrors({ ...response.errors });
          }
          if (response?.success) {
            alert("route added successfully");
            navigate("/admin/routes");
          } else {
            alert("Something is erroneous in the data");
          }
        }}
      >
        {{
          title: "New Route",
          formFields: (
            <>
              <Label className="required" htmlFor="identifier">
                Identifier
              </Label>
              {errors?.identifier && <Error>{errors.identifier}</Error>}
              <Input
                type="text"
                required
                placeholder="Enter the identifier for the route"
                value={payload.identifier}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    identifier: e.target.value,
                  }));
                }}
              />
              <Label className="required" htmlFor="tripTime">
                Trip Time
              </Label>
              {errors?.tripTime && <Error>{errors.tripTime}</Error>}
              <Input
                type="number"
                min={1}
                placeholder="Enter the Trip-time for the route"
                value={payload.tripTime}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    tripTime: e.target.value,
                  }));
                }}
              />
              <Label className="required" htmlFor="stops">
                Stops
              </Label>
              {errors?.stops && <Error>{errors.stops}</Error>}
              {payload.stops.map((value, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                  }}
                >
                  <Input
                    type="text"
                    required
                    style={{ flexGrow: "1" }}
                    value={value}
                    placeholder="Enter Stop Name"
                    onChange={(e) => {
                      const s = payload.stops;
                      s[i] = e.target.value;
                      setPayload((payload) => ({
                        ...payload,
                        stops: s,
                      }));
                    }}
                  />
                  {/* <SearchAutocomplete
                    style={{ flexGrow: "1" }}
                    forData="stops"
                    handleCallback={(v) => {
                      const s = payload.stops;
                      s[i] = v;
                      setPayload((payload) => ({
                        ...payload,
                        stops: s,
                      }));
                    }}
                  /> */}
                  <Button
                    className="negative"
                    onClick={(e) => {
                      e.preventDefault();
                      const s = payload.stops;
                      s.splice(i, 1);
                      setPayload((payload) => ({
                        ...payload,
                        stops: s,
                      }));
                    }}
                  >
                    Remove
                  </Button>
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
                    const s = payload.stops;
                    s.push("");
                    setPayload((payload) => ({
                      ...payload,
                      stops: s,
                    }));
                  }}
                >
                  New Stop
                </Button>
              </div>
              {/* schedule */}
              <Label className="required" htmlFor="schedule">
                Departure Time(s)
              </Label>
              {errors?.schedule && <Error>{errors.schedule}</Error>}
              {payload.schedule.map((value, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDiretion: "row-reverse",
                  }}
                >
                  <Input
                    type="time"
                    required
                    value={value}
                    style={{ flexGrow: "1" }}
                    placeholder="Enter Stop Name"
                    onChange={(e) => {
                      const s = payload.schedule;
                      s[i] = e.target.value;
                      setPayload((payload) => ({
                        ...payload,
                        schedule: s,
                      }));
                    }}
                  />
                  <Button
                    className="negative"
                    onClick={(e) => {
                      e.preventDefault();
                      const s = payload.schedule;
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
                    s.push("");
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
                Insert route into database
              </Button>
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
};

export default AddRoute;
