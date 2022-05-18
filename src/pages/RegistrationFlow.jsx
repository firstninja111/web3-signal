import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import trash from "../assets/images/trasher.svg";

const RegistrationFlow = () => {
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
            <form>
              <div className="registration">
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Wallet Requirements BETA
                  </div>
                  <div className="registration__heading-subtitle">
                    All users will be required to log in, but you can also set
                    other requirements about what is in their wallet.
                  </div>
                </div>
                <div className="registration__wallet bg">
                  <div className="registration__wallet-top">
                    <div className="input-container">
                      <div className="input-container__title">
                        Required ETH Balance
                      </div>
                      <div className="input-container__input">
                        <input type="text" placeholder="Required ETH Balance" />
                      </div>
                      <div className="input-container__subtitle">
                        You can require users who register to hold a minimum
                        amount of ETH in their wallet.
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div className="registration__heading-inner">
                      <div className="registration__heading-inner-title">
                        Require user to own an NFT from specific collections?
                        (ETH NFTs only)
                      </div>
                      <div className="registration__heading-inner-subtitle">
                        You can enter two collections below, and the user will
                        need to own an NFT from either one.
                      </div>
                    </div>
                  </div>
                  <div className="registration__wallet-collection">
                    <div className="registration__wallet-collection-item">
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="registration__wallet-collection-title">
                          Collection 1
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Contract Address
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Name
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="Bored Ape Yacht Club"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="https://opensea.io/collection/boredapeyachtclub"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <button className="registration__wallet-collection-img">
                          <img src={trash} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="registration__wallet-collection-item">
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="registration__wallet-collection-title">
                          Collection 1
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Contract Address
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Name
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="Bored Ape Yacht Club"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="https://opensea.io/collection/boredapeyachtclub"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <button className="registration__wallet-collection-img">
                          <img src={trash} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="registration__wallet-collection-item">
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="registration__wallet-collection-title">
                          Collection 1
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Contract Address
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Name
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="Bored Ape Yacht Club"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="https://opensea.io/collection/boredapeyachtclub"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <button className="registration__wallet-collection-img">
                          <img src={trash} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="registration__wallet-add">
                      <span>
                        <i className="icon-plus"></i>Add new Collection
                      </span>
                    </div>
                  </div>
                </div>
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Twitter Requirements BETA
                  </div>
                  <div className="registration__heading-subtitle">
                    Require users to sign into Twitter before registering for
                    your list.
                  </div>
                </div>
                <div className="registration__twitter bg">
                  <div
                    className="registration__twitter-top"
                    style={{
                      display: "flex",
                      alignItems: " center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="registration__heading-inner">
                      <div className="registration__heading-inner-title">
                        Twitter Verification
                      </div>
                      <div className="registration__heading-inner-subtitle">
                        Require someone to verify themselves on Twitter before
                        joining your list.
                      </div>
                    </div>
                    <div className="inputSwitch" style={{ marginLEft: "10px" }}>
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
                  {swirchInput === "switcher" ? (
                    <>
                      <div
                        className="input-container"
                        style={{ paddingTop: "30px" }}
                      >
                        <div className="input-container__title">
                          Must Follow
                        </div>
                        <div className="input-container__input">
                          <input type="text" placeholder="Jack" />
                        </div>
                        <div className="input-container__subtitle">
                          Require that a user follows a certain account before
                          registering.
                        </div>
                      </div>
                      <div className="registration__twitter-check">
                        <div className="registration__twitter-checkbox">
                          <input type="checkbox" />
                        </div>
                        <div className="registration__twitter-info">
                          <div className="registration__twitter-info-title">
                            Prompt Users to Tweet?
                          </div>
                          <div className="registration__twitter-info-subtitle">
                            Show a tweet prompt after a user successfully
                            registers telling them to spread the word about the
                            list.
                          </div>
                        </div>
                      </div>
                      <div className="input-container">
                        <div className="input-container__title">
                          Custom Tweet Content
                        </div>
                        <div className="input-container__input">
                          <input
                            type="text"
                            placeholder="Enter custom text for the tweet prompt. We will attach the URL to the end."
                          />
                        </div>
                        <div className="input-container__subtitle">
                          Enter custom text for the tweet prompt. We will attach
                          the URL to the end.
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Discord Requirements BETA
                  </div>
                  <div className="registration__heading-subtitle">
                    Require users to sign into Discord, be a member of your
                    server, and/or have a specific role before registering for
                    your list.
                  </div>
                </div>
                <div className="registration__discord bg">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="registration__twitter-check"
                      style={{ padding: "0" }}
                    >
                      <div className="registration__twitter-checkbox">
                        <input type="checkbox" />
                      </div>
                      <div className="registration__twitter-info">
                        <div className="registration__twitter-info-title">
                          Discord Verification
                        </div>
                        <div className="registration__twitter-info-subtitle">
                          Require someone to verify themselves on Discord before
                          joining your list.
                        </div>
                      </div>
                    </div>
                    <div
                      className="inputSwitch"
                      style={{ paddingLeft: "10px" }}
                    >
                      <input
                        type="checkbox"
                        id="switcherDS"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          if (swirchInput2) {
                            setSwitchInput2("");
                          } else {
                            setSwitchInput2(n.target.id);
                          }
                        }}
                      />
                      <label htmlFor="switcherDS" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                  {swirchInput2 === "switcherDS" ? (
                    <>
                      <div
                        className="registration__discord-title"
                        style={{ paddingTop: "20px" }}
                      >
                        Require user to be a member of a specific server? (All
                        three fields required){" "}
                        <a href="/">Click here for instructions</a>
                      </div>
                      <div className="registration__discord-inner">
                        <div className="input-container">
                          <div className="input-container__title">
                            Server ID
                          </div>
                          <div className="input-container__input">
                            <input type="text" placeholder="6827459345" />
                          </div>
                          <div className="input-container__subtitle"></div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Server Display Name
                          </div>
                          <div className="input-container__input">
                            <input type="text" placeholder="Larva Labs" />
                          </div>
                          <div className="input-container__subtitle">
                            This will be displayed to the user in the form.
                          </div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Server Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="https://discord.gg/larvalabs"
                            />
                          </div>
                          <div className="input-container__subtitle">
                            Add a link so we can direct people to your server
                            who aren't yet members.
                          </div>
                        </div>
                      </div>
                      <div className="registration__discord-title">
                        Require user to be a member of a specific server? (All
                        three fields required){" "}
                        <a href="/">Click here for instructions</a>
                      </div>
                      <div className="registration__discord-inner">
                        <div className="input-container">
                          <div className="input-container__title">
                            Role ID(s)
                          </div>
                          <div className="input-container__input">
                            <input type="text" placeholder="85349583985" />
                          </div>
                          <div className="input-container__subtitle"></div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Role Display Label(s)
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="CryptoPunks Owner"
                            />
                          </div>
                          <div className="input-container__subtitle">
                            This will be displayed to the user in the form.
                          </div>
                        </div>
                      </div>
                      <div className="registration__discord-title">
                        Require user to be a member of a specific server? (All
                        three fields required){" "}
                        <a href="/">Click here for instructions</a>
                      </div>
                      <div className="registration__discord-inner">
                        <div className="input-container">
                          <div className="input-container__title">
                            Role ID(s)
                          </div>
                          <div className="input-container__input">
                            <input type="text" placeholder="85349583985" />
                          </div>
                          <div className="input-container__subtitle"></div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Role Display Label(s)
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="CryptoPunks Owner"
                            />
                          </div>
                          <div className="input-container__subtitle">
                            This will be displayed to the user in the form.
                          </div>
                        </div>
                      </div>
                      <div className="registration__discord-banner">
                        Check Multiple Roles: You can check if a user has one of
                        several roles by comma separating role IDs and labels.
                        The user will be required to have one of the roles, not
                        all.
                      </div>
                      <div className="registration__discord-title">
                        Require user joined your server by a certain date
                      </div>
                      <div className="info__date-content-input">
                        <input type="date" />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Custom Field
                  </div>
                  <div className="registration__heading-subtitle">
                    Require that the user fill out an extra form field
                  </div>
                </div>
                <div className="registration__custom bg">
                  <div className="registration__custom-inner">
                    <div className="input-container">
                      <div className="input-container__title">
                        Custom Field Label
                      </div>
                      <div className="input-container__input">
                        <input type="text" placeholder="Custom Field Label" />
                      </div>
                      <div className="input-container__subtitle">
                        If you would like users to fill out a custom field (500
                        character max) with each entry, enter the label for the
                        field here.
                      </div>
                    </div>
                    <button className="registration__custom-inner-img">
                      <img src={trash} alt="" />
                    </button>
                  </div>
                  <div className="registration__custom-add">
                    <button>
                      <i className="icon-plus"></i>Add new field
                    </button>
                  </div>
                </div>
                <button className="registration__btn">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationFlow;
