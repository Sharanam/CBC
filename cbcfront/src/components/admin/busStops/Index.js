import { useEffect, useState } from "react";
import busStandsModel from "../../../globalState/busStands";
import Container from "../../common/lib/layout/Container";
import Card from "../../common/lib/styledElements/card/Index";

const BusStops = () => {
  const [busStands, setBusStands] = useState(null);
  useEffect(() => {
    busStandsModel.getStands().then((result) => {
      setBusStands(result);
    });
  }, []);
  return (
    <>
      <Container size="md">
        <h2>Bus Stops</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3em",
          }}
        >
          {busStands &&
            busStands.map((bs, i) => (
              <Card
                key={i}
                style={{
                  backgroundColor: "var(--google-gray-700)",
                  flexGrow: "1",
                }}
              >
                <p>
                  {bs.from} is {bs.distance} KMs away from {bs.to}.
                </p>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.8em",
                  }}
                >
                  Rs. {bs.price}
                </span>
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
};
export default BusStops;
