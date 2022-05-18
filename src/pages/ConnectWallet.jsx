import React from "react";
import Header from "../components/Header";
import wallet from "../assets/images/wallet.svg";
import coinbase from "../assets/images/coinbase.svg";

const ConnectWallet = () => {
  return (
    <div className="connect-wallet__wrapper">
      <Header header={true} />
      <div className="connect-wallet__wrapper-inner">
        <div className="connect-wallet">
          <div className="connect-wallet__item">
            <div className="connect-wallet__img">
              <img src={wallet} alt="" />
            </div>
            <div className="connect-wallet__title">WalletConnect</div>
            <div className="connect-wallet__subtitle">
              Scan with WalletConnect to connect
            </div>
          </div>
          <div className="connect-wallet__item">
            <div className="connect-wallet__img">
              <img src={coinbase} alt="" />
            </div>
            <div className="connect-wallet__title">Coinbase</div>
            <div className="connect-wallet__subtitle">
              Connect to your Coinbase Wallet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
