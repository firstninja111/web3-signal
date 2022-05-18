import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

const SignUp = () => {
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
              <div className="signup">
                <Title
                  title={"Schedule"}
                  subtitle={"Open and close your list at specific times."}
                />
                <div className="signup__top bg">
                  <div className="signup__top-inner">
                    <div className="input-container">
                      <div className="input-container__title">
                        Registration start date
                      </div>
                      <div className="info__date-content-input">
                        <input type="date" />
                      </div>
                      <div className="input-container__subtitle">
                        UTC Timezone. When should people be able to join your
                        list?
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Registration end date
                      </div>
                      <div className="info__date-content-input">
                        <input type="date" />
                      </div>
                      <div className="input-container__subtitle">
                        UTC Timezone. When should registration close for your
                        list?
                      </div>
                    </div>
                  </div>
                </div>
                <Title title={"Max Entries"} />
                <div className="signup__bot bg">
                  <div className="input-container">
                    <div className="input-container__title">Must Follow</div>
                    <div className="input-container__input">
                      <input type="text" placeholder="Max entries" />
                    </div>
                    <div className="input-container__subtitle">
                      Once your list hits this many, registration will
                      immediately close.
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

export default SignUp;
