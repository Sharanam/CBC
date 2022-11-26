import { useState } from "react";
import adminModel from "../../../globalState/admin";
import Button from "../../common/lib/formElements/button/Button";

export default function SetAdmin(props) {
  const [admin, setAdmin] = useState(props?.type);
  return (
    <Button
      onClick={async () => {
        const newState = /^a/.test(admin) ? "c" : "a";
        const done = await adminModel.setAdmin({
          userId: props?._id,
          admin: newState,
        });
        if (done.success) setAdmin(newState);
      }}
      className={/^a/.test(admin) ? "positive" : "negative"}
      style={{ ...props.style }}
    >
      {/^a/.test(admin) ? "Make Commuter" : "Make Admin"}
    </Button>
  );
}
