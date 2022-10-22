import { useState } from "react";
import { Button, Form, Label } from "./lib/formElements/Index";
import Input from "./lib/formElements/Input";
import { Container } from "./lib/layout/Index";

const SavePassword = () => {
  const [SavePassword, setSavePassword] = useState("");
  return (
    <main>
      <Container size="xs">
        <Form>
          {{
            title: "Save Password",
            formFields: (
              <>
                <Label className="required" htmlFor="Token">
                  Token
                </Label>
                <Input
                  type="Token"
                  placeholder="Enter Token"
                  value={SavePassword}
                  onChange={(e) => {
                    setSavePassword(e.target.value);
                  }}
                />
                <Label className="required" htmlFor="Password">
                  Password
                </Label>
                <Input
                  type="Password"
                  placeholder="Enter Password"
                  value={SavePassword}
                  onChange={(e) => {
                    setSavePassword(e.target.value);
                  }}
                />
                <Label className="required" htmlFor="Confirm Password">
                  Confirm Password
                </Label>
                <Input
                  type="Confirm Password"
                  placeholder="Enter Confirm Password"
                  value={SavePassword}
                  onChange={(e) => {
                    setSavePassword(e.target.value);
                  }}
                />
              </>
            ),
            buttons: (
              <>
                <Button onClick={() => {}} className="positive">
                  Save Password
                </Button>
              </>
            ),
          }}
        </Form>
      </Container>
    </main>
  );
};
export default SavePassword;
