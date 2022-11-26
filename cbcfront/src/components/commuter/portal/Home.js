import Bus from "./bus/Index";
import BusStops from "./busstops/Index";
import Routes from "./routes/Index";

const Home = () => {
  return (
    <>
      <Routes
        style={{
          margin: "unset",
        }}
      />
      <BusStops
        style={{
          margin: "unset",
        }}
      />
      <Bus
        style={{
          margin: "unset",
        }}
      />
    </>
  );
};
export default Home;
