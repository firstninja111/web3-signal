import React from "react";

const Connect = () => {
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
          <button className="main__right-item-btn">Connect</button>
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
          <button className="main__right-item-btn">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
