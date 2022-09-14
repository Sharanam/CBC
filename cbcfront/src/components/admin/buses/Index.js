import AddBus from "./AddBus";

const Bus = () => {
  function addBus(payload) {
    // announcementModel.createAnnouncement(payload).then((result) => {
    //   if (result.success) {
    //     setAnnouncements([...announcements, result.announcement]);
    //     setErrors(null);
    //   } else {
    //     setErrors({ ...result.errors });
    //   }
    //   return result.success;
    // });
  }
  return (
    <>
      <h3 style={{ textAlign: "center", color: "var(--danger)" }}>
        <mark>Under development</mark>
      </h3>
      <h1>Buses</h1>
      {/* <AddBus callback={addBus} /> */}
    </>
  );
};
export default Bus;
