import Bus from "./bus/Index";
import BusStops from "./busstops/Index";
import Routes from "./routes/Index";

const Home = () => {
  return (
    <>
      <BusStops />
      <Bus
        style={{
          margin: "unset",
        }}
      />
      <Routes
        style={{
          margin: "unset",
        }}
      />
    </>
  );
};
export default Home;
