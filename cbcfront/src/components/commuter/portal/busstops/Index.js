import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busStandsModel from "../../../../globalState/busStands";
import {
  Button,
  Form,
  SearchAutocomplete,
} from "../../../common/lib/formElements/Index";
import Container from "../../../common/lib/layout/Container";

const BusStops = (props) => {
  const [stop, setStop] = useState("");
  const [busStands, setBusStands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    busStandsModel.getStands().then((result) => {
      setBusStands(result);
      setIsLoading(false);
    });
  }, []);
  const navigate = useNavigate();
  if (isLoading) return <h3>Loading...</h3>;
  if (props.name) return <>Buses at {props.name}.</>;
  return (
    <Container size="md">
      <Form
        style={{
          ...props.style,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/portal/busstops/${stop}`);
        }}
      >
        {{
          title: "Live Bus Stop",
          formFields: (
            <SearchAutocomplete
              data={busStands}
              injected={stop}
              tabIndex="1"
              handleCallback={(selected) => {
                setStop(selected || "");
              }}
              placeholder="at this busstop"
              style={{ width: "100%" }}
            />
          ),
          buttons: (
            <>
              <Button type="submit" className="positive">
                Live Bus Stop
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default BusStops;
