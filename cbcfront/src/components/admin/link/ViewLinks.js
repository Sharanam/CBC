import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import linksModel from "../../../globalState/links";
import routesModel from "../../../globalState/routes";
import { Button } from "../../common/lib/formElements/Index";
import { Card } from "../../common/lib/styledElements/Index";
import LinkForm from "./LinkForm";

function ListLinks(props) {
  return (
    <>
      {props?.links?.map((link, key) => (
        <Card
          white={true}
          key={key}
          style={{
            width: "50vw",
          }}
        >
          {JSON.stringify(link)}
        </Card>
      ))}
    </>
  );
}
export default function ViewLinks() {
  const [searchParams] = useSearchParams();
  const routeId = searchParams.get("routeId");
  const routeName = searchParams.get("name");

  const navigate = useNavigate();

  const [openForm, setOpenForm] = useState(true);

  const [links, setLinks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchLinks = async () => {
    const res = await linksModel.getRouteSpecificLinks(routeId);
    // if (res.msg) alert(res.msg);
    if (res.links) {
      setLinks(res.links);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!routeId) navigate(-1);
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId]);
  return (
    <>
      <h1>Buses on route {routeName}</h1>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {openForm ? (
            <LinkForm
              route={routeId}
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
              Assign Bus into {routeName}
            </Button>
          )}
          <ListLinks links={links} />
        </>
      )}
    </>
  );
}
