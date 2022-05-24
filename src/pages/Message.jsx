import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";

import { useParams } from "react-router-dom";
import WalletContext from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { getProjectInfo, createProject, saveProject } from "../service/actions";

const Message = () => {
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
      //console.log(_formData);
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
        winner_title: '',
        winner_message: '',
        nonwinner_title: '',
        nonwinner_message: '',
        waitlist_title: '',
        waitlist_message: '',
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
        winner_title: res.winner_title == 'null' ? '' : res.winner_title,
        winner_message: res.winner_message == 'null' ? '' : res.winner_message,
        nonwinner_title: res.nonwinner_title == 'null' ? '' : res.nonwinner_title,
        nonwinner_message: res.nonwinner_message == 'null' ? '' : res.nonwinner_message,
        waitlist_title: res.waitlist_title == 'null' ? '' : res.waitlist_title,
        waitlist_message: res.waitlist_message == 'null' ? '' : res.waitlist_message,
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
              <div className="message">
                <div className="message__wrapper">
                  <Title
                    title={"Winner Message"}
                    subtitle={
                      "This will be shown to winners on the registration page and the verification page."
                    }
                  />
                  <div className="message__inner bg">
                    <div className="input-container">
                      <div className="input-container__title">Winner title</div>
                      <div className="input-container__input">
                        <input 
                          type="text" 
                          name="winner_title"
                          value={formData.winner_title}
                          onChange={handleChange}
                          placeholder="Winner title" 
                        />
                      </div>
                      <div className="input-container__subtitle">
                        What is the title for your winner section? Default: You
                        were selected!
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Winner message
                      </div>
                      <textarea
                        placeholder="Winner message"
                        className="input-container__input"
                        name="winner_message"
                        value={formData.winner_message}
                        onChange={handleChange}
                      />
                      <div className="input-container__subtitle">
                        What message would you like to display to wallets that
                        were selected?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message__wrapper">
                  <Title
                    title={"Non-Winner Message"}
                    subtitle={
                      "This will be shown to wallets who did not win the raffle."
                    }
                  />
                  <div className="message__inner bg">
                    <div className="input-container">
                      <div className="input-container__title">
                        Nonwinner title
                      </div>
                      <div className="input-container__input">
                        <input 
                          type="text" 
                          name="nonwinner_title"
                          value={formData.nonwinner_title}
                          onChange={handleChange}
                          placeholder="Nonwinner title" 
                        />
                      </div>
                      <div className="input-container__subtitle">
                        What is the title for your non-winner section? Default:
                        You were not selected!
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Nonwinner message
                      </div>
                      <textarea
                        placeholder="Nonwinner message"
                        className="input-container__input"
                        name="nonwinner_message"
                        value={formData.nonwinner_message}
                        onChange={handleChange}
                      />
                      <div className="input-container__subtitle">
                        What message would you like to display to wallets that
                        were not selected?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message__wrapper">
                  <Title
                    title={"Waitlist Message"}
                    subtitle={
                      "If you choose to add some wallets to a waitlist, they will see this message."
                    }
                  />
                  <div className="message__inner bg">
                    <div className="input-container">
                      <div className="input-container__title">
                        Waitlist title
                      </div>
                      <div className="input-container__input">
                        <input 
                          type="text" 
                          name="waitlist_title"
                          value={formData.waitlist_title}
                          onChange={handleChange}
                          placeholder="Waitlist title" 
                        />
                      </div>
                      <div className="input-container__subtitle">
                        What is the title for your waitlist section? Default:
                        You're on the waitlist!
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-container__title">
                        Waitlist message
                      </div>
                      <textarea
                        placeholder="Waitlist message"
                        className="input-container__input"
                        name="waitlist_message"
                        value={formData.waitlist_message}
                        onChange={handleChange}
                      />
                      <div className="input-container__subtitle">
                        What message would you like to display to wallets that
                        are on the waitlist?
                      </div>
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

export default Message;
