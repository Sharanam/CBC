import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Label,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";
import BusCurrent from "./Bus";
const Bus = (props) => {
  const [busNumber, setBusNumber] = useState(props.regNumber || "");
  const navigate = useNavigate();
  if (props.regNumber) return <BusCurrent number={busNumber} />;
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
              <Input
                type="text"
                placeholder="Enter Bus Number"
                value={busNumber}
                onChange={(e) => {
                  setBusNumber(e.target.value);
                }}
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
