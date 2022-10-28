import { Button } from "../common/lib/formElements/Index";
import { Container } from "../common/lib/layout/Index";
import { Card } from "../common/lib/styledElements/Index";

export default function RouteSelection({ routes, onClick, selected }) {
  return (
    <Container size="md">
      <Card
        white={true}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          gap: "0.5em",
          justifyContent: "stretch",
        }}
      >
        {routes?.map((route, key) => (
          <RouteBox
            key={key}
            selected={selected === route}
            identifier={route}
            onClick={() => {
              onClick(route);
            }}
          />
        ))}
      </Card>
    </Container>
  );
}

export function RouteBox({ identifier, onClick, selected }) {
  return (
    <Button className={selected ? "positive" : "neutral"} onClick={onClick}>
      {identifier}
    </Button>
  );
}
