import { useCallback, useEffect, useState } from "react";
import commutersModel from "../../../globalState/commuter";
import { Container } from "../lib/layout/Index";
import { Loading } from "../lib/styledElements/Index";

const MyContributions = () => {
  const [contributions, setContributions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchContributions = useCallback(() => {
    setIsLoading(true);
    commutersModel.getMyContributions().then((result) => {
      setIsLoading(false);
      if (result.success) setContributions(result.contributions);
      if (result.msg) alert(result.msg);
    });
  }, []);
  useEffect(() => {
    fetchContributions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container size="md">
      <h1>My Contributions</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {JSON.stringify(contributions)}
          <mark>Under Development</mark>
        </>
      )}
    </Container>
  );
};

export default MyContributions;
