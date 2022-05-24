import React, { useContext, useEffect, useState, useLayoutEffect } from "react";

import ttw from "../assets/images/tiktokw.svg";
import tipndo from "../assets/images/tipndo.png";
import { getProjectDetail } from "../service/actions";
import { API_BASE, ASSET_BASE } from "../service/config";
import ava from "../assets/images/infoAva.svg";
import infoBg from "../assets/images/infoBg.png";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { FaTimesCircle } from "react-icons/fa";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

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

const Main = () => {
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

  const { slug } = useParams();

  // form data state
  const [formData, setformData] = useState({    
  }); 
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [status, updateStatus] = useState('');


  //  ========== Wallet Connection and Disconetion part ======== //
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
      setProvider(provider);
      setLibrary(library);

      // ======== Signature Part ========= //
      const signer = library.getSigner();
      const accounts = await library.listAccounts();
      // //console.log(updateStatus);
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
        //console.log(signature);  
        setConnected(true);
        localStorage.setItem("connected", true);
        localStorage.setItem("account", accounts[0]);
        updateStatus('');
      } catch (error) {
        //console.log("Signature Error:", error);
        updateStatus(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    localStorage.removeItem("connected");
    setAccount(null);
    localStorage.removeItem("account");
    setChainId(null);
    setWalletText("Sign In");
    setWeb3Instance(null);
  }

  // ============================================================= //

  useEffect(() => {
    getProjectDetail(slug)
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      if(res.main_color == "black")
      {
        //console.log("black");
        window.document.getElementsByTagName("html")[0].style.backgroundColor = "black";
      } else {
        window.document.getElementsByTagName("html")[0].style.backgroundColor = "white";
      }
      setformData(res);
    })
  }, []);

  const getAbbrWalletAddress = (walletAddress) => {
    let abbrWalletAddress =
      walletAddress.substring(0, 4) + "..." + walletAddress.substring(38, 42);
    return abbrWalletAddress.toUpperCase();
  };

  return (
    <div className={`${formData.main_color == 'black' ? 'black' : ''} main`}>
      <div
        className={`${formData.main_color == 'black' ? 'black' : ''} center-block`}
        style={{ position: "relative", zIndex: "1" }}
      >
        <div className={`${formData.main_color == 'black' ? 'black' : ''} main__logo mobile`}>
          <img className="img-rounded" src={formData.image ? `${ASSET_BASE}/${formData.image}` : ava} alt="" />
        </div>
        <div className={`${formData.main_color == 'black' ? 'black' : ''} main__content`}>
          <div className={`${formData.main_color == 'black' ? 'black' : ''} main__left`}>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__logo`}>
              <img className="img-rounded" src={formData.image ? `${ASSET_BASE}/${formData.image}` : ava} alt="" />
            </div>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__links`}>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__links-title`}>{formData.name}</div>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__links-items`}>
                <a href="#" className={`${formData.main_color == 'black' ? 'black' : ''} main__links-item`}>
                  <i className={`${formData.main_color == 'black' ? 'black' : ''} icon-twitter`}></i>
                </a>
                <a href="#" className={`${formData.main_color == 'black' ? 'black' : ''} main__links-item`}>
                  <i className={`${formData.main_color == 'black' ? 'black' : ''} icon-instagram`}></i>
                </a>
                <a href="#" className={`${formData.main_color == 'black' ? 'black' : ''} main__links-item`}>
                  {
                    formData.main_color != 'black' &&
                    <i className="icon-tiktok">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                    </i>
                  }
                  {
                    formData.main_color == 'black' &&
                    <img src={ttw} alt=""/>
                  }
                </a>
              </div>
              <a href={`${formData.official_link}`} className={`${formData.main_color == 'black' ? 'black' : ''} main__links-link`}>
                <i className={`${formData.main_color == 'black' ? 'black' : ''} icon-link`}></i>
                <span>{formData.official_link}</span>
              </a>
            </div>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__items`}>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item`}>
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-inner`}>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-top`}>Registration Closes</div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-bot`}>
                    {formData.registration_end_date == null ? '' : formData.registration_end_date.substring(0, 10)}
                  </div>
                </div>
              </div>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item`}>
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-inner`}>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-top`}>Spots Available</div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-bot`}> {formData.available_mint_spots == 'null' ? '' : formData.available_mint_spots} Spots</div>
                </div>
              </div>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item`}>
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-inner`}>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-top`}>Official Link</div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-bot`}>{formData.official_link == 'null' ? '' : formData.official_link}</div>
                </div>
              </div>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item`}>
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-inner`}>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-top`}>Mint Date</div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-bot`}>
                    {formData.mint_date == null ? '' : formData.mint_date.substring(0, 10)}
                  </div>
                </div>
              </div>
              <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item`}>
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-inner`}>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-top`}>Mint Price</div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__item-bot`}>{formData.mint_price == 'null' ? '' : formData.mint_price} ETH</div>
                </div>
              </div>
            </div>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__text`} dangerouslySetInnerHTML={{__html: formData.description}}>
              
            </div>
          </div>
          <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right`}>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-title`}>
              Follow the steps below to add yourself to this list.
            </div>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-items`}>
              {
                formData.twitter_verification == 1 &&
                <div
                  className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item`}
                  style={{ justifyContent: "flex-start" }}
                >
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-icon`}>
                    <i className="icon-twitter"></i>
                  </div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-info`}>
                    <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-title`}>Twitter</div>
                    <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-text`}>
                      Follow <a href="/">{formData.twitter_account}</a> on twitter
                    </div>
                  </div>
                </div>
              }
              {
                formData.discord_verification == 1 &&
                <div
                  className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item`}
                  style={{ justifyContent: "flex-start" }}
                >
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-icon`}>
                    <i className="icon-discord"></i>
                  </div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-info`}>
                    <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-title`}>Discord</div>
                    <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-text`}>
                      Join the <a href={`${formData.server_link}`}> {formData.server_name}</a> Discord and have the
                      <a href="/"> {formData.role_label}</a> role
                    </div>
                  </div>
                </div>
              }
              <div
                className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item`}
                style={{ justifyContent: "flex-start" }}
              >
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-icon`}>
                  <i className="icon-eth"></i>
                </div>
                <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-info`}>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-title`}>Wallet</div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-text`}>
                    Have at least <span> {formData.eth_balance} ETH</span> on your Wallet
                  </div>
                </div>
              </div>
              {
                formData.c1_nft_name != "null" &&
                <div
                  className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item`}
                  style={{ justifyContent: "flex-start" }}
                >
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-icon`}>
                    <img className="img-rounded" src={formData.image ? `${ASSET_BASE}/${formData.image}` : ava} alt="" />
                  </div>
                  <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-info`}>
                    <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-title`}>Azuki</div>
                    <div className={`${formData.main_color == 'black' ? 'black' : ''} main__right-item-text`}>
                      Hold one<a href={`${formData.c1_nft_link}`}> {formData  .c1_nft_name}</a> NFT
                    </div>
                  </div>
                </div>
              }
            </div>
            {
              connected &&
              <div className="main__right-btn" style={{display: 'flex', justifyContent : 'center', fontSize: '20px', alignItems: 'center'}}>
                <span>{getAbbrWalletAddress(account)}</span>
                <span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={disconnectWallet}><FaTimesCircle/></span>
              </div>
              // <button className={`${formData.main_color == 'black' ? 'black' : ''} main__right-btn`}>{getAbbrWalletAddress(account)}</button>
            }
            {
              !connected &&
              <div>
              <button className={`${formData.main_color == 'black' ? 'black' : ''} main__right-btn`} onClick={connectToWallet}>Connect Wallet</button>
              <p style={{marginTop: '10px'}}>{status}</p>
              </div>
            }
            
          </div>
        </div>
      </div>
      <div className={`${formData.main_color == 'black' ? 'black' : ''} main__bg`}>
        <img src={formData.banner_image ? `${ASSET_BASE}/${formData.banner_image}` : infoBg}  alt="" />
      </div>
      <div className={`${formData.main_color == 'black' ? 'black' : ''} main__tipndo`}>
        <div className={`${formData.main_color == 'black' ? 'black' : ''} main__tipndo-img`}>
          <img src={tipndo} alt="" />
        </div>
        <span>Powered by Tipndo.</span>
      </div>
    </div>
  );
};

export default Main;
