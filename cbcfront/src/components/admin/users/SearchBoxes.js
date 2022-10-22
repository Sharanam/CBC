import { Button, Input } from "../../common/lib/formElements/Index";

export default function SearchBoxes(props) {
  return (
    <div
      style={{
        margin: "1em auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--dull-white)",
        flexWrap: "row nowrap",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: "1rem",
      }}
    >
      <Input
        style={{ flexGrow: "1" }}
        type="email"
        autoFocus
        placeholder="Enter email of an user"
        value={props.data.email}
        onChange={(e) => {
          props.setData((payload) => ({
            ...payload,
            email: e.target.value,
          }));
        }}
      />
      <Input
        style={{ flexGrow: "1" }}
        type="text"
        placeholder="Enter name of an user"
        value={props.data.name}
        onChange={(e) => {
          props.setData((payload) => ({
            ...payload,
            name: e.target.value,
          }));
        }}
      />
      <Button
        className="neutral"
        onClick={(e) => {
          e.preventDefault();
          props.setData({ email: "", name: "" });
        }}
      >
        Clear
      </Button>
      <Button
        className="negative"
        style={{ flexShrink: "1" }}
        onClick={(e) => {
          e.preventDefault();
          props.onHide();
        }}
      >
        Hide
      </Button>
    </div>
  );
}
