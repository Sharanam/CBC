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

  const navigate = useNavigate();

  const [openForm, setOpenForm] = useState(false);

  const [links, setLinks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchLinks = async () => {
    const res = await linksModel.getRouteSpecificLinks(routeId);
    if (res.msg) alert(res.msg);
    if (res.links) {
      setLinks(res.links);
      setIsLoading(false);
      setMsg(`${res?.links?.length} bus(es) found on route ${routeName}`);
    }
  };

  useEffect(() => {
    if (props.task) {
      return;
    }
    if (!routeId) navigate(-1);
    fetchLinks();
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
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {openForm ? (
              <InsertLinkForm
                route={routeName}
                bus={bus}
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
                {routeName
                  ? `Assign Bus into ${routeName}`
                  : `Assign route to ${bus}`}
              </Button>
            )}
            <LinkCards links={links} />
          </>
        )}
      </>
    );
}
