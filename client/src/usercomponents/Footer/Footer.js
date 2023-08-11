import footerLogo from "./asset/image/footer-logo.png";
import { IconButton } from "rsuite";
import FacebookOfficialIcon from "@rsuite/icons/legacy/FacebookOfficial";
import GooglePlusCircleIcon from "@rsuite/icons/legacy/GooglePlusCircle";
import TwitterIcon from "@rsuite/icons/legacy/Twitter";
import LinkedinIcon from "@rsuite/icons/legacy/Linkedin";
import "./asset/css/Footer.css";
import logo from "../Navbar/asset/image/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="footer-distributed" style={{ marginTop: 50 }}>
        <div className="footer-left">
          <h3>Succulent Dhaba</h3>

          <img src={logo} alt="Logo" style={{ width: "100px" }} />
          {/* <p className="footer-company-name">ThemeForest Pvt Ltd © 2023</p> */}
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Kailash Vatika Nursery</span> Siloti Pandey, Naukuchiatal
              <span>Nainital, Uttrakhand, 263139</span>
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+91 9528502281</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:succulentdhaba@gmail.com">
                succulentdhaba@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            E-commerce (electronic commerce) is the buying and selling of goods
            and services, or the transmitting of funds or data, over an
            electronic network, primarily the internet.
          </p>

          <div className="footer-icons">
            <IconButton
              className="iconBtn"
              icon={<FacebookOfficialIcon />}
              color="blue"
              appearance="primary"
              circle
            />
            <IconButton
              className="iconBtn"
              icon={<GooglePlusCircleIcon />}
              color="red"
              appearance="primary"
              circle
            />
            <IconButton
              className="iconBtn"
              icon={<TwitterIcon />}
              color="cyan"
              appearance="primary"
              circle
            />
            <IconButton
              className="iconBtn"
              icon={<LinkedinIcon />}
              color="blue"
              appearance="primary"
              circle
            />
          </div>
        </div>
      </footer>
    </>
  );
}
