import { useCallback, useEffect, useState } from "react";
import commutersModel from "../../../globalState/commuter";
import { Container } from "../lib/layout/Index";
import { Loading } from "../lib/styledElements/Index";
import { PassPrinter } from "./passPrinter/PassPrinter";

const BusPass = () => {
  const [passes, setPasses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPasses = useCallback(() => {
    setIsLoading(true);
    commutersModel.getMyPasses().then((result) => {
      setIsLoading(false);
      if (result.success) setPasses(result.passes);
      if (result.msg) alert(result.msg);
    });
  }, []);
  useEffect(() => {
    fetchPasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container size="lg">
      <h1>My Bus Passes</h1>
      {isLoading ? <Loading /> : <PassPrinter passes={passes} />}
    </Container>
  );
};
export function isValid(pass) {
  let d = new Date(pass.date);
  if (d > new Date()) return false; // pass is not started yet
  d.setMonth(d.getMonth() + pass.validity);
  if (d < new Date()) return false; // pass is expired
  if (pass.offFor.includes(new Date().getDay())) return false; // pass is off for today
  return true;
}
export default BusPass;
