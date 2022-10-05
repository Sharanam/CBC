import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";

export default function DeleteBus(props) {
  const navigate = useNavigate();
  const fetch = async () => {
    const res = await busesModel.deleteBus({ busId: props.id });
    if (res.msg) alert(res.msg);
    if (res.success) {
      navigate(-1);
      return;
    }
  };
  useEffect(() => {
    fetch();
  }, [props.id]);
  return;
}
