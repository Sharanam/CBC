import { useCallback, useEffect, useState } from "react";
import adminModel from "../../../globalState/admin";
import { Button } from "../../common/lib/formElements/Index";

import { Container } from "../../common/lib/layout/Index";
import Table from "../../common/lib/layout/table/Index";
import Blacklist from "./Blacklist";
import IssuePass from "./IssuePass";
import SearchBoxes from "./SearchBoxes";
import SetAdmin from "./SetAdmin";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openFilterBox, setOpenFilterBox] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    name: "",
  });
  const fetchUsers = useCallback(() => {
    adminModel.getUsers(payload).then((result) => {
      setUsers(result);
    });
  }, [payload]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <>
      <Container>
        <h1>Users</h1>
        {openFilterBox ? (
          <SearchBoxes
            data={payload}
            setData={setPayload}
            onHide={() => setOpenFilterBox(false)}
          />
        ) : (
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={() => setOpenFilterBox(true)} className="positive">
              Filter Search
            </Button>
          </div>
        )}
        {users[0] && (
          <Table>
            <thead>
              <tr>
                <td>name</td>
                <td>email</td>
                <td>phone</td>
                <td>bio</td>
                <td>social</td>
                <td>issue pass</td>
                <td>type</td>
                <td>Blacklist</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td
                    className="textOverflow center"
                    title={`name: ${user["name"]}, ID: ${
                      user["_id"]
                    }, created At: ${new Date(
                      user["createdAt"]
                    ).toLocaleDateString()}. Account is ${
                      user["public"] ? "public" : "private"
                    }`}
                  >
                    <IssuePass id={user["_id"]} visibility={user["public"]}>
                      {user["name"]}
                    </IssuePass>
                  </td>
                  <td
                    title={user["email"]}
                    className="textOverflow"
                    style={{
                      color: user["isVerified"]
                        ? "currentColor"
                        : "var(--danger)",
                    }}
                  >
                    {user["email"]}
                  </td>
                  <td title={user["phone"]} className="textOverflow">
                    {user["phone"]}
                  </td>
                  <td title={user["bio"]} className="textOverflow">
                    {user["bio"]}
                  </td>
                  <td title={user["social"]} className="textOverflow">
                    {user["social"]}
                  </td>
                  <td title={user["type"]} className="center">
                    <IssuePass id={user["_id"]} visibility={user["public"]}>
                      New Pass
                    </IssuePass>
                  </td>
                  <td title={user["type"]} className="center">
                    <SetAdmin type={user["type"]} _id={user["_id"]} />
                  </td>
                  <td className="center">
                    <Blacklist
                      isBlacklisted={user["isBlacklisted"]}
                      _id={user["_id"]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};
export default Users;
