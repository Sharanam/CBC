import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linksModel from "../../../globalState/links";

export default function DeleteLink(props) {
  const navigate = useNavigate();
  const deleteBus = async () => {
    const res = await linksModel.deleteLink({ _id: props.link });
    if (res.msg) alert(res.msg);
    if (res.success) {
      navigate(-1);
      return;
    }
  };
  useEffect(() => {
    deleteBus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.link]);
  return;
}
