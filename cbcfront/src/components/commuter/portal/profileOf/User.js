import Profile from "../../../common/account/Profile";

export default function ProfileOf({ user }) {
  return (
    <>
      <Profile card={true} user={user} />
    </>
  );
}
