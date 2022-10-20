import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import linksModel from "../../../globalState/links";
import { Button } from "../../common/lib/formElements/Index";
import InsertLinkForm from "./InsertLinkForm";
import EditLinkForm from "./EditLinkForm";
import DeleteLink from "./DeleteLink";
import { LinkCards } from "./LinkCards";
import { Card } from "../../common/lib/styledElements/Index";

export default function ViewLinks(props) {
  const [searchParams] = useSearchParams();
  const routeId = searchParams.get("routeId");
  const routeName = searchParams.get("name");
  const bus = searchParams.get("bus");
  const busNumber = searchParams.get("busNumber");

  const navigate = useNavigate();

  const [openForm, setOpenForm] = useState(false);

  const [links, setLinks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchLinks = async ({ routeId, bus }) => {
    let res;
    if (routeId) res = await linksModel.getRouteSpecificLinks(routeId);
    else if (bus) res = await linksModel.getBusSpecificLinks(busNumber);
    if (res?.msg) alert(res?.msg);
    if (res?.links) {
      setLinks(res?.links);
      setIsLoading(false);
      setMsg(`${res?.links?.length} bus(es) found on route ${routeName}`);
    }
  };

  useEffect(() => {
    if (props.task) {
      return;
    }
    if (!routeId && !bus && !busNumber && !routeName) navigate(-1);
    fetchLinks({ routeId, bus });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId]);

  const [msg, setMsg] = useState(null);

  if (props?.task === "delete") {
    return <DeleteLink link={props.link} />;
  } else if (props?.task === "edit") {
    return (
      <EditLinkForm
        onCancel={() => {
          navigate(-1);
        }}
        link={props?.link}
      />
    );
  } else
    return (
      <>
        {routeId ? (
          <>
            <h1>Buses on route {routeName}</h1>
            {msg && (
              <Card
                className="info-message"
                style={{
                  textTransform: "unset",
                }}
              >
                {msg}
              </Card>
            )}
          </>
        ) : (
          <h1>Link the bus</h1>
        )}
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <>
              {openForm ? (
                <InsertLinkForm
                  route={routeName || routeId}
                  bus={busNumber || bus}
                  onCancel={() => {
                    setOpenForm(false);
                  }}
                />
              ) : (
                <Button
                  style={{ width: "100%" }}
                  className="positive"
                  onClick={() => setOpenForm(true)}
                >
                  {routeId || routeName
                    ? `Assign Bus into ${routeName}`
                    : `Schedule the bus (${busNumber || bus})`}
                </Button>
              )}
            </>

            {links?.length ? (
              <LinkCards links={links} />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--danger)",
                  margin: "3em 0",
                }}
              >
                <h3>Nothing to display</h3>
              </div>
            )}
          </>
        )}
      </>
    );
}
