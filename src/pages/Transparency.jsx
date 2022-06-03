import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";
import swal from "sweetalert";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject } from "../service/actions";

const Transparency = () => {
  const [swirchInput, setSwitchInput] = useState("");
  const [swirchInput2, setSwitchInput2] = useState("");
  const [projectInfo, setProjectInfo] = useState({});


  const { projectId } = useParams();
  const {account} = useContext(WalletContext);
  const navigate = useNavigate();

  // form data state
  const [formData, setformData] = useState({
  });

  // const handleChange = (ev) =>{
  //   let _name = ev.target.name;
  //   let _val = ev.target.value;
  //   setformData({...formData, [_name]: _val});
  // }

  const onSubmit = () => {
    if(!account){
      swal("Warning!", "Please login first", "warning");
      return;
    }

    if(projectId == undefined){ // Form Submit for Create
      let _formData = {...formData, "wallet_address": account};
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
            navigate('/projects');
          })
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
        public_wallet_list: 0,
        public_winner_list: 0,
      };
      var storageObject = JSON.parse(localStorage.getItem("formData"));
      setformData({...initialObj, ...storageObject});

      setSwitchInput((!storageObject || !storageObject.hasOwnProperty('public_wallet_list') || storageObject.public_wallet_list != 1) ? "" : "switcher");
      setSwitchInput2((!storageObject || !storageObject.hasOwnProperty('public_winner_list') || storageObject.public_winner_list != 1) ? "" : "switcherDS");
      return;
    }
    getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{
      //console.log(res);
      setProjectInfo(res);
      setformData({
        public_wallet_list: res.public_wallet_list,
        public_winner_list: res.public_winner_list,
      });
      setSwitchInput(res.public_wallet_list == 1 ? "switcher" : "");
      setSwitchInput2(res.public_winner_list == 1 ? "switcherDS" : "");
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
                          let _val;
                          if (swirchInput) {
                            setSwitchInput("");
                            setformData({...formData, public_wallet_list: 0});
                            _val = 0;
                          } else {
                            setSwitchInput(n.target.id);
                            setformData({...formData, public_wallet_list: 1});
                            _val = 1;
                          }
                          let storageFormData = JSON.parse(localStorage.getItem("formData"));
                          const object = {...storageFormData,  public_wallet_list: _val};
                          localStorage.setItem("formData", JSON.stringify(object));
                        }}
                        checked={formData.public_wallet_list == 1 ? 'checked' : ''}
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
                    <span>https://alphaspot.xyz/waffeles/winners/</span>
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
                        id="switcherDS"
                        className="inputSwitch-input"
                        onChange={(n) => {
                          let _val;
                          if (swirchInput2) {
                            setSwitchInput2("");
                            setformData({...formData, public_winner_list: 0});
                            _val = 0;
                          } else {
                            setSwitchInput2(n.target.id);
                            setformData({...formData, public_winner_list: 1});
                            _val = 1;
                          }
                          let storageFormData = JSON.parse(localStorage.getItem("formData"));
                          const object = {...storageFormData,  public_winner_list: _val};
                          localStorage.setItem("formData", JSON.stringify(object));
                        }}
                        checked={formData.public_winner_list == 1 ? 'checked' : ''}
                      />
                      <label htmlFor="switcherDS" className="inputSwitch-label">
                        Toggle
                      </label>
                    </div>
                  </div>
                </div>
                {swirchInput2 === "switcherDS" ? (
                  <div className="transparency__bottom-text text">
                    Public list of winners will be displayed at
                    <i className="icon-link"></i>
                    <span>https://alphaspot.xyz/waffeles/winners/</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button className="signup__btn" type="button" onClick={onSubmit}>{projectId == undefined ? 'Create Project' : 'Update Project'}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transparency;
