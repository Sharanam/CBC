import { useCallback, useEffect, useState } from "react";
import commutersModel from "../../../globalState/commuter";
import { Container } from "../lib/layout/Index";
import { Loading } from "../lib/styledElements/Index";

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
    <Container size="sm">
      <h1>My Bus Passes</h1>
      {isLoading ? <Loading /> : <>{JSON.stringify(passes)}</>}
    </Container>
  );
};
export default BusPass;
