import { useEffect, useState } from "react";
import announcementModel from "../../../globalState/announcement";
import { Loading } from "../../common/lib/styledElements/Index";
import CreateAnnouncement from "./Create";
import UnitAnnouncement from "./Unit";

const Announcement = (props) => {
  const [announcements, setAnnouncements] = useState(null);

  const [errors, setErrors] = useState(null);
  async function createAnnouncement(payload) {
    let result = await announcementModel.createAnnouncement(payload);
    if (result.success) {
      setAnnouncements([...announcements, result.announcement]);
      setErrors(null);
    } else {
      setErrors({ ...result.errors });
    }
    return result.success;
  }
  function deleteAnnouncement(payload) {
    announcementModel.deleteAnnouncement(payload).then((result) => {
      if (result.success) {
        const temp = [...announcements];
        temp.splice(
          temp.findIndex((a) => a._id === payload.announcementId),
          1
        );
        setAnnouncements([...temp]);
        setErrors(null);
      }
    });
  }
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
    <>
      <h1
        style={{
          fontSize: "1.6rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Announcements
      </h1>
      {announcements ? (
        <>
          {announcements?.map((announcement, i) => (
            <UnitAnnouncement
              key={i}
              announcement={announcement}
              callback={deleteAnnouncement}
            />
          ))}
        </>
      ) : (
        <Loading />
      )}
      <CreateAnnouncement
        callback={createAnnouncement}
        errors={errors}
        announcements={announcements}
      />
    </>
  );
};
export default Announcement;
