import { useEffect, useState } from "react";
import busesModel from "../../../globalState/buses";
import { Container } from "../../common/lib/layout/Index";
import { Card } from "../../common/lib/styledElements/Index";

export default function AboutUs() {
  const [buses, setBuses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    busesModel.viewBuses().then((result) => {
      result = result?.buses?.length;
      setBuses(result || 0);
      setIsLoading(false);
    });
  }, []);
  return (
    <Container size="sm">
      <h1>About Us</h1>
      <Card
        style={{
          backgroundColor: "var(--dull-white)",
          color: "var(--dark-blue)",
        }}
      >
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <>
            <Card white={true}>
              We are serving the bus service in the ABC city since{" "}
              <mark className="correct">2012</mark>.
            </Card>
            <Card white={true}>
              Currently, Our <mark className="correct">{buses}</mark> buses are
              running in very well condition.
            </Card>
          </>
        )}
      </Card>
    </Container>
  );
}
