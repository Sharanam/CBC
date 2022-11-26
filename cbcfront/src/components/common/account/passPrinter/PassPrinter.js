import { useState } from "react";
import adminModel from "../../../../globalState/admin";
import getDateInFormat from "../../../../utils/timekeeper";
import { Button } from "../../lib/formElements/Index";
import Table from "../../lib/layout/table/Index";
import { Card, Loading } from "../../lib/styledElements/Index";
import { isValid } from "../BusPass";
import "./style.css";

export function PassPrinter({ passes, admin, user, onDelete, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) <Loading />;
  return passes?.length ? (
    <Card white={true}>
      <Table className="pass">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Period</th>
            <th>Off For</th>
            <th>Price</th>
            <th>Validity</th>
            {admin ? (
              <>
                <th>Update</th>
                <th>Delete</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {passes.map((pass, index) => (
            <tr key={index}>
              <td>{pass.from}</td>
              <td>{pass.to}</td>
              <td>
                {getDateInFormat(pass.date)} -{" "}
                {getDateInFormat(
                  new Date(
                    new Date(pass.date).setMonth(
                      new Date(pass.date).getMonth() + pass.validity
                    )
                  )
                )}
              </td>
              <td>
                {pass.offFor
                  .map(
                    (v) =>
                      [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][v]
                  )

                  .join(", ")}
              </td>
              <td>{pass.price}</td>
              <td>
                {isValid(pass) ? (
                  "Valid"
                ) : (
                  <span
                    style={{
                      color: "var(--danger)",
                    }}
                  >
                    Not Valid
                  </span>
                )}
              </td>
              {admin ? (
                <>
                  <td>
                    <Button
                      className="neutral"
                      onClick={(e) => {
                        onUpdate(pass._id);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="negative"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        adminModel
                          .deletePass({ _id: pass._id, user })
                          .then((res) => {
                            setIsLoading(false);
                            if (res.success) {
                              onDelete(pass._id);
                            }
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  ) : (
    <p>No Pass Found</p>
  );
}
