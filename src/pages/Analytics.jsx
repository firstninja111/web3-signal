import React, { useState } from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import ds from "../assets/images/ds.svg";

const Analytics = () => {
  const [swirchInput, setSwitchInput] = useState("");
  const [swirchInput2, setSwitchInput2] = useState("");
  return (
    <div className="analytics">
      <Header />
      <div className="analytics__inner">
        <div className="center-block">
          <div className="analytics__inner-wrapper">
            <div className="analytics__inner-wrapper-item"></div>
            <div className="analytics__inner-wrapper-item">
              <Title title={"Analytics"} />
              <div className="analytics__top">
                <div className="analytics__top-block bg">
                  <div className="input-container">
                    <div className="input-container__title">
                      Google Analytics Measurement / Tracking ID
                    </div>
                    <div className="input-container__input">
                      <input
                        type="text"
                        placeholder="Google Analytics Measurement / Tracking ID"
                      />
                    </div>
                    <div className="input-container__subtitle">
                      <a href="/">
                        Read instructions here about how to find this
                      </a>
                    </div>
                  </div>
                </div>
                <div className="analytics__top-block">
                  <div className="bg" style={{ marginBottom: "30px" }}>
                    <div className="transparency__top">
                      <Title
                        title={"Require reCAPTCHA"}
                        subtitle={
                          "Add a reCAPTCHA box on the bottom of your form to fight bots."
                        }
                      />
                      <div className="transparency__checkbox">
                        <div className="inputSwitch">
                          <input
                            type="checkbox"
                            id="switch"
                            className="inputSwitch-input"
                            onChange={(n) => {
                              if (swirchInput === n.target.id) {
                                setSwitchInput("");
                              } else {
                                setSwitchInput(n.target.id);
                              }
                            }}
                          />
                          <label htmlFor="switch" className="inputSwitch-label">
                            Toggle
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        paddingtop: "14px",
                        bordertop: "1px solid #e5e7eb",
                      }}
                    >
                      {swirchInput === "switch" ? (
                        <div className="text">text</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="analytics__top-block">
                  <div className="bg" style={{ marginBottom: "30px" }}>
                    <div className="transparency__top">
                      <Title
                        title={"Private Project"}
                        subtitle={
                          "Projects listed privately won't be considered for PREMINT's homepage, calendar, or other project lists."
                        }
                      />
                      <div className="transparency__checkbox">
                        <div className="inputSwitch">
                          <input
                            type="checkbox"
                            id="switcher"
                            className="inputSwitch-input"
                            onChange={(n) => {
                              if (swirchInput2 === n.target.id) {
                                setSwitchInput2("");
                              } else {
                                setSwitchInput2(n.target.id);
                              }
                            }}
                          />
                          <label
                            htmlFor="switcher"
                            className="inputSwitch-label"
                          >
                            Toggle
                          </label>
                        </div>
                      </div>
                    </div>
                    {swirchInput2 === "switcher" ? (
                      <div className="text">text</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="analytics__inner-wrapper">
            <div className="analytics__inner-wrapper-item">
              <span>Security</span>
            </div>
            <div className="analytics__inner-wrapper-item">
              <Title
                title={"Password"}
                subtitle={
                  "Would you like users to enter a password before being able to access your PREMINT list?"
                }
              />
              <div className="analytics__top">
                <div className="analytics__top-block bg">
                  <div className="input-container">
                    <div className="input-container__title">Password</div>
                    <div className="input-container__input">
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className="input-container__subtitle">
                      <a href="/">
                        This allows you to password protect this page. Visitors
                        will be asked to enter a password before they can see
                        the content.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="analytics__inner-wrapper">
            <div className="analytics__inner-wrapper-item">
              <span>API</span>
            </div>
            <div className="analytics__inner-wrapper-item">
              <Title
                title={"API Key BETA"}
                subtitle={
                  "This API is very much a prototype, shouldn't be used heavily, and is very, very basic. BUT, we thought it'd be useful to at least expose what we have. We'll be improving it over time, but we apologize if it doesn't do what you'd like it to do or for any limitations it has."
                }
              />
              <div className="analytics__top api">
                <input
                  type="text"
                  placeholder="ae8bf85e47d24f7c539960750abdd6e1d839847fe18155daa"
                  className="analytics__top-api-input"
                />
                <button className="analytics__top-api-btn">
                  Regenerate Key
                </button>
              </div>
              <div className="analytics__endpoints">
                <div className="analytics__endpoints-title">Endpoints</div>
                <div className="analytics__endpoints-subtitle">Wallet List</div>
                <div className="analytics__endpoints-text">
                  This will return a list of all the wallets that have
                  registered for your PREMINT list.
                </div>
                <a href="/" className="analytics__endpoints-error">
                  https://api.alphaspot.xyz/v1/ae8bf85e47d24f7c53b04e73e0015a6289960750abdd6e1d839847fe18155daa/
                </a>
                <button className="analytics__endpoints-btn">Open</button>
              </div>
            </div>
          </div>
          <div className="analytics__inner-wrapper">
            <div className="analytics__inner-wrapper-item">
              <span>Alerts</span>
            </div>
            <div className="analytics__inner-wrapper-item">
              <div className="analytics__img">
                <img src={ds} alt="" />
              </div>
              <Title
                title={"Discord Webhook"}
                subtitle={
                  "If you want Discord alerts every time someone registers, create a Webhook for the channel in Discord (Edit Channel -> Integrations -> Webhooks) and copy the URL below."
                }
              />
              <div className="analytics__top">
                <div className="analytics__top-block bg">
                  <div className="input-container">
                    <div className="input-container__title">
                      Post New Registrations to Discord Webhook
                    </div>
                    <div className="input-container__input">
                      <input
                        type="password"
                        placeholder="Post New Registrations to Discord Webhook"
                      />
                    </div>
                    <div className="input-container__subtitle">
                      <a href="/">
                        Paste a Discord Webhook URL here and PREMINT will post
                        new entries direectly to your Discord.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <button className="signup__btn">Save Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
