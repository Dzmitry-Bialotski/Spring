import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span className="name">
        KeepInTouch made by - {" "}
        <a href="https://github.com/dimasindro" target="__blank">
          @dimasiandro
        </a>
      </span>
      <hr style={{ width: "90%" }} />
      <div className="iconContainer">
        <a href="https://www.instagram.com/dimasiandro" target="__blank">
          <i className="fab fa-instagram-square fa-2x"></i>
        </a>
        <a href="https://vk.com/dimasiandro" target="__blank">
          <i className="fab fa-vk fa-2x"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCqHOcdi2lD_1A2qEv2FGDIg" target="__blank">
          <i className="fab fa-youtube fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;