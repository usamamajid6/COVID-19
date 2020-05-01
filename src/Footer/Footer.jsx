import React, { Component } from "react";
import "./Footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="mainFooter">
        A little effort By Usama Majid{" "}
        <a
          style={{ color: "white" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://this-is-usama-majid.netlify.app/"
        >
          Contact Me!
        </a>
      </div>
    );
  }
}

export default Footer;
