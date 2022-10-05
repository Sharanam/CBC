import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../globalState/buses";

export default function BusCurrent(props) {
  const regNumber = props?.number || 0;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetch = async () => {
    setIsLoading(true);
    const res = await busesModel.getBus({ busId: regNumber });
    setIsLoading(false);
    if (res.msg) alert(res.msg);
    if (res.success) {
      navigate(-1);
      return;
    }
  };
  useEffect(() => {
    fetch();
  }, [regNumber]);
  if (isLoading) return "Loading";
  return <></>;
}
