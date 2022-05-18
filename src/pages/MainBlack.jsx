import React from "react";
import logo from "../assets/images/logo.png";
import azuki from "../assets/images/azuki.png";
import ttw from "../assets/images/tiktokw.svg";
import tipndo from "../assets/images/tipndo.png";

const MainBlack = () => {
  return (
    <div className="black main">
      <div
        className="black center-block"
        style={{ position: "relative", zIndex: "1" }}
      >
        <div className="black main__logo mobile">
          <img src={logo} alt="" />
        </div>
        <div className="black main__content">
          <div className="black main__left">
            <div className="black main__logo">
              <img src={logo} alt="" />
              <img src={logo} alt="" />
            </div>
            <div className="black main__links">
              <div className="black main__links-title">Azuki x coolcats</div>
              <div className="black main__links-items">
                <a href="/" className="black main__links-item">
                  <i className="black icon-twitter"></i>
                </a>
                <a href="/" className="black main__links-item">
                  <i className="black icon-instagram"></i>
                </a>
                <a href="/" className="black main__links-item">
                  <img src={ttw} alt="" />
                </a>
              </div>
              <a href="/" className="black main__links-link">
                <i className="black icon-link"></i>
                <span>www.azuki.com</span>
              </a>
            </div>
            <div className="black main__items">
              <div className="black main__item">
                <div className="black main__item-inner">
                  <div className="black main__item-top">
                    Registration Closes
                  </div>
                  <div className="black main__item-bot">
                    April 28, 2022, 10 p.m. UTC
                  </div>
                </div>
              </div>
              <div className="black main__item">
                <div className="black main__item-inner">
                  <div className="black main__item-top">Spots Available</div>
                  <div className="black main__item-bot">200 Spots</div>
                </div>
              </div>
              <div className="black main__item">
                <div className="black main__item-inner">
                  <div className="black main__item-top">Official Link</div>
                  <div className="black main__item-bot">200 Spots</div>
                </div>
              </div>
              <div className="black main__item">
                <div className="black main__item-inner">
                  <div className="black main__item-top">Mint Date</div>
                  <div className="black main__item-bot">
                    April 28, 2022, 10 p.m. UTC
                  </div>
                </div>
              </div>
              <div className="black main__item">
                <div className="black main__item-inner">
                  <div className="black main__item-top">Mint Price</div>
                  <div className="black main__item-bot">0.3 ETH</div>
                </div>
              </div>
            </div>
            <div className="black main__text">
              <p>
                Submit your wallet here if you have Common Pass, Event Pass or
                Giveaway Pass role on Discord.
              </p>
              <p>
                You have until 2nd of May at 4:00 pm UTC to submit your wallet.
              </p>
              <p>
                · You will be able to mint 1 NFT during the presale on May 4th
                at 4:00 pm UTC with a 4 hours mint window.
              </p>
              <p>KAHIRU is harmony, patience, or even luck.</p>
              <p>
                3D collection of 7222 avatars digitally sculpted by Hodei
                Piquer. Each belongs to one of the 5 factions that rule Ruy
                planet. The artwork combines a 3D anime style with unique
                details in each of the characters.
              </p>
              <p>
                Kahiru aims to be a community-driven project that offers all
                kinds of benefits to the holders. Expect opportunity, community,
                fun and engagement when being a part of the family. A project
                made by the people for the people. We welcome you all to the
                family and look forward to sharing this journey with you.
              </p>
            </div>
          </div>
          <div className="black main__right hover:bg-sky-700">
            <div className="black main__right-title">
              Follow the steps below to add yourself to this list.
            </div>
            <div className="black main__right-items">
              <div
                className="black main__right-item"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="black main__right-item-icon">
                  <i className="black icon-twitter"></i>
                </div>
                <div className="black main__right-item-info">
                  <div className="black main__right-item-title">Twitter</div>
                  <div className="black main__right-item-text">
                    Follow <a href="/">@azuki</a> on twitter
                  </div>
                </div>
              </div>
              <div
                className="black main__right-item"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="black main__right-item-icon">
                  <i className="black icon-discord"></i>
                </div>
                <div className="black main__right-item-info">
                  <div className="black main__right-item-title">Discord</div>
                  <div className="black main__right-item-text">
                    Join the <a href="/"> Degen Labz</a> Discord and have the
                    <a href="/"> DEGENZ</a> role
                  </div>
                </div>
              </div>
              <div
                className="black main__right-item"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="black main__right-item-icon">
                  <i className="black icon-eth"></i>
                </div>
                <div className="black main__right-item-info">
                  <div className="black main__right-item-title">Wallet</div>
                  <div className="black main__right-item-text">
                    Have at least <span> 0.1 ETH</span> on your Wallet
                  </div>
                </div>
              </div>
              <div
                className="black main__right-item"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="black main__right-item-icon">
                  <img src={logo} alt="" />
                </div>
                <div className="black main__right-item-info">
                  <div className="black main__right-item-title">Azuki</div>
                  <div className="black main__right-item-text">
                    Hold one<a href="/"> Azuki</a> NFT
                  </div>
                </div>
              </div>
            </div>
            <button className="black main__right-btn">Connect Wallet</button>
          </div>
        </div>
      </div>
      <div className="black main__bg">
        <img src={azuki} alt="" />
      </div>
      <div className="main__tipndo">
        <div className="main__tipndo-img">
          <img src={tipndo} alt="" />
        </div>
        <span>Powered by Tipndo.</span>
      </div>
    </div>
  );
};

export default MainBlack;
