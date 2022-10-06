import { Link } from "react-router-dom";
import { Button } from "../../common/lib/formElements/Index";

export default function IssuePass(props) {
  return (
    <Link
      to={`/admin/user/${props.id}`}
      style={{
        color: props.visibility ? "var(--light-blue)" : "var(--danger)",
      }}
    >
      <Button className="neutral">{props.children}</Button>
    </Link>
  );
}
