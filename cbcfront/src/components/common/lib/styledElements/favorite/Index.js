import { Button } from "../../formElements/Index";

export default function Favorite({ liked, onClick }) {
  return (
    <Button className={liked ? "negative" : "positive"} onClick={onClick}>
      {liked ? "Dislike" : "Like"}
      <img style={{ display: "inline-box" }} src="/heart.svg" alt="" />
      {/* use absolute position and give some padding
      put down, right, top 0 */}
    </Button>
  );
}
