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
          title: "Search Buses",
          formFields: (
            <Container size="sm">
              <SearchAutocomplete
                data={busStands}
                injected={stop}
                tabIndex="1"
                handleCallback={(selected) => {
                  setStop(selected || "");
                }}
                placeholder="at this busstop"
              />
            </Container>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive">
                Search Buses
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default BusStops;
