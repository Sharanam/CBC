import Announcement from "./announcement/Index";
import Gallery from "./gallery/Index";
import Hero from "./hero/Hero";
import "./style.css";

export default function Homepage() {
  return (
    <>
      <main className="homepage">
        <Hero />
        <Announcement />
        No of Buses...
        Years of trust (service )...
        Area of services (List of bus stops)...
        <Gallery />
      </main>
    </>
  );
}
