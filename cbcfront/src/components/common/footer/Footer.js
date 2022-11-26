import { Link } from "react-router-dom";
import { ExternalLink } from "../lib/styledElements/Index";
import "./footer.css";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="info">
          <div className="row">
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li>
                  <ExternalLink href="http://instagram.com/CBC">
                    Instagram
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="http://facebook.com/CBC">
                    facebook
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="http://twitter.com/CBC">
                    twitter
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="http://linkedIn.com/CBC">
                    linkedIn
                  </ExternalLink>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="AboutUs">About Us</Link>
                </li>
                <li>
                  <Link to="OfficeStaff">Office Staff</Link>
                </li>
                <li>
                  <Link to="Controllers">Controllers</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Important Links</h4>
              <ul>
                <li>
                  <Link to="/portal/feedback">Feedback</Link>
                </li>
                <li>
                  <Link to="Announcements">Announcements</Link>
                </li>
                <li>
                  <Link to="Gallery">Gallery</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2>About Us</h2>
              <p>
                We made this project to simulate how an application should work
                when end users of the systems are directly connected to the
                firm's product. i.e., bus service
              </p>
              <p>
                Note: Images in this page are taken from the platform where they
                were publicly available. These are not intended for any sort of
                business.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "1em 0",
            backgroundColor: "var(--black)",
            color: "var(--white)",
          }}
        >
          &copy;Shree City Bus Service, Chotai Palace (COURSE:2022:2023)
        </div>
      </footer>
    </>
  );
}
