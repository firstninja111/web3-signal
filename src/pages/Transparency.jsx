import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

const Transparency = () => {
  const [swirchInput, setSwitchInput] = useState("");
  const [swirchInput2, setSwitchInput2] = useState("");
  return (
    <>
      <Header />
      <div className="App__inner">
        <div className="App__inner-content center-block">
          <div className="App__sidebar">
            <SideBar />
          </div>
          <div className="App__routes">
            <div className="transparency">
              <div
                className="transparency__top-wrapper bg"
                style={{ marginBottom: "30px" }}
              >
                <div className="transparency__top">
                  <Title
                    title={"Public Wallet List"}
                    subtitle={
                      "This will add an accessible page that shows the current list of registered wallets."
                    }
                  />
                  <div className="transparency__checkbox">
                    <div className="inputSwitch">
                      <input
                        type="checkbox"
                        id="switcher"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          if (swirchInput) {
                            setSwitchInput("");
                          } else {
                            setSwitchInput(n.target.id);
                          }
                        }}
                      />
                      <label htmlFor="switcher" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                </div>
                {swirchInput === "switcher" ? (
                  <div className="transparency__bottom-text text">
                    Public list of winners will be displayed at
                    <i className="icon-link"></i>
                    <span>https://premint.xyz/waffeles/winners/</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="transparency__bottom bg">
                <div
                  className="transparency__top"
                  style={{ borderBottom: "none", paddingBottom: "0" }}
                >
                  <Title
                    title={"Public Winner List"}
                    subtitle={
                      "This will add an accessible page that shows the list of everyone who is marked as a winner."
                    }
                  />
                  <div className="transparency__checkbox">
                    <div className="inputSwitch">
                      <input
                        type="checkbox"
                        id="switch"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          if (swirchInput2) {
                            setSwitchInput2("");
                          } else {
                            setSwitchInput2(n.target.id);
                          }
                        }}
                      />
                      <label htmlFor="switch" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                </div>
                {swirchInput2 === "switch" ? (
                  <div className="transparency__bottom-text text">
                    Public list of winners will be displayed at
                    <i className="icon-link"></i>
                    <span>https://premint.xyz/waffeles/winners/</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button className="signup__btn">Save Settings</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transparency;
