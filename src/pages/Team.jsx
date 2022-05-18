import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

const Team = () => {
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
                  title={"Team"}
                  subtitle={
                    "If there are other people you'd like to be able to see the entries and make changes to your PREMINT settings, add their wallet addresses here."
                  }
                />
                <div className="team__inner">
                  <div className="input-container">
                    <div className="input-container__title">
                      Admin wallet addresses
                    </div>
                    <textarea placeholder="Admin wallet addresses" />
                    <div className="input-container__subtitle">
                      Add wallet addresses for users that are allowed to serve
                      as admins for this project.
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

export default Team;
