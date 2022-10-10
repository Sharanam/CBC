import { useCallback, useEffect, useState } from "react";
import commutersModel from "../../../globalState/commuter";
import { Container } from "../lib/layout/Index";

const BusPass = () => {
  const [passes, setPasses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchConti = useCallback(() => {
    setIsLoading(true);
    commutersModel.getMyPasses().then((result) => {
      setIsLoading(false);
      if (result.success) setPasses(result.passes);
      if (result.msg) alert(result.msg);
    });
  }, []);
  useEffect(() => {
    fetchConti();
  }, []);
  return (
    <Container size="sm">
      <h1>My Bus Passes</h1>
      {isLoading ? <h3>Loading...</h3> : <>{JSON.stringify(passes)}</>}
    </Container>
  );
};
export default BusPass;
