import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";
import swal from "sweetalert";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject, addTeam } from "../service/actions";

const Team = () => {
  const { projectId } = useParams();
  const {account} = useContext(WalletContext);
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState({});


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
        admin_wallets: '',
      };
      var storageObject = JSON.parse(localStorage.getItem("formData"));
      setformData({...initialObj, ...storageObject});
      return;
    }
    getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{
      setProjectInfo(res);
      setformData({
        admin_wallets: res.admin_wallets == 'null' ? '' : res.admin_wallets,
      });
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
                    <textarea
                        placeholder="Admin wallet addresses"
                        className="input-container__input"
                        name="admin_wallets"
                        value={formData.admin_wallets}
                        onChange={handleChange}
                    />
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
