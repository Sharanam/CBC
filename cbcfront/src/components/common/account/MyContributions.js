import { useCallback, useEffect, useState } from "react";
import commutersModel from "../../../globalState/commuter";
import { Container } from "../lib/layout/Index";

const MyContributions = () => {
  const [contributions, setContributions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchConti = useCallback(() => {
    setIsLoading(true);
    commutersModel.getMyContribution().then((result) => {
      setIsLoading(false);
      if (result.success) setContributions(result.contributions);
      if (result.msg) alert(result.msg);
    });
  }, []);
  useEffect(() => {
    fetchConti();
  }, []);
  return (
    <Container size="md">
      <h1>My Contributions</h1>
      {isLoading ? (
        <h3>Loading...</h3>
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
