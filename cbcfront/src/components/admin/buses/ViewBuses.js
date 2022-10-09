import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";
import { Button } from "../../common/lib/formElements/Index";
import { Card } from "../../common/lib/styledElements/Index";
import { BusList } from "./BusList";

const ViewBuses = () => {
  const [buses, setBuses] = useState(null);
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!buses) {
      busesModel.viewBuses().then((result) => {
        if (result.success) setBuses((_) => result.buses);
        if (result.msg) setMsg(() => result.msg);
      });
    }
    return () => {
      setBuses(() => []);
    };
  }, []);

  return (
    <>
      {msg && <Card className="info-message">{msg}</Card>}
      <Button
        className="positive"
        onClick={() => navigate("add")}
        style={{ width: "100%" }}
      >
        New Bus
      </Button>
      <h1>Buses</h1>
      <BusList buses={buses} />
      {/* for each bus, edit bus, delete bus, view bus buttons */}
    </>
  );
};
export default ViewBuses;
