import { Card } from "../../common/lib/styledElements/Index";

export function FavoriteViewer({ route }) {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Favorites
      </h2>
      <Card
        style={{
          backgroundColor: "var(--light-blue)",
          color: "var(--black)",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        {route?.map((r, key) => (
          <Card
            key={key}
            style={{
              backgroundColor: "var(--white)",
              color: "var(--black)",
            }}
          >
            {r?.identifier}
          </Card>
        ))}
      </Card>
    </>
  );
}
