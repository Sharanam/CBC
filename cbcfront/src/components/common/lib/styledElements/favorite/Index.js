import { Button } from "../../formElements/Index";

export default function Favorite({ liked, onClick }) {
  return (
    <Button
      className={liked ? "negative" : "positive"}
      onClick={() => onClick(liked ? "remove" : "add")}
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "stretch",
        gap: "0.5em",
      }}
    >
      {liked ? "Remove Favorite" : "Add to Favorites"}
      <img
        style={{
          height: "1.3em",
          display: "inline-block",
        }}
        src="/heart.svg"
        alt=""
      />
    </Button>
  );
}
