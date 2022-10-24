import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../../globalState/buses";
import {
  Button,
  Form,
  Label,
  SearchAutocomplete,
} from "../../../common/lib/formElements/Index";
import { Container } from "../../../common/lib/layout/Index";
import { Loading } from "../../../common/lib/styledElements/Index";
import BusView from "./BusView";
const Bus = (props) => {
  const [busNumber, setBusNumber] = useState(props.regNumber || "");
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (props.regNumber) return;
    setIsLoading(true);
    busesModel.viewBuses().then((result) => {
      result = result?.buses?.map((v) => v.registrationNumber);
      setBuses(result);
      setIsLoading(false);
    });
  }, [props.regNumber]);
  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  if (props.regNumber) return <BusView number={busNumber} />;
  return (
    <Container size="md">
      <Form
        style={{
          ...props.style,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/portal/buses/${busNumber}`);
        }}
      >
        {{
          title: "Search Specific Bus",
          formFields: (
            <>
              <Label className="required" htmlFor="BusNumber">
                Bus Number
              </Label>
              <SearchAutocomplete
                data={buses}
                handleCallback={(selected) => {
                  setBusNumber(selected || "");
                }}
                placeholder="Enter Bus Number"
                style={{ width: "100%" }}
              />
            </>
          ),
          buttons: (
            <Button type="submit" className="positive">
              Search Bus
            </Button>
          ),
        }}
      </Form>
    </Container>
  );
};
export default Bus;
