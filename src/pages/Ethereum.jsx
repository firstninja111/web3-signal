import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import etherium from "../assets/images/etherium.svg";
import WalletContext from "../context/WalletContext";

const Ethereum = () => {
  const [connectToWalletButton, setConnectToWalletButton] = useState(undefined);
  const [status, setStatus] = useState('');

  const updateStatus = (statusText) => {
    setStatus(statusText);
  }

  return (
    <div className="ethereum__wrapper">
      <Header
        header={"landing"}
        connectToWalletButton={connectToWalletButton}
        setConnectToWalletButton={setConnectToWalletButton}
        updateStatus={updateStatus}
      />
      <div className="ethereum">
        <div className="ethereum__img">
          <img src={etherium} alt="" />
        </div>
        <div className="ethereum__title">Connect your Ethereum Wallet</div>
        <div className="ethereum__btn">
          <button
            onClick={() => setConnectToWalletButton(!connectToWalletButton)}
          >
            Connect Wallet
          </button>
        </div>
        <div className="ethereum__status">
          {status}
        </div>
        <div className="ethereum__footer">
          By connecting, you agree to the
          <a href="/">Terms of Use</a>
          and <a href="/">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Ethereum;
