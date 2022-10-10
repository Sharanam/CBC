import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routesModel from "../../../../globalState/routes";
import Form from "../../../common/lib/formElements/Form";
import {
  Button,
  DropDown,
  Error,
  Input,
  Label,
  SearchAutocomplete,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";

function BusList(props) {
  return <>{props.i}</>;
}

const SpecificRoute = (props) => {
  const [routeNumber, setRouteNumber] = useState(props.identifier || "");
  const [routes, setRoutes] = useState([]);
  const fetchRoutes = useCallback(() => {
    routesModel.getAllRoutes().then((result) => {
      setRoutes(result.routes.map((a) => a.identifier));
    });
  }, []);
  useEffect(() => {
    fetchRoutes();
  }, [props.identifier]);
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
          title: "Select Route",
          formFields: (
            <>
              <Label className="required" htmlFor="Route">
                Route Number
              </Label>
              <SearchAutocomplete
                style={{ width: "100%" }}
                data={routes}
                handleCallback={(selected) => {
                  setRouteNumber(selected);
                }}
                placeholder="Route Identifier"
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
