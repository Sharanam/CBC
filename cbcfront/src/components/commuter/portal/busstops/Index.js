import { useState } from "react";
import { Button } from "../../../common/lib/formElements/Index";
import SearchAutocomplete from "../../../common/lib/formElements/searchAutocomplete/SearchAutocomplete";
import Container from "../../../common/lib/layout/Container";
import { Card } from "../../../common/lib/styledElements/Index";

const data = [12, 34, "akash", "vadtal"].map((val) => val + "");

const BusStops = () => {
  const [stops, setStops] = useState({ from: "Vadtal", to: "akash" });
  return (
    <Container size="md">
      <Card
        style={{
          backgroundColor: "var(--tubelight)",
          color: "var(--black)",
          textAlign: "center",
        }}
      >
        <h2>Search Buses</h2>
        <Container
          size="xs"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "space-around",
            alignItems: "end",
          }}
        >
          <SearchAutocomplete
            data={data}
            tabIndex="1"
            displayable="name"
            handleCallback={(selected) => {
              setStops({ ...stops, from: selected });
            }}
            style={{
              backgroundColor: "var(--white-dark)",
              borderBottom: "1px solid currentColor",
            }}
            placeholder="from"
          />
          <Button
            className="neutral"
            onClick={() => {
              setStops({ from: stops.to, to: stops.from });
            }}
            tabIndex="3"
          >
            Swap
          </Button>
          <SearchAutocomplete
            tabIndex="2"
            data={data}
            displayable="name"
            handleCallback={(selected) => {
              setStops({ ...stops, to: selected });
            }}
            style={{
              backgroundColor: "var(--white-dark)",
              borderBottom: "1px solid currentColor",
            }}
            placeholder="to"
          />
        </Container>
        <Button className="positive">Search Buses</Button>
      </Card>
    </Container>
  );
};
export default BusStops;
