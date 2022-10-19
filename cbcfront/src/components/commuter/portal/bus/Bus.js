import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../../globalState/buses";
import { Card } from "../../../common/lib/styledElements/Index";

export default function BusCurrent(props) {
  const regNumber = props?.number || 0;
  const [isLoading, setIsLoading] = useState(true);
  const [busDetails, setBusDetails] = useState(null);
  const navigate = useNavigate();
  const fetchBus = async () => {
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
    fetchBus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regNumber]);
  if (isLoading) return "Loading...";
  return (
    <>
      <Card white={true}>
        {Object.keys(busDetails).map((d, i) => {
          return (
            <p key={i}>
              {d}: <b>{JSON.stringify(busDetails[d])}</b>
            </p>
          );
        })}
      </Card>
    </>
  );
}
