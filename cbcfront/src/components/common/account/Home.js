import { Link } from "react-router-dom";
import { Button } from "../lib/formElements/Index";
import Container from "../lib/layout/Container";
import Profile from "./Profile";

const Home = () => {
  return (
    <Container size="md">
      <Profile />
      <Link to="/logout">
        <Button className="negative">Logout</Button>
      </Link>
    </Container>
  );
};
export default Home;
