import { useState } from "react";
import Table from "../../common/lib/layout/table/Index";

export function PassengerCounter({ passengers }) {
  const [show, setShow] = useState(false);
  return (
    <td
      title={
        passengers
          ?.map((v) => `${v.from} - ${v.to} => ${v.count}`)
          .join("\n") || ""
      }
    >
      <p onClick={() => setShow(!show)}>
        {show ? (
          <Table
            style={{
              width: "100%",
            }}
          >
            <tbody>
              {passengers?.map((v, i) => (
                <tr key={i}>
                  <td>{v.from}</td>
                  <td>{v.to}</td>
                  <td>{v.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          passengers.reduce((acc, cur) => {
            return acc + cur.count;
          }, 0)
        )}
      </p>
    </td>
  );
}
