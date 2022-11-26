import Announcement from "./announcement/Index";
import Gallery from "./gallery/Index";
import Hero from "./hero/Hero";
import AboutUs from "./promo/AboutUs";
import AreaOfService from "./promo/AreaOfService";
import "./style.css";

export default function Homepage() {
  return (
    <>
      <main className="homepage">
        <Hero />
        <Announcement />
        <AboutUs />
        <AreaOfService />
        <Gallery />
      </main>
    </>
  );
}
