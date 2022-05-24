import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject } from "../service/actions";

const Team = () => {
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
    //   let _formData = {...formData, "wallet_address": account};
    //   if(window.confirm('Do you want to create new project?')){
    //     createProject(_formData)
    //       .then(res=>res.json())
    //       .then(res=>{
    //         //console.log(res);
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
            <form>
              <div className="team">
                <Title
                  title={"Team"}
                  subtitle={
                    "If there are other people you'd like to be able to see the entries and make changes to your PREMINT settings, add their wallet addresses here."
                  }
                />
                <div className="team__inner">
                  <div className="input-container">
                    <div className="input-container__title">
                      Admin wallet addresses
                    </div>
                    <textarea placeholder="Admin wallet addresses" />
                    <div className="input-container__subtitle">
                      Add wallet addresses for users that are allowed to serve
                      as admins for this project.
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

export default Team;
