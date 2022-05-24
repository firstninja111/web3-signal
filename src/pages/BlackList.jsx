import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject } from "../service/actions";

const BlackList = () => {
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

    let storageFormData = JSON.parse(localStorage.getItem("formData"));
    const object = {...storageFormData,  [_name]: _val};
    localStorage.setItem("formData", JSON.stringify(object));
  }

  const onSubmit = () => {
    if(!account){
      alert('Please login first');
      return;
    }
    
    const now = new Date();

    if(projectId == undefined){ // Form Submit for Create
      let _formData = {...formData, "wallet_address": account};

      if(window.confirm('Do you want to create new project?')){
        createProject(_formData)
          .then(res=>res.json())
          .then(res=>{
            //console.log(res);
            navigate('/projects');
          })
        localStorage.removeItem("formData");  
      }
    } else { // Form Submit for Update
      let _formData = {...formData, "wallet_address": account};

      if(window.confirm('Do you want to update project info?')){
        saveProject(projectId, _formData)
          .then(res=>res.json())
          .then(res=>{
            if(res.status == "ok"){
              alert('Saved successfully');
            }
          })
      }
    }
    
  }

  useEffect(()=>{
    if(!projectId || projectId == undefined) {
      var initialObj = {
        banned_ip_hashes: '',
        banned_wallets: '',
      };
      var storageObject = JSON.parse(localStorage.getItem("formData"));
      setformData({...initialObj, ...storageObject});

      return;
    }
    getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{
      //console.log(res);
      // setProjectInfo(res);
      setformData({
        banned_ip_hashes: res.banned_ip_hashes == 'null' ? '' : res.banned_ip_hashes,
        banned_wallets: res.banned_wallets == 'null' ? '' : res.banned_wallets,
      });
    });
  }, [projectId]);


  return (
    <>
      <Header />
      <div className="App__inner">
        <div className="App__inner-content center-block">
          <div className="App__sidebar">
            <SideBar projectId={projectId}/>
          </div>
          <div className="App__routes">
            <form>
              <div className="team">
                <Title
                  title={"Banned Entries"}
                  subtitle={
                    "Ban certain wallets or IPs from your list. They will still be allowed to enter, but they will not be included in exports and will not be picked as winners."
                  }
                />
                <div className="team__inner">
                  <div className="input-container">
                    <div className="input-container__title">
                      Banned ip hashes
                    </div>
                    <textarea 
                      name="banned_ip_hashes"
                      value={formData.banned_ip_hashes}
                      placeholder="Banned ip hashes" 
                      onChange={handleChange}>
                      {formData.banned_ip_hashes}
                    </textarea>
                    <div className="input-container__subtitle">
                      One per line. These IP address hashes will be marked as
                      banned and be ignored when selecting winners and exporting
                      data.
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-container__title">Banned wallets</div>
                    <textarea 
                      name="banned_wallets"
                      value={formData.banned_wallets}
                      placeholder="Banned wallets" 
                      onChange={handleChange}>
                      {formData.banned_wallets}
                    </textarea>
                    <div className="input-container__subtitle">
                      One per line. These wallet address will be marked as
                      banned and be ignored when selecting winners and exporting
                      data.
                    </div>
                  </div>
                </div>
                <button className="signup__btn" type="button" onClick={onSubmit}>{projectId == undefined ? 'Create Project' : 'Update Project'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackList;
