import { useState } from "react";
import {
  Button,
  Error,
  Form,
  Input,
  Label,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";

const errors = { bus: "no bus found" };
const Bus = (props) => {
  const [busNumber, setBusNumber] = useState("");
  return (
    <Container size="md">
      <Form
        style={{
          ...props.style,
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {{
          title: "Search Specific Bus",
          formFields: (
            <>
              <Label className="required" htmlFor="BusNumber">
                Bus Number
              </Label>
              {errors?.bus && <Error>{errors.bus}</Error>}
              <Input
                type="text"
                placeholder="Enter Bus Number"
                value={busNumber}
                onChange={(e) => {
                  setBusNumber(e.target.value);
                }}
                error="Name require"
              />
            </>
          ),
          buttons: <Button className="positive">Search Bus</Button>,
        }}
      </Form>
    </Container>
  );
};
export default Bus;
