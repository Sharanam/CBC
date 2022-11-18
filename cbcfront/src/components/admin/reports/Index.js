import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import reportingsModel from "../../../globalState/reporting";
import { Loading } from "../../common/lib/styledElements/Index";
import serviceType from "../../../utils/getBusServiceTypes";
import { PassengerCounter } from "../reporting/PassengerCounter";
import Table from "../../common/lib/layout/table/Index";
import getDateInFormat from "../../../utils/timekeeper";

export default function Reports(props) {
  const [searchParams] = useSearchParams();
  const bus = searchParams.get("bus");
  const route = searchParams.get("route");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (bus) {
      reportingsModel.getBusSpecificReportings(bus).then((result) => {
        setIsLoading(false);
        if (result.success) setData(result.reportings);
      });
    } else if (route) {
      reportingsModel.getRouteSpecificReportings(route).then((result) => {
        setIsLoading(false);
        if (result.success) setData(result.reportings);
      });
    } else if (bus && route) {
      reportingsModel.getRouteBusReportings(route, bus).then((result) => {
        setIsLoading(false);
        if (result.success) setData(result.reportings);
      });
    } else {
      reportingsModel.getAllReportings().then((result) => {
        setIsLoading(false);
        if (result.success) setData(result.reportings);
      });
    }
  }, [bus, route]);
  if (isLoading) return <Loading />;

  let title;
  if (bus && route) {
    title = `Bus: ${data[0]?.bus?.registrationNumber} (
        ${serviceType[data[0]?.bus?.serviceType]}) on Route: ${
      data[0]?.route?.identifier
    }`;
  } else if (route) {
    title = `Route: ${data[0]?.route?.identifier}`;
  } else if (bus) {
    title = `Bus: ${data[0]?.bus?.registrationNumber} (
        ${serviceType[data[0]?.bus?.serviceType]})`;
  } else {
    title = "All the Reportings";
  }
  return (
    <>
      <h3>{title}</h3>
      <p
        style={{
          textAlign: "center",
        }}
      >
        <mark>
          Info: Facility to preview graph based on this data will be added in
          future
        </mark>
      </p>
      <Table
        style={{
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            {bus ? null : <th>Bus</th>}
            {route ? null : <th>Route</th>}
            <th>Passengers</th>
            <th>Reporting Date</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr key={i}>
              {bus ? null : (
                <td>
                  <Link to={`/admin/reports?bus=${v.bus?._id}`}>
                    {v.bus?.registrationNumber} (
                    {serviceType[v.bus?.serviceType]})
                  </Link>
                </td>
              )}
              {route ? null : (
                <td>
                  <Link to={`/admin/reports?route=${v.route?._id}`}>
                    {v.route?.identifier}
                  </Link>
                </td>
              )}
              <PassengerCounter passengers={v.passengers} />
              <td>{getDateInFormat(v.createdAt)}</td>
              <td>{v.schedule}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
