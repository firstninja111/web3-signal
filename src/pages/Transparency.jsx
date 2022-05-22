import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject } from "../service/actions";

const Transparency = () => {
  const [swirchInput, setSwitchInput] = useState("");
  const [swirchInput2, setSwitchInput2] = useState("");

  const { projectId } = useParams();
  const {account} = useContext(WalletContext);
  const navigate = useNavigate();

  // form data state
  const [formData, setformData] = useState({
  });

  const handleChange = (ev) =>{
    let _name = ev.target.name;
    let _val = ev.target.value;
    setformData({...formData, [_name]: _val});
  }

  const onSubmit = () => {
    // if(!account){
    //   alert('Please login first');
    //   return;
    // }
    
    // const now = new Date();

    // if(projectId == undefined){ // Form Submit for Create
    //   let _formData = {...formData, "wallet_address": account, "name": "Project " + now.getTime(),"description": "<p></p>"};
    //   if(window.confirm('Do you want to create new project?')){
    //     createProject(_formData)
    //       .then(res=>res.json())
    //       .then(res=>{
    //         console.log(res);
    //         navigate('/projects');
    //       })
    //   }
    // } else { // Form Submit for Update
    //   let _formData = {...formData, "wallet_address": account};
    //   if(window.confirm('Do you want to update project info?')){
    //     saveProject(projectId, _formData)
    //       .then(res=>res.json())
    //       .then(res=>{
    //         if(res.status == "ok"){
    //           alert('Saved successfully');
    //         }
    //       })
    //   }
    // }
  }
  
  return (
    <>
      <Header />
      <div className="App__inner">
        <div className="App__inner-content center-block">
          <div className="App__sidebar">
            <SideBar projectId={projectId}/>
          </div>
          <div className="App__routes">
            <div className="transparency">
              <div
                className="transparency__top-wrapper bg"
                style={{ marginBottom: "30px" }}
              >
                <div className="transparency__top">
                  <Title
                    title={"Public Wallet List"}
                    subtitle={
                      "This will add an accessible page that shows the current list of registered wallets."
                    }
                  />
                  <div className="transparency__checkbox">
                    <div className="inputSwitch">
                      <input
                        type="checkbox"
                        id="switcher"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          if (swirchInput) {
                            setSwitchInput("");
                          } else {
                            setSwitchInput(n.target.id);
                          }
                        }}
                      />
                      <label htmlFor="switcher" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                </div>
                {swirchInput === "switcher" ? (
                  <div className="transparency__bottom-text text">
                    Public list of winners will be displayed at
                    <i className="icon-link"></i>
                    <span>https://premint.xyz/waffeles/winners/</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="transparency__bottom bg">
                <div
                  className="transparency__top"
                  style={{ borderBottom: "none", paddingBottom: "0" }}
                >
                  <Title
                    title={"Public Winner List"}
                    subtitle={
                      "This will add an accessible page that shows the list of everyone who is marked as a winner."
                    }
                  />
                  <div className="transparency__checkbox">
                    <div className="inputSwitch">
                      <input
                        type="checkbox"
                        id="switch"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          if (swirchInput2) {
                            setSwitchInput2("");
                          } else {
                            setSwitchInput2(n.target.id);
                          }
                        }}
                      />
                      <label htmlFor="switch" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                </div>
                {swirchInput2 === "switch" ? (
                  <div className="transparency__bottom-text text">
                    Public list of winners will be displayed at
                    <i className="icon-link"></i>
                    <span>https://premint.xyz/waffeles/winners/</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button className="transparency__btn" type="button" onClick={onSubmit}>{projectId == undefined ? 'Create Project' : 'Update Project'}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transparency;
