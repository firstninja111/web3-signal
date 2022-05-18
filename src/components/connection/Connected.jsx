import React from "react";
import checked from "../../assets/images/checked.svg";

const Connected = () => {
  return (
    <div
      className="main__right"
      style={{ maxWidth: "381px", minHeight: "290px" }}
    >
      <div className="main__right-title">
        Lets make sure you have what it takes to register
      </div>
      <div className="main__right-items">
        <div className="main__right-item">
          <div className="main__right-item-inner">
            <div className="main__right-item-icon">
              <i className="icon-twitter"></i>
            </div>
            <div className="main__right-item-info">
              <div className="main__right-item-title">Twitter</div>
              <div className="main__right-item-text">Connect your twitter</div>
            </div>
          </div>
          <button
            className="main__right-item-btn "
            style={{ background: "#1d1d1d" }}
          >
            <img src={checked} alt="" /> Connected
          </button>
        </div>
        <div className="main__right-item" style={{ marginBottom: "0" }}>
          <div className="main__right-item-inner">
            <div className="main__right-item-icon">
              <i className="icon-discord"></i>
            </div>
            <div className="main__right-item-info">
              <div className="main__right-item-title">Discord</div>
              <div className="main__right-item-text">Connect your Discord</div>
            </div>
          </div>
          <button
            className="main__right-item-btn "
            style={{ background: "#1d1d1d" }}
          >
            <img src={checked} alt="" /> Connected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connected;
