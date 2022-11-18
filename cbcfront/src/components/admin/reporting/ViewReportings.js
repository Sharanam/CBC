import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reportingsModel from "../../../globalState/reporting";
import serviceType from "../../../utils/getBusServiceTypes";
import { Button } from "../../common/lib/formElements/Index";
import Container from "../../common/lib/layout/Container";
import Table from "../../common/lib/layout/table/Index";
import { Card, Loading } from "../../common/lib/styledElements/Index";
import { PassengerCounter } from "./PassengerCounter";

export default function ViewReportings() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportings, setReportings] = useState(null);
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!reportings) {
      setIsLoading(true);
      reportingsModel.getAllReportings().then((result) => {
        setIsLoading(false);
        if (result.success) setReportings(result.reportings);
        if (result.msg) setMsg(result.msg);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container size="lg">
      {msg && <Card className="info-message">{msg}</Card>}
      <Button
        className="positive"
        onClick={() => navigate("add")}
        style={{ width: "100%" }}
      >
        New Reporting
      </Button>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Reportings
      </h1>
      <div
        style={{
          borderRadius: "10px",
          border: "3px solid var(--dark-blue)",
          backgroundColor: "var(--light-blue)",
        }}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          <mark>
            Info: Facility to take data from the 'Bus Conductor Billing Machine'
            will be added in future
          </mark>
        </p>
        <img
          src={"/product-bus-ticket-billing-machine.jpg"}
          alt="product-bus-ticket-billing-machine.jpg"
          style={{
            width: "80%",
            textAlign: "center",
            margin: "0.5em auto",
            display: "block",
          }}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {reportings?.length ? (
            <>
              <Table
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Bus</th>
                    <th>Time</th>
                    <th>Passengers</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {reportings.map((reporting) => (
                    <tr key={reporting._id}>
                      <td>
                        <Link
                          to={`/admin/reports?route=${reporting.route?._id}`}
                        >
                          {reporting.route?.identifier}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/admin/reports?bus=${reporting.bus?._id}`}>
                          {reporting.bus?.registrationNumber} (
                          {serviceType[reporting.bus?.serviceType]})
                        </Link>
                      </td>
                      <td>{reporting.schedule}</td>
                      <PassengerCounter passengers={reporting.passengers} />
                      <td>
                        <Button
                          className="neutral"
                          onClick={() =>
                            navigate(`/admin/reportings/edit/${reporting._id}`)
                          }
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>No data found</p>
          )}
        </>
      )}
    </Container>
  );
}
