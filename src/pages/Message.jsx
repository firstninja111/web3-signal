import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

const Message = () => {
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
              <div className="message">
                <div className="message__wrapper">
                  <Title
                    title={"Winner Message"}
                    subtitle={
                      "This will be shown to winners on the registration page and the verification page."
                    }
                  />
                  <div className="message__inner bg">
                    <div className="input-container">
                      <div className="input-container__title">Winner title</div>
                      <div className="input-container__input">
                        <input type="text" placeholder="Winner title" />
                      </div>
                      <div className="input-container__subtitle">
                        What is the title for your winner section? Default: You
                        were selected!
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Winner message
                      </div>
                      <textarea
                        placeholder="Banned ip hashes"
                        className="input-container__input"
                      />
                      <div className="input-container__subtitle">
                        What message would you like to display to wallets that
                        were selected?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message__wrapper">
                  <Title
                    title={"Non-Winner Message"}
                    subtitle={
                      "This will be shown to wallets who did not win the raffle."
                    }
                  />
                  <div className="message__inner bg">
                    <div className="input-container">
                      <div className="input-container__title">
                        Nonwinner title
                      </div>
                      <div className="input-container__input">
                        <input type="text" placeholder="Nonwinner title" />
                      </div>
                      <div className="input-container__subtitle">
                        What is the title for your non-winner section? Default:
                        You were not selected!
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Nonwinner message
                      </div>
                      <textarea
                        placeholder="Nonwinner message"
                        className="input-container__input"
                      />
                      <div className="input-container__subtitle">
                        What message would you like to display to wallets that
                        were not selected?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message__wrapper">
                  <Title
                    title={"Waitlist Message"}
                    subtitle={
                      "If you choose to add some wallets to a waitlist, they will see this message."
                    }
                  />
                  <div className="message__inner bg">
                    <div className="input-container">
                      <div className="input-container__title">
                        Waitlist title
                      </div>
                      <div className="input-container__input">
                        <input type="text" placeholder="Waitlist title" />
                      </div>
                      <div className="input-container__subtitle">
                        What is the title for your waitlist section? Default:
                        You're on the waitlist!
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Waitlist message
                      </div>
                      <textarea
                        placeholder="Waitlist message"
                        className="input-container__input"
                      />
                      <div className="input-container__subtitle">
                        What message would you like to display to wallets that
                        are on the waitlist?
                      </div>
                    </div>
                  </div>
                </div>
                <button className="signup__btn">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
