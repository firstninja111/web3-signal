import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

const BlackList = () => {
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
              <div className="team">
                <Title
                  title={"Banned Entries"}
                  subtitle={
                    "Ban certain wallets or IPs from your list. They will still be allowed to enter, but they will not be included in exports and will not be picked as winners."
                  }
                />
                <div className="team__inner">
                  <div className="input-container">
                    <div className="input-container__title">
                      Banned ip hashes
                    </div>
                    <textarea placeholder="Banned ip hashes" />
                    <div className="input-container__subtitle">
                      One per line. These IP address hashes will be marked as
                      banned and be ignored when selecting winners and exporting
                      data.
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-container__title">Banned wallets</div>
                    <textarea placeholder="Banned wallets" />
                    <div className="input-container__subtitle">
                      One per line. These wallet address will be marked as
                      banned and be ignored when selecting winners and exporting
                      data.
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

export default BlackList;
