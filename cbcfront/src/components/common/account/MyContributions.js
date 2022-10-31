import { useCallback, useEffect, useState } from "react";
import commutersModel from "../../../globalState/commuter";
import serviceType from "../../../utils/getBusServiceTypes";
import { toTimeFrom } from "../../../utils/timekeeper";
import { Container } from "../lib/layout/Index";
import Table from "../lib/layout/table/Index";
import { Card, Loading } from "../lib/styledElements/Index";
function divider(s) {
  s = s.split(",").map((v) => v.toString().trim());
  return (
    <>
      <span
        style={{
          display: "block",
        }}
      >
        {s[0]}
      </span>
      <span
        style={{
          display: "block",
        }}
      >
        {s[1]}
      </span>
    </>
  );
}

const MyContributions = () => {
  const [contributions, setContributions] = useState([]);
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
          {contributions.length ? (
            <Card white={true}>
              <Table>
                <thead>
                  <td>bus (type)</td>
                  <td>route (schedule)</td>
                  <td>stop</td>
                  <td>time</td>
                  <td>message</td>
                </thead>
                <tbody>
                  {contributions.map((contribution, key) => (
                    <tr key={key}>
                      <td>
                        <span
                          style={{
                            textTransform: "uppercase",
                            display: "inline-block",
                          }}
                        >
                          {contribution?.bus?.registrationNumber}
                        </span>{" "}
                        <span
                          style={{
                            fontSize: "0.8em",
                            display: "inline-block",
                          }}
                        >
                          ({serviceType[contribution?.bus?.serviceType]})
                        </span>
                      </td>
                      <td>
                        {contribution?.route?.identifier} (
                        {toTimeFrom(contribution?.createdAfter)})
                      </td>
                      <td>{contribution?.stop}</td>
                      <td>
                        {divider(
                          new Date(
                            contribution?.updatedAt || ""
                          )?.toLocaleString()
                        )}
                      </td>
                      <td
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {contribution?.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          ) : (
            <Card white={true}>
              <p>You have 0 contributions yet.</p>
              <p>
                Search the bus in which you want to go and let everyone else
                know what the current status of that bus is.
              </p>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default MyContributions;
