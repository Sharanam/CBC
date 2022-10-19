import { useCallback, useEffect, useState } from "react";
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

const statuses = [
  "under maintenance",
  "running on time",
  "running late",
  "cancelled",
];

export default function EditBusDetails(props) {
  const regNumber = props?.number;
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    registrationNumber: "Loading...",
    serviceType: "-1",
    capacity: "30",
    status: "Loading...",
  });
  const navigate = useNavigate();

  const fetchBus = useCallback(() => {
    busesModel.getBus(regNumber).then((result) => {
      setPayload({
        registrationNumber:
          result?.bus?.registrationNumber || payload.registrationNumber,
        serviceType: result?.bus?.serviceType ?? payload.serviceType,
        status: result?.bus?.status || payload.status,
        capacity: result?.bus?.capacity || payload.capacity,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchBus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regNumber]);
  return (
    <>
      <Container size="sm">
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const response = await busesModel.editBus({
              ...payload,
              busId: regNumber,
            });
            if (response.msg) alert(response.msg);
            if (response.errors) {
              setErrors({ ...response.errors });
            }
            setIsLoading(false);
            if (response?.success) {
              navigate(-1);
            }
          }}
        >
          {{
            title: "Edit Bus",
            formFields: (
              <>
                <Label className="required" htmlFor="registrationNumber">
                  Registration Number
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
                <Label className="required" htmlFor="capacity">
                  Maximum capacity of the bus
                </Label>
                {errors?.capacity && <Error>{errors.capacity}</Error>}
                <Input
                  type="number"
                  min="15"
                  placeholder="Enter the capacity of the bus"
                  value={payload.capacity}
                  onChange={(e) => {
                    setPayload((payload) => ({
                      ...payload,
                      capacity: e.target.value,
                    }));
                  }}
                />
                <Label htmlFor="status">Status of the bus</Label>
                {errors?.status && <Error>{errors.status}</Error>}
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
                  Update Bus
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
    </>
  );
}
