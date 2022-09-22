import { useState } from "react";
import Button from "../../common/lib/formElements/button/Button";
import Error from "../../common/lib/formElements/Error";
import Form from "../../common/lib/formElements/Form";
import Input from "../../common/lib/formElements/Input";
import Label from "../../common/lib/formElements/label/Label";
import Container from "../../common/lib/layout/Container";

const tomorrow = new Date(+new Date() + 86400000).toLocaleDateString("en-CA");
const CreateAnnouncement = (props) => {
  const { errors } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    title: "new vala",
    description: new Date().toLocaleTimeString() + " okay?",
    expireAt: tomorrow,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      await props.callback({ ...payload, expireAt: new Date(payload.expireAt) })
    )
      setPayload({ title: "", description: "", expireAt: "" });
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
              <Label className="required" htmlFor="expireAt">
                Delete after
              </Label>
              {errors?.expireAt && <Error>{errors.expireAt}</Error>}
              <Input
                type="date"
                value={payload.expireAt}
                min={tomorrow}
                onChange={(e) => {
                  setPayload((payload) => ({
                    ...payload,
                    expireAt: e.target.value,
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
                    expireAt: "",
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
