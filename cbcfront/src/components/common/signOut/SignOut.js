import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FlagContext } from "../../../context/Flag";
import userModel from "../../../globalState/user";

function SignOut() {
  const { signOut } = userModel;
  signOut(userModel);

  const [flag, setFlag] = useContext(FlagContext);

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
    return () => setFlag(Date.now());
  });

  return;
  //  <Navigate to="/" replace={true} />;
}

export default SignOut;
