import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";
import { BusList } from "./BusList";

export default function ForSpecificRoute(props) {
  const route = props.route;
  const navigate = useNavigate();
  useEffect(() => {
    if (!route) navigate("/admin/buses");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const [buses, setBuses] = useState(null);
  const fetchBuses = useCallback(() => {
    busesModel.getBuses(route).then((result) => {
      if (result.success) setBuses(result.buses);
      if (result.msg) alert(result.msg);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  return (
    <>
      <BusList buses={buses} />
    </>
  );
}
