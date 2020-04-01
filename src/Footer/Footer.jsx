import React, { Component } from "react";
import "./Footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="mainFooter">
        Developed By Usama Majid{" "}
        <a style={{color:"white"}} target="_blank" rel="noopener noreferrer" href="mailto:usamamajid6@gmail.com">
          Contact Me!
        </a>
      </div>
    );
  }
}

export default Footer;
