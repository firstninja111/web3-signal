import React, { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import trash from "../assets/images/trasher.svg";

import { useLocation, useParams, useSearchParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject } from "../service/actions";
import swal from "sweetalert";


const RegistrationFlow = () => {
  const [switchInput, setSwitchInput] = useState("");
  const [switchInput2, setSwitchInput2] = useState("");

  const { projectId } = useParams();
  const {account} = useContext(WalletContext);
  const [projectInfo, setProjectInfo] = useState({});
  const navigate = useNavigate();

  // form data state
  const [formData, setformData] = useState({
    description: '<p></p>'
  });

  const handleChange = (ev) =>{
    let _name = ev.target.name;
    let _val = ev.target.value;
    setformData({...formData, [_name]: _val});

    let storageFormData = JSON.parse(localStorage.getItem("formData"));
    const object = {...storageFormData,  [_name]: _val};
    localStorage.setItem("formData", JSON.stringify(object));
  }

  const onSubmit = () => {
    if(!account){
      swal("Warning!", "Please login first", "warning");
      return;
    }
    
    const now = new Date();

    if(projectId == undefined){ // Form Submit for Create
      let _formData = {...formData, "wallet_address": account};
      //console.log(_formData);

      swal({
      title: "Are you sure?",
      text: "Do you want to create new project?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
        createProject(_formData)
          .then(res=>res.json())
          .then(res=>{
            //console.log(res);
            navigate('/projects');
          })
        localStorage.removeItem("formData");
      });
    } else { // Form Submit for Update
      let _formData = {...formData, "wallet_address": account};
      swal({
        title: "Are you sure?",
        text: "Do you want to create new project?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        saveProject(projectId, _formData)
          .then(res=>res.json())
          .then(res=>{
            if(res.status == "ok"){
              swal("Success!", "Saved successfully", "success");
            }
          })
      });
    }
  }

  useEffect(()=>{
    if(!projectId || projectId == undefined) {
      var initialObj = {
        eth_balance: '',
        c1_nft_address: '',
        c1_nft_name: '',
        c1_nft_link: '',
        c2_nft_address: '',
        c2_nft_name: '',
        c2_nft_link: '',
        twitter_verification: 0,
        twitter_account: '',
        confirmation_message: 0,
        custom_twitter_content: '',
        discord_verification: 0,
        server_id: '',
        server_name: '',
        server_link: '',
        role_display: '',
        role_label: '',
        custom_field: '',     
      };
      var storageObject = JSON.parse(localStorage.getItem("formData"));
      setformData({...initialObj, ...storageObject});

      setSwitchInput((!storageObject || !storageObject.hasOwnProperty('twitter_verification') || storageObject.twitter_verification != 1) ? "" : "switcher");
      setSwitchInput2((!storageObject || !storageObject.hasOwnProperty('discord_verification') || storageObject.discord_verification != 1) ? "" : "switcherDS");
      return;
    }
    getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{
      //console.log(res);
      setProjectInfo(res);
      setformData({
        eth_balance: res.eth_balance == 'null' ? '' : res.eth_balance,
        c1_nft_address: res.c1_nft_address == 'null' ? '' : res.c1_nft_address,
        c1_nft_name: res.c1_nft_name == 'null' ? '' : res.c1_nft_name,
        c1_nft_link: res.c1_nft_link == 'null' ? '' : res.c1_nft_link,
        c2_nft_address: res.c2_nft_address == 'null' ? '' : res.c2_nft_address,
        c2_nft_name: res.c2_nft_name == 'null' ? '' : res.c2_nft_name,
        c2_nft_link: res.c1_nft_link == 'null' ? '' : res.c1_nft_link,
        twitter_verification: res.twitter_verification,
        twitter_account: res.twitter_account == 'null' ? '' : res.twitter_account,
        confirmation_message: res.confirmation_message,
        custom_twitter_content: res.custom_twitter_content == 'null' ? '' : res.custom_twitter_content,
        discord_verification: res.discord_verification,
        server_id: res.server_id == 'null' ? '' : res.server_id,
        server_name: res.server_name == 'null' ? '' : res.server_name,
        server_link: res.server_link == 'null' ? '' : res.server_link,
        role_display: res.role_display == 'null' ? '' : res.role_display,
        role_label: res.role_label == 'null' ? '' : res.role_label,
        custom_field: res.custom_field == 'null' ? '' : res.custom_field,
      });
      setSwitchInput(res.twitter_verification == 1 ? "switcher" : "");
      setSwitchInput2(res.discord_verification == 1 ? "switcherDS" : "");
    });
  }, [projectId]);

  return (
    <>
      <Header projectId={projectId} header={projectId == undefined} slug={projectInfo.slug}/>
      <div className="App__inner">
        <div className="App__inner-content center-block">
          <div className="App__sidebar">
            <SideBar projectId={projectId}/>
          </div>
          <div className="App__routes">
            
              <div className="registration">
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Wallet Requirements BETA
                  </div>
                  <div className="registration__heading-subtitle">
                    All users will be required to log in, but you can also set
                    other requirements about what is in their wallet.
                  </div>
                </div>
                <div className="registration__wallet bg">
                  <div className="registration__wallet-top">
                    <div className="input-container">
                      <div className="input-container__title">
                        Required ETH Balance
                      </div>
                      <div className="input-container__input">
                        <input type="text" name="eth_balance" value={formData.eth_balance} placeholder="Required ETH Balance" onChange={handleChange}/>
                      </div>
                      <div className="input-container__subtitle">
                        You can require users who register to hold a minimum
                        amount of ETH in their wallet.
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div className="registration__heading-inner">
                      <div className="registration__heading-inner-title">
                        Require user to own an NFT from specific collections?
                        (ETH NFTs only)
                      </div>
                      <div className="registration__heading-inner-subtitle">
                        You can enter two collections below, and the user will
                        need to own an NFT from either one.
                      </div>
                    </div>
                  </div>
                  <div className="registration__wallet-collection">
                    <div className="registration__wallet-collection-item">
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="registration__wallet-collection-title">
                          Collection 1
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Contract Address
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="c1_nft_address"
                              value={formData.c1_nft_address}
                              placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Name
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="c1_nft_name"
                              value={formData.c1_nft_name}
                              placeholder="Bored Ape Yacht Club"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="c1_nft_link"
                              value={formData.c1_nft_link}
                              placeholder="https://opensea.io/collection/boredapeyachtclub"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        {/* <button className="registration__wallet-collection-img">
                          <img src={trash} alt="" />
                        </button> */}
                      </div>
                    </div>
                    <div className="registration__wallet-collection-item">
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="registration__wallet-collection-title">
                          Collection 2
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Contract Address
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="c2_nft_address"
                              value={formData.c2_nft_address}
                              placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Name
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="c2_nft_name"
                              value={formData.c2_nft_name}
                              placeholder="Bored Ape Yacht Club"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="c2_nft_link"
                              value={formData.c2_nft_link}
                              placeholder="https://opensea.io/collection/boredapeyachtclub"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        {/* <button className="registration__wallet-collection-img">
                          <img src={trash} alt="" />
                        </button> */}
                      </div>
                    </div>
                    {/* <div className="registration__wallet-collection-item">
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="registration__wallet-collection-title">
                          Collection 1
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Contract Address
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Name
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="Bored Ape Yacht Club"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <div className="input-container">
                          <div className="input-container__title">
                            NFT Collection Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="https://opensea.io/collection/boredapeyachtclub"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="registration__wallet-collection-item-wrapper">
                        <button className="registration__wallet-collection-img">
                          <img src={trash} alt="" />
                        </button>
                      </div>
                    </div> */}
                    {/* <div className="registration__wallet-add">
                      <span>
                        <i className="icon-plus"></i>Add new Collection
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Twitter Requirements BETA
                  </div>
                  <div className="registration__heading-subtitle">
                    Require users to sign into Twitter before registering for
                    your list.
                  </div>
                </div>
                <div className="registration__twitter bg">
                  <div
                    className="registration__twitter-top"
                    style={{
                      display: "flex",
                      alignItems: " center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="registration__heading-inner">
                      <div className="registration__heading-inner-title">
                        Twitter Verification
                      </div>
                      <div className="registration__heading-inner-subtitle">
                        Require someone to verify themselves on Twitter before
                        joining your list.
                      </div>
                    </div>
                    <div className="inputSwitch" style={{ marginLEft: "10px" }}>
                      <input
                        type="checkbox"
                        id="switcher"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          let _val;
                          if (switchInput) {
                            setSwitchInput("");
                            setformData({...formData, twitter_verification: 0});
                            _val = 0;
                          } else {
                            setSwitchInput(n.target.id);
                            setformData({...formData, twitter_verification: 1});
                            _val = 1;
                          }
                          let storageFormData = JSON.parse(localStorage.getItem("formData"));
                          const object = {...storageFormData,  twitter_verification: _val};
                          localStorage.setItem("formData", JSON.stringify(object));
                        }}
                        checked={formData.twitter_verification == 1 ? 'checked' : ''}
                      />
                      <label htmlFor="switcher" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                  {switchInput === "switcher" ? (
                    <>
                      <div
                        className="input-container"
                        style={{ paddingTop: "30px" }}
                      >
                        <div className="input-container__title">
                          Must Follow
                        </div>
                        <div className="input-container__input">
                          <input 
                            type="text" 
                            name="twitter_account"
                            value={formData.twitter_account}
                            placeholder="Jack" 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-container__subtitle">
                          Require that a user follows a certain account before
                          registering.
                        </div>
                      </div>
                      <div className="registration__twitter-check">
                        <div className="registration__twitter-checkbox">
                          <input type="checkbox" 
                            defaultChecked={formData.confirmation_message == 1 ? 'checked' : ''}
                            name="confirmation_message"
                            onChange={(event) => {
                              let _val;
                              if (formData.confirmation_message == 1) {
                                setformData({...formData, confirmation_message: 0});
                              } else {
                                setformData({...formData, confirmation_message: 1});
                              }
                            }}
                          />
                        </div>
                        <div className="registration__twitter-info">
                          <div className="registration__twitter-info-title">
                            Prompt Users to Tweet?
                          </div>
                          <div className="registration__twitter-info-subtitle">
                            Show a tweet prompt after a user successfully
                            registers telling them to spread the word about the
                            list.
                          </div>
                        </div>
                      </div>
                      <div className="input-container">
                        <div className="input-container__title">
                          Custom Tweet Content
                        </div>
                        <div className="input-container__input">
                          <input
                            type="text"
                            name="custom_twitter_content"
                            value={formData.custom_twitter_content}
                            placeholder="Enter custom text for the tweet prompt. We will attach the URL to the end."
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-container__subtitle">
                          Enter custom text for the tweet prompt. We will attach
                          the URL to the end.
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Discord Requirements BETA
                  </div>
                  <div className="registration__heading-subtitle">
                    Require users to sign into Discord, be a member of your
                    server, and/or have a specific role before registering for
                    your list.
                  </div>
                </div>
                <div className="registration__discord bg">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="registration__twitter-check"
                      style={{ padding: "0" }}
                    >
                      <div className="registration__twitter-info">
                        <div className="registration__twitter-info-title">
                          Discord Verification
                        </div>
                        <div className="registration__twitter-info-subtitle">
                          Require someone to verify themselves on Discord before
                          joining your list.
                        </div>
                      </div>
                    </div>
                    <div
                      className="inputSwitch"
                      style={{ paddingLeft: "10px" }}
                    >
                      <input
                        type="checkbox"
                        id="switcherDS"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          let _val;
                          if (switchInput2) {
                            setSwitchInput2("");
                            setformData({...formData, discord_verification: 0});
                            _val = 0;
                          } else {
                            setSwitchInput2(n.target.id);
                            setformData({...formData, discord_verification: 1});
                            _val = 1;
                          }
                          let storageFormData = JSON.parse(localStorage.getItem("formData"));
                          const object = {...storageFormData,  discord_verification: _val};
                          localStorage.setItem("formData", JSON.stringify(object));
                        }}
                        checked={formData.discord_verification == 1 ? 'checked' : ''}
                      />
                      <label htmlFor="switcherDS" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                  {switchInput2 === "switcherDS" ? (
                    <>
                      <div
                        className="registration__discord-title"
                        style={{ paddingTop: "20px" }}
                      >
                        Require user to be a member of a specific server? (All
                        three fields required){" "}
                        <a href="/">Click here for instructions</a>
                      </div>
                      <div className="registration__discord-inner">
                        <div className="input-container">
                          <div className="input-container__title">
                            Server ID
                          </div>
                          <div className="input-container__input">
                            <input 
                              type="text" 
                              name="server_id"
                              value={formData.server_id}
                              placeholder="6827459345" 
                              onChange={handleChange}
                            />
                          </div>
                          <div className="input-container__subtitle"></div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Server Display Name
                          </div>
                          <div className="input-container__input">
                            <input 
                              type="text" 
                              name="server_name"
                              value={formData.server_name}
                              placeholder="Larva Labs" 
                              onChange={handleChange}
                            />
                          </div>
                          <div className="input-container__subtitle">
                            This will be displayed to the user in the form.
                          </div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Server Link
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="server_link"
                              value={formData.server_link}
                              placeholder="https://discord.gg/larvalabs"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="input-container__subtitle">
                            Add a link so we can direct people to your server
                            who aren't yet members.
                          </div>
                        </div>
                      </div>
                      <div className="registration__discord-title">
                        Require user to be a member of a specific server? (All
                        three fields required){" "}
                        <a href="/">Click here for instructions</a>
                      </div>
                      <div className="registration__discord-inner">
                        <div className="input-container">
                          <div className="input-container__title">
                            Role ID(s)
                          </div>
                          <div className="input-container__input">
                            <input 
                              type="text" 
                              name="role_display"
                              value={formData.role_display}
                              placeholder="85349583985" 
                              onChange={handleChange}
                            />
                          </div>
                          <div className="input-container__subtitle"></div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Role Display Label(s)
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              name="role_label"
                              value={formData.role_label}
                              placeholder="CryptoPunks Owner"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="input-container__subtitle">
                            This will be displayed to the user in the form.
                          </div>
                        </div>
                      </div>
                      <div className="registration__discord-title">
                        Require user to be a member of a specific server? (All
                        three fields required){" "}
                        <a href="/">Click here for instructions</a>
                      </div>
                      <div className="registration__discord-inner">
                        <div className="input-container">
                          <div className="input-container__title">
                            Role ID(s)
                          </div>
                          <div className="input-container__input">
                            <input type="text" placeholder="85349583985" />
                          </div>
                          <div className="input-container__subtitle"></div>
                        </div>
                        <div className="input-container">
                          <div className="input-container__title">
                            Role Display Label(s)
                          </div>
                          <div className="input-container__input">
                            <input
                              type="text"
                              placeholder="CryptoPunks Owner"
                            />
                          </div>
                          <div className="input-container__subtitle">
                            This will be displayed to the user in the form.
                          </div>
                        </div>
                      </div>
                      <div className="registration__discord-banner">
                        Check Multiple Roles: You can check if a user has one of
                        several roles by comma separating role IDs and labels.
                        The user will be required to have one of the roles, not
                        all.
                      </div>
                      <div className="registration__discord-title">
                        Require user joined your server by a certain date
                      </div>
                      <div className="info__date-content-input">
                        <input 
                          type="date" 
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="registration__heading">
                  <div className="registration__heading-title">
                    Custom Field
                  </div>
                  <div className="registration__heading-subtitle">
                    Require that the user fill out an extra form field
                  </div>
                </div>
                <div className="registration__custom bg">
                  <div className="registration__custom-inner">
                    <div className="input-container">
                      <div className="input-container__title">
                        Custom Field Label
                      </div>
                      <div className="input-container__input">
                        <input 
                          type="text" 
                          name="custom_field"
                          value={formData.custom_field}
                          placeholder="Custom Field Label" 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-container__subtitle">
                        If you would like users to fill out a custom field (500
                        character max) with each entry, enter the label for the
                        field here.
                      </div>
                    </div>
                    {/* <button className="registration__custom-inner-img">
                      <img src={trash} alt="" />
                    </button> */}
                  </div>
                  {/* <div className="registration__custom-add">
                    <button>
                      <i className="icon-plus"></i>Add new field
                    </button>
                  </div> */}
                </div>
                <button className="registration__btn" type="button" onClick={onSubmit}>{projectId == undefined ? 'Create Project' : 'Update Project'}</button>
              </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationFlow;
