import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import WalletContext from "../context/WalletContext";
// import { connectToWallet } from "../service/walletActions";
import * as config from "../service/config";
import "react-notifications/lib/notifications.css";


import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { register } from "../service/actions";

import getWeb3 from "../getWeb3";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web 3 Modal Demo",
      infuraId: "3fd5925d151b482c8817fd9134d1da50",
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: "3fd5925d151b482c8817fd9134d1da50",
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const Header = (props) => {
  const { connectToWalletButton, setConnectToWalletButton, updateStatus } = props;
  const {
    account,
    setAccount,
    setWeb3Instance,
    web3Instance,
    chainId,
    setChainId,
    setWalletText,
    walletText,
    connected,
    setConnected,
  } = React.useContext(WalletContext);

  const [more, setmore] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [network, setNetwork] = useState();

  const disconnect = async () => {
    setConnected(false);
    localStorage.removeItem("connected");
    setAccount(null);
    localStorage.removeItem("account");
    setChainId(null);
    setWalletText("Sign In");
    setWeb3Instance(null);
    navigate("/");
  };

  function generateNonce(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  const connectToWallet = async () => {    
    try {
      const provider = await web3Modal.connect();   // Web3 Modal Instance
      const library = new ethers.providers.Web3Provider(provider);   // Provider of Ethers for Web3
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);

      // ======== Signature Part ========= //
      const signer = library.getSigner();
      const accounts = await library.listAccounts();
      // console.log(updateStatus);
      updateStatus("Signature Request has been sent at " + accounts[0] + ". Please sign and prove the ownership of this address.");

      let message = 'Welcome to AlphaSpot! \n\nSigning is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does not in any way give  AlPHASPOT permission to perform any  transactions with your wallet.\n\nWallet address:\n';
      if(accounts) {
        setAccount(accounts[0]);
        message += accounts[0];
      } else {
        message += 'No account selected';
      }
      message += '\n\nNonce: ' + generateNonce(32);

      try{  // It means that the signature successed...
        const signature = await signer.signMessage(message);
        console.log(signature);  
        setConnected(true);
        localStorage.setItem("connected", true);
        localStorage.setItem("account", accounts[0]);

        navigate("/Projects");
      } catch (error) {
        console.log("Signature Error:", error);
        updateStatus(error.message);
      }
      // if (accounts) {
      //   setAccount(accounts[0]);
      //   // setNetwork(network);
      //   // register(accounts);
      //   // navigate("/Projects");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
        localStorage.setItem("account", accounts);
        
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    console.log("Wallet connected: ", connected);
  }, []);

  const ToggleSwitchmore = () => {
    more ? setmore(false) : setmore(true);
  };
  const ToggleSwitchLogout = () => {
    logOut ? setLogOut(false) : setLogOut(true);
  };

  let moreRef = useRef(null);
  let logOutRef = useRef(null);

  useEffect(() => {
    if (connectToWalletButton !== undefined) connectToWallet();
  }, [connectToWalletButton]);

  const getAbbrWalletAddress = (walletAddress) => {
    let abbrWalletAddress =
      walletAddress.substring(0, 4) + "..." + walletAddress.substring(38, 42);
    return abbrWalletAddress.toUpperCase();
  };

  return (
    <div className="header">
      <div className="header__top">
        <div className="header__top-inner center-block">
          <div className="header__top-left">
            <Link to="/" className="header__top-logo">
              <img src={logo} alt="" />              
            </Link>
            {!connected ? (
              <></>
            ) : (
              <Link to="/Projects" className="header__top-text">
                Your Projects
              </Link>
            )}{" "}
          </div>
          {!connected ? (
            <div className="header__top-right">
              <Link to={"#"} className="header__top-right-btn">
                Get Started
              </Link>
              <div
                className="header__top-right-info"
                onClick={connectToWallet}
                ref={logOutRef}
              >
                Sign in
              </div>
            </div>
          ) : (
            <div className="header__top-right">
              <Link to={"/Info/new"} className="header__top-right-btn">
                New project
              </Link>
              <div
                className="header__top-right-info"
                onClick={account ? ToggleSwitchLogout : connectToWallet}
                ref={logOutRef}
              >
                {!account ? walletText : getAbbrWalletAddress(account)}
                <i className="icon-Chevron-down"></i>
              </div>
              <div
                className={`header__top-right-dropdown ${
                  logOut ? "active" : ""
                }`}
              >
                <div>Collector Pass</div>
                <Link to="/" className="header__top-right-dropdown-link">
                  Account settings
                </Link>
                <Link to="/" className="header__top-right-dropdown-link">
                  Support
                </Link>
                <Link to="/" className="header__top-right-dropdown-link">
                  License
                </Link>
                <button
                  onClick={() => disconnect()}
                  className="header__top-right-dropdown-link"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}{" "}
        </div>
      </div>
      {props.header ? (
        ""
      ) : (
        <div className="header__bot">
          <div className="header__bot-inner center-block">
            <div className="header__bot-title">Azuki</div>
            <div
              className={`header__bot-more ${more ? "active " : ""}`}
              onClick={ToggleSwitchmore}
              ref={moreRef}
            >
              <span>More</span>
              <i className="icon-Chevron-down"></i>
            </div>
            <div className={`header__bot-nav ${more ? "active" : ""}`}>
              <NavLink to="/Dashboard" className="header__bot-nav-item">
                Analytics
              </NavLink>
              <NavLink to="/Info" className="header__bot-nav-item">
                Project
              </NavLink>
              <NavLink to="/Participants" className="header__bot-nav-item">
                Participants
              </NavLink>
              {/* <NavLink to="/Analytics" className="header__bot-nav-item">
                Settings
              </NavLink> */}
              <NavLink to="/Collabs" className="header__bot-nav-item">
                Collabs
              </NavLink>
              <NavLink
                to={"/" + props.slug}
                className={
                  "header__bot-nav-item " +
                  (!props.slug || props == "undefined" ? "disabled" : "")
                }
                target={"_blank"}
              >
                <i className="icon-link"></i>
                Public Page
              </NavLink>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Header;
