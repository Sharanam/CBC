import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../../globalState/buses";

export default function BusCurrent(props) {
  const regNumber = props?.number || 0;
  const [isLoading, setIsLoading] = useState(true);
  const [busDetails, setBusDetails] = useState(null);
  const navigate = useNavigate();
  const fetch = async () => {
    setIsLoading(true);
    const res = await busesModel.getBus(regNumber);
    if (res.msg) {
      alert(res.msg);
      navigate(-1);
    }
    setBusDetails(res.bus);
    setIsLoading(false);
  };
  useEffect(() => {
    fetch();
  }, [regNumber]);
  if (isLoading) return "Loading...";
  return <>{JSON.stringify(busDetails)}</>;
}
