import { useState } from "react";
import adminModel from "../../../globalState/admin";
import Button from "../../common/lib/formElements/button/Button";

export default function Blacklist(props) {
  const [state, setState] = useState(props?.isBlacklisted);
  return (
    <Button
      onClick={async () => {
        const done = await adminModel.blacklistUser({
          userId: props?._id,
          blacklist: !state,
        });
        if (done) setState((state) => !state);
      }}
      className={state ? "positive" : "negative"}
      style={{ ...props.style }}
    >
      {state ? "Whitelist" : "Blacklist"}
    </Button>
  );
}
