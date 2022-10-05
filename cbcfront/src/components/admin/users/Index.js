import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminModel from "../../../globalState/admin";

import Container from "../../common/lib/layout/Container";
import Table from "../../common/lib/layout/table/Index";
import Blacklist from "./Blacklist";
import SetAdmin from "./SetAdmin";

const Users = () => {
  const [users, setUsers] = useState([]);
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
        <h3 style={{ textAlign: "center", color: "var(--danger)" }}>
          <mark>Under development</mark>
          <br />
          Admin can see the table containing list of users.
          <br />
          Can perform various tasks, such as
          <br />
          1) blacklisting them.
          <br />
          2) giving privilages of an admin
        </h3>
        {users[0] && (
          <Table>
            <thead>
              <tr>
                <td>name</td>
                <td>email</td>
                <td>phone</td>
                <td>bio</td>
                <td>social</td>
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
                    <Link
                      to={`/admin/user/${user["_id"]}`}
                      style={{
                        // backgroundColor: "var(--white-light)",
                        color: user["public"]
                          ? "var(--light-blue)"
                          : "var(--danger)",
                      }}
                    >
                      {user["name"]}
                    </Link>
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
