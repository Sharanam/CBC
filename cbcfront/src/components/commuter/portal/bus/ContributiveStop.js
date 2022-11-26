import { useState } from "react";
import commutersModel from "../../../../globalState/commuter";
import contMessages from "../../../../utils/getContributionMessages";
import getDateInFormat, {
  addTimeInto,
  toDateFrom,
} from "../../../../utils/timekeeper";
import {
  Button,
  DropDown,
  Input,
} from "../../../common/lib/formElements/Index";

export function ContributiveStop({
  stop,
  tripTime,
  depTime,
  bus,
  route,
  onSubmit,
  contributions,
}) {
  const [open, setOpen] = useState(false);
  const [[editable, message, _id], [arr, nArr], [latest, news]] = contributions;
  const [payload, setPayload] = useState({
    message: message,
    editable,
  });
  return (
    <>
      <p>
        <span
          style={{
            flexGrow: "1",
          }}
        >
          {stop}
        </span>
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "0.5em",
        }}
      >
        <span
          style={{
            fontSize: "0.65em",
            flexGrow: 1,
          }}
        >
          <Input
            type="time"
            style={{
              backgroundColor: "var(--dull-white)",
              color: "var(--black)",
              fontSize: "1em",
              padding: "0.2em",
              margin: "0 5px 0 0",
            }}
            value={(
              addTimeInto(depTime, tripTime, { time: 1 }) || ""
            ).toString()}
            readOnly
          />
          ETA
        </span>
        <div
          style={{
            fontSize: "0.7em",
            textAlign: "right",
            height: "100%",
            textTransform: "capitalize",
          }}
          title={`"${arr}" people are saying that the bus has been already arrived at "${stop}", and "${nArr}" are saying that the bus has not been arrived yet.`}
        >
          <p>arrived: {arr}</p>
          <p>not arrived: {nArr}</p>
          {latest ? (
            <p>
              <hr />
              <span
                style={{
                  fontSize: "0.8em",
                }}
              >
                Latest Contribution {getDateInFormat(latest, { counter: true })}
                :{" "}
              </span>
              <span
                style={{ textTransform: "capitalize", fontWeight: "bolder" }}
              >
                {news}
              </span>
            </p>
          ) : null}
        </div>
        {open ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "var(--light-blue)",
              color: "var(--white)",
              padding: "0.5em",
              width: "100%",
            }}
          >
            <DropDown
              options={contMessages}
              default={payload.message}
              onChange={(value) => {
                setPayload({ ...payload, message: value });
              }}
              style={{
                width: "100%",
              }}
            />
            {payload.message === "not arrived" ? (
              <p>I am standing at "{stop}" and I am waiting for the bus.</p>
            ) : (
              <p>The bus has been arrived at "{stop}".</p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "0.5em",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                className="positive"
                onClick={async (e) => {
                  e.preventDefault();

                  const result = editable
                    ? await commutersModel.editContribution({
                        _id,
                        message: payload.message,
                      })
                    : await commutersModel.makeContribution({
                        bus,
                        route,
                        stop,
                        createdAfter: toDateFrom(depTime),
                        message: payload.message,
                      });
                  if (result.success) {
                    onSubmit();
                  }
                  if (result.msg) alert(result.msg);
                }}
              >
                Share
              </Button>
              <Button
                className="negative"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="neutral"
            onClick={() => {
              setOpen(true);
            }}
            style={{
              minWidth: "90px",
            }}
          >
            {editable ? "Edit" : "Contribute"}
          </Button>
        )}
      </div>
    </>
  );
}
