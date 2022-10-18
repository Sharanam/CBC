import { useEffect, useState } from "react";
import busStandsModel from "../../../globalState/busStands";
import { Container } from "../../common/lib/layout/Index";
import { Card } from "../../common/lib/styledElements/Index";

const BusStops = () => {
  const [busStands, setBusStands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    busStandsModel.getStands().then((result) => {
      setBusStands(result);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <h2>Loading...</h2>;
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
          {busStands && busStands.map((bs, i) => <Card key={i}>{bs}</Card>)}
        </div>
      </Container>
    </>
  );
};
export default BusStops;
