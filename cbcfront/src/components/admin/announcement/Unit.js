import getDateInFormat from "../../../utils/getDate";
import Button from "../../common/lib/formElements/button/Button";
import { Card } from "../../common/lib/styledElements/Index";

const UnitAnnouncement = (props) => {
  const { _id, title, description, createdAt, expireAt } = props.announcement;
  const handleClick = (e) => {
    e.preventDefault();
    props.callback({ announcementId: _id });
  };
  return (
    <div>
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "var(--tubelight)",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "var(--card-bg)",
            fontSize: "1.1em",
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: "var(--google-gray-900)",
            fontSize: "0.8em",
            flexGrow: "1",
          }}
        >
          {description}
          <span
            style={{
              display: "block",
              fontSize: "0.8em",
            }}
          >
            ({getDateInFormat(createdAt)} to {getDateInFormat(expireAt)})
          </span>
        </span>
        <Button
          className="negative"
          onClick={handleClick}
          style={{
            marginBottom: "0",
          }}
        >
          Delete
        </Button>
      </Card>
    </div>
  );
};
export default UnitAnnouncement;
