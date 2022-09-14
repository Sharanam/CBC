import { useState } from "react";
import Button from "../../common/lib/formElements/button/Button";
import Error from "../../common/lib/formElements/Error";
import Form from "../../common/lib/formElements/Form";
import Input from "../../common/lib/formElements/Input";
import Label from "../../common/lib/formElements/label/Label";
import Container from "../../common/lib/layout/Container";

const CreateAnnouncement = (props) => {
  const { errors } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (await props.callback(payload))
      setPayload({ title: "", description: "" });
    setIsLoading(false);
  };
  return (
    <Container size="xs">
      <Form onSubmit={handleSubmit}>
        {{
          title: "New Announcement",
          formFields: (
            <>
              <Label className="required" htmlFor="title">
                Title
              </Label>
              {errors?.title && <Error>{errors.title}</Error>}
              <Input
                type="text"
                placeholder="Enter Title"
                value={payload.title}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    title: e.target.value,
                  }));
                }}
              />
              <Label htmlFor="description">Description</Label>
              {errors?.description && <Error>{errors.description}</Error>}
              <Input
                type="text"
                placeholder="Enter Description"
                value={payload.description}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    description: e.target.value,
                  }));
                }}
              />
            </>
          ),
          buttons: (
            <>
              <Button type="submit" className="positive" disabled={isLoading}>
                Announce It
              </Button>
              <Button
                className="neutral"
                onClick={(e) => {
                  e.preventDefault();
                  setPayload({
                    title: "",
                    description: "",
                  });
                }}
              >
                Clear
              </Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default CreateAnnouncement;
