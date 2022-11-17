import { Link } from "react-router-dom";
import { Button } from "../lib/formElements/Index";
import { Container } from "../lib/layout/Index";
import { Card } from "../lib/styledElements/Index";
import Favorites from "./Favourites";
import History from "./History";
import Profile from "./Profile";

const Home = () => {
  return (
    <Container size="md">
      <Card
        style={{
          backgroundColor: "var(--less-white)",
        }}
      >
        <Profile card={true} />
        <Link to="/logout">
          <Button style={{ width: "100%" }} className="negative">
            Logout
          </Button>
        </Link>
      </Card>
      <Card
        style={{
          overflowY: "auto",
          maxHeight: "80vh",
          backgroundColor: "var(--lightblue)",
        }}
      >
        <Favorites />
      </Card>
      <Card
        style={{
          overflowY: "auto",
          maxHeight: "80vh",
          backgroundColor: "var(--google-gray-700)",
        }}
      >
        <History />
      </Card>
    </Container>
  );
};
export default Home;
