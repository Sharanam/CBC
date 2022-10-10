import announcementModel from "../../../globalState/announcement";
import { useEffect, useState } from "react";
import { Card } from "../../common/lib/styledElements/Index";
import Container from "../../common/lib/layout/Container";
import getDateInFormat from "../../../utils/getDate";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState(null);
  useEffect(() => {
    announcementModel.getAnnouncements().then((result) => {
      if (result.success) {
        setAnnouncements(result.announcements);
      } else {
        setAnnouncements([{ title: "", description: "" }]);
      }
    });
  }, []);
  return (
    <Container size="sm">
      <h1>Announcements</h1>
      <div
        style={{
          backgroundColor: "var(--white-dark)",
          color: "var(--black)",
          padding: "0.5rem",
          borderRadius: "0.3rem",
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {announcements ? (
          <>
            {announcements?.map((announcement, i) => (
              <Card
                key={i}
                style={{
                  backgroundColor: "var(--tubelight)",
                  color: "currentColor",
                }}
              >
                <p
                  style={{
                    display: "flex",
                  }}
                >
                  <span style={{ flexGrow: 1 }}>{announcement.title}</span>
                  <span
                    style={{
                      fontSize: "0.6em",
                    }}
                  >
                    {getDateInFormat(announcement.createdAt)}
                  </span>
                </p>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.85em",
                    color: "var(--google-gray-700)",
                    paddingLeft: "0.5rem",
                  }}
                >
                  {announcement.description || ""}
                </span>
              </Card>
            ))}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </Container>
  );
};

export default Announcement;
