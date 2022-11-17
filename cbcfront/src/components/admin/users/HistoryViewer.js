import serviceType from "../../../utils/getBusServiceTypes";
import getDateInFormat from "../../../utils/timekeeper";
import Table from "../../common/lib/layout/table/Index";
import { Card } from "../../common/lib/styledElements/Index";

export function HistoryViewer({ bus, route }) {
  return (
    <>
      <Card white={true}>
        <h2>Bus</h2>
        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <Table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Bus Service</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bus?.map((b, k) => (
                <tr key={k}>
                  <td>{b?.busId?.registrationNumber}</td>
                  <td>{serviceType[b?.busId?.serviceType]}</td>
                  <td>{getDateInFormat(b?.time, { counter: true })}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
      <Card white={true}>
        <h2>Route</h2>
        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <Table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {route?.map((r, k) => (
                <tr key={k}>
                  <td>{r?.routeId?.identifier}</td>
                  <td>{getDateInFormat(r?.time, { counter: true })}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
}
