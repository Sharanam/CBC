import { Label, Input } from "../lib/formElements/Index";
import { Divider } from "../lib/styledElements/Index";

const Contact = () => {
  return (
    <>
      <h2>Contact</h2>
      <Label>Name</Label>
      <Input readOnly={true} type="password" />
      {/* <Divider vertical={true} /> */}
    </>
  );
};
export default Contact;
