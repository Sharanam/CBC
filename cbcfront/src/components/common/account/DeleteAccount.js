import userModel from "../../../globalState/user";
import { Button, Label } from "../lib/formElements/Index";
import { Container } from "../lib/layout/Index";
import Card from "../lib/styledElements/card/Index";

const DeleteAccount = () => {
  return (
    <Container>
      <Card
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "var(--white)",
          color: "var(--black)",
          gap: "0.5rem",
        }}
      >
        <Label>Delete this account permanently !!!</Label>
        <Button
          className="negative"
          onClick={() => {
            if (
              prompt(
                'Please write "Delete My Account" without double quotes'
              ) === "Delete My Account"
            ) {
              userModel.deleteAccount().then((res) => {
                if (res) window.location.href = "/logout";
              });
            } else {
              alert("Mismatched !!");
            }
          }}
        >
          Delete My Account
        </Button>
      </Card>
    </Container>
  );
};
export default DeleteAccount;
