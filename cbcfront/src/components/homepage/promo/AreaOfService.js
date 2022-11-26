import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busStandsModel from "../../../globalState/busStands";
import { Container } from "../../common/lib/layout/Index";
import { Card, Loading } from "../../common/lib/styledElements/Index";

const AreaOfService = () => {
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
      <h1>Area of Services</h1>
      <Container size="sm">
        <Card
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3em",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "var(--dull-white)",
            color: "var(--dark-blue)",
          }}
        >
          {busStands &&
            busStands.map((bs, i) => (
              <Card
                key={i}
                white={true}
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
        </Card>
      </Container>
    </>
  );
};
export default AreaOfService;
