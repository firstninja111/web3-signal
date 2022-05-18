import React from "react";

const Connect = () => {
  return (
    <div
      className=" black main__right"
      style={{ maxWidth: "381px", minHeight: "290px" }}
    >
      <div className=" black main__right-title">
        Lets make sure you have what it takes to register
      </div>
      <div className=" black main__right-items">
        <div className=" black main__right-item">
          <div className=" black main__right-item-inner">
            <div className=" black main__right-item-icon">
              <i className=" black icon-twitter"></i>
            </div>
            <div className=" black main__right-item-info">
              <div className=" black main__right-item-title">Twitter</div>
              <div className=" black main__right-item-text">
                Connect your twitter
              </div>
            </div>
          </div>
          <button className=" black main__right-item-btn">Connect</button>
        </div>
        <div className=" black main__right-item" style={{ marginBottom: "0" }}>
          <div className=" black main__right-item-inner">
            <div className=" black main__right-item-icon">
              <i className=" black icon-discord"></i>
            </div>
            <div className=" black main__right-item-info">
              <div className=" black main__right-item-title">Discord</div>
              <div className=" black main__right-item-text">
                Connect your Discord
              </div>
            </div>
          </div>
          <button className=" black main__right-item-btn">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
