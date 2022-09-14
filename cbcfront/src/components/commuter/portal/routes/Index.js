import { useState } from "react";
import Form from "../../../common/lib/formElements/Form";
import {
  Button,
  Error,
  Input,
  Label,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";

const errors = {};
const Routes = (props) => {
  const [routeNumber, setRouteNumber] = useState("");
  return (
    <Container size="md">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{
          ...props.style,
        }}
      >
        {{
          title: "Search Specific Route",
          formFields: (
            <>
              <Label className="required" htmlFor="Route">
                Route Number
              </Label>
              {errors?.route && <Error>{errors.route}</Error>}
              <Input
                type="text"
                placeholder="Enter Route Number"
                value={routeNumber}
                onChange={(e) => {
                  setRouteNumber(e.target.value);
                }}
                error="Name require"
              />
            </>
          ),
          buttons: <Button className="positive">Look Route</Button>,
        }}
      </Form>
    </Container>
  );
};
export default Routes;
