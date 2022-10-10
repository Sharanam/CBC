import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../common/lib/formElements/Form";
import {
  Button,
  Error,
  Input,
  Label,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";

function BusList(props) {
  return <>{props.i}</>;
}

const SpecificRoute = (props) => {
  const [routeNumber, setRouteNumber] = useState(props.identifier || "");
  const navigate = useNavigate();
  if (props.identifier) {
    return <BusList i={props.identifier} />;
  }
  return (
    <Container size="md">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/portal/routes/${routeNumber}`);
        }}
        margin="unset"
      >
        {{
          title: "Search Specific Route",
          formFields: (
            <>
              <Label className="required" htmlFor="Route">
                Route Number
              </Label>
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
export default SpecificRoute;
