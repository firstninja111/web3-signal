import React, { useContext, useEffect, useState, useLayoutEffect } from "react";

import ttw from "../assets/images/tiktokw.svg";
import tipndo from "../assets/images/tipndo.png";
import { getProjectDetail } from "../service/actions";
import { API_BASE, ASSET_BASE } from "../service/config";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";

const Main = () => {
  const {account} = useContext(WalletContext);
  const { slug } = useParams();

  // form data state
  const [formData, setformData] = useState({

  }); 


  useEffect(() => {
    getProjectDetail(slug, account)
    .then(res=>res.json())
    .then(res=>{
      if(res.main_color == "black")
      {
        console.log("black");
        window.document.getElementsByTagName("html")[0].style.backgroundColor = "black";
      } else {
        window.document.getElementsByTagName("html")[0].style.backgroundColor = "white";
      }
      setformData(res);
    })
  }, []);

  return (
    <div className={`${formData.main_color == 'black' ? 'black' : ''} main`}>
      <div
        className={`${formData.main_color == 'black' ? 'black' : ''} center-block`}
        style={{ position: "relative", zIndex: "1" }}
      >
        <div className={`${formData.main_color == 'black' ? 'black' : ''} main__logo mobile`}>
          <img className="img-rounded" src={`${ASSET_BASE + '/' + formData.image}`} alt="" />
        </div>
        <div className={`${formData.main_color == 'black' ? 'black' : ''} main__content`}>
          <div className={`${formData.main_color == 'black' ? 'black' : ''} main__left`}>
            <div className={`${formData.main_color == 'black' ? 'black' : ''} main__logo`}>
              <img className="img-rounded" src={`${ASSET_BASE + '/' + formData.image}`} alt="" />
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
                    <img className="img-rounded" src={`${ASSET_BASE + '/' + formData.image}`} alt="" />
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
            <button className={`${formData.main_color == 'black' ? 'black' : ''} main__right-btn`}>Connect Wallet</button>
          </div>
        </div>
      </div>
      <div className={`${formData.main_color == 'black' ? 'black' : ''} main__bg`}>
        <img src={`${ASSET_BASE + '/' + formData.banner_image}`} alt="" />
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
