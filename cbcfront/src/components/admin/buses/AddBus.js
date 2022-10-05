import { useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";
import {
  Input,
  Label,
  Form,
  Error,
  Button,
  DropDown,
} from "../../common/lib/formElements/Index";
import { Container } from "../../common/lib/layout/Index";
import Divider from "../../common/lib/styledElements/Divider";

const statuses = [
  "under maintenance",
  "running on time",
  "running late",
  "cancelled",
];

const AddBus = (props) => {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    registrationNumber: "GJ ",
    serviceType: "0",
    status: statuses[0],
  });
  const navigate = useNavigate();
  return (
    <Container size="sm">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const response = await busesModel.addBus(payload);
          if (response.errors) {
            setErrors({ ...response.errors });
          }
          setIsLoading(false);
          if (response?.success) {
            alert("bus added successfully");
            navigate("/admin/buses");
          } else {
            alert("Something is erroneous in the data");
          }
        }}
      >
        {{
          title: "New Bus into Database",
          formFields: (
            <>
              {/* <Label htmlFor="routeIdentifier">Chosen Route</Label>
              <Input
                type="text"
                placeholder="Enter current routeIdentifier of the bus"
                value={payload.routeIdentifier}
                readOnly={true}
              />
              <Divider /> */}
              <Label className="required" htmlFor="registrationNumber">
                Registraion Number
              </Label>
              {errors?.registrationNumber && (
                <Error>{errors.registrationNumber}</Error>
              )}
              <Input
                type="text"
                placeholder="Enter registration number of the bus"
                value={payload.registrationNumber}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    registrationNumber: e.target.value,
                  }));
                }}
              />
              <Label className="required" htmlFor="serviceType">
                Type of Bus Service (Facilities)
              </Label>
              {errors?.serviceType && <Error>{errors.serviceType}</Error>}
              <Input
                type="number"
                min="0"
                max="2"
                placeholder="Enter type of the bus"
                value={payload.serviceType}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    serviceType: e.target.value,
                  }));
                }}
              />
              <Label htmlFor="status">Status of the bus</Label>
              {errors?.status && <Error>{errors.status}</Error>}
              {/* <Input
                type="text"
                placeholder="Enter current status of the bus"
                value={payload.status}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    status: e.target.value,
                  }));
                }}
              /> */}
              <DropDown
                options={statuses}
                default={payload.status}
                onChange={(value) => {
                  setPayload((payload) => ({ ...payload, status: value }));
                }}
              />
            </>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive" disabled={isLoading}>
                Insert bus into database
              </Button>
              <Button
                type="reset"
                className="negative"
                disabled={isLoading}
                onClick={(e) => {
                  props.onCancle();
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
export default AddBus;
