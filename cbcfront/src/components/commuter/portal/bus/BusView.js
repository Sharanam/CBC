import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesModel from "../../../../globalState/buses";
import { Loading } from "../../../common/lib/styledElements/Index";
import { BusRunner } from "./BusRunner";

export default function BusView(props) {
  const regNumber = props?.number || 0;
  const [isLoading, setIsLoading] = useState(true);
  const [busDetails, setBusDetails] = useState(null);
  const navigate = useNavigate();
  const fetchBus = async () => {
    setIsLoading(true);
    const res = await busesModel.getLiveBus(regNumber, { live: true });
    if (res.msg) {
      alert(res.msg);
      navigate(-1);
    }
    setBusDetails(res.link || {});
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regNumber]);
  if (isLoading) return <Loading />;
  if (busDetails)
    return (
      <>
        {busDetails?.schedule?.length === 0 ? (
          <h2>Nothing to display</h2>
        ) : (
          <BusRunner busDetails={busDetails} />
        )}
      </>
    );
  return <h1>Something is wrong</h1>;
}
