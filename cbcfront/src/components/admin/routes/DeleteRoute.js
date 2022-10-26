import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routesModel from "../../../globalState/routes";

export default function DeleteRoute(props) {
  const navigate = useNavigate();
  const deleteRoute = async () => {
    const res = await routesModel.deleteRoute({ routeId: props.route });
    if (res.msg) alert(res.msg);
    if (res.success) {
      navigate(-1);
      return;
    }
  };
  useEffect(() => {
    deleteRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route]);
  return;
}
