import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busStandsModel from "../../../globalState/busStands";
import { Container } from "../../common/lib/layout/Index";
import { Card, Loading } from "../../common/lib/styledElements/Index";

const BusStops = () => {
  const [busStands, setBusStands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    busStandsModel.busStandNames().then((result) => {
      setBusStands(result);
      setIsLoading(false);
    });
  }, []);
  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  return (
    <>
      <Container size="sm">
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
                white={true}
                key={i}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/portal/busstops/${bs}`);
                }}
              >
                {bs}
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
};
export default BusStops;
