import React, { useContext, useEffect, useState } from "react";

import ava from "../assets/images/infoAva.svg";
import infoBg from "../assets/images/infoBg.png";
import DraftEditor from "../components/Editor";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import DateTimePicker from "react-datetime-picker";
import queryString from 'query-string';
import calendarruffle from "../assets/images/calendarruffle.svg";
import { getAllProjects, getProjectInfo, createProject, saveProject } from "../service/actions";
import WalletContext from "../context/WalletContext";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { ASSET_BASE } from "../service/config";
import { convertDateStringToDateTime } from "../service/util";
import { useNavigate } from "react-router-dom";

const Info = (props) => {
  const { projectId } = useParams();
  const {account} = useContext(WalletContext);
  const navigate = useNavigate();

  // take draft to get Draft js value
  const [projectInfo, setProjectInfo] = useState({});
  const [draft, setDraft] = useState("");
  const [draftHtml, setContent] = useState("");

  // form data state
  const [formData, setFormData] = useState({
    raffle_time: new Date(), 
    main_color: '#000000'
  });

  /** input date change handler */
  const onDateChange = (_val) => {
    setFormData({...formData, raffle_time: _val});
  }

  /** normal input change handler */
  const handleChange = (ev) =>{
    let _name = ev.target.name;
    let _val = ev.target.value;
    setFormData({...formData, [_name]: _val});
  }

  /** handle file change */
  const handleFileChange = (prevImgId, ev) =>{
    let file = ev.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) =>{
      document.getElementById(prevImgId).src = e.target.result;
    }
    fileReader.readAsDataURL(file);
  }

  /** handle logo change button */
  const handleLogoChange = () =>{
      document.getElementById('logoImgFile').click();
  }
  const handleLogoFileChange = (ev) =>{
    handleFileChange('logoImgPrev', ev);
    setFormData({...formData, "logo": ev.target.files[0]});
  }
  

  /** handle cover change */
  const handleCoverChange = () =>{
    document.getElementById('coverImgFile').click();
  }

  const handleCoverFileChange = (ev) =>{
    handleFileChange("coverImgPrev", ev);
    setFormData({...formData, "cover": ev.target.files[0]});
  }

  const onSubmit = () => {
    if(!account){
      alert('Please login first');
      return;
    }
    
    let _formData = {...formData, "description": draftHtml, "wallet_address": account, raffle_time: convertDateStringToDateTime(formData.raffle_time)};

    if(projectId == undefined){ // Form Submit for Create
      if(window.confirm('Do you want to create new project?')){
        createProject(_formData)
          .then(res=>res.json())
          .then(res=>{
            console.log(res);
            navigate('/projects');
          })
      }
    } else { // Form Submit for Update
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
      setFormData({
        logo: '',
        cover: '',
        name: '',
        slug: '',
        official_link: '',
        main_color: '#000000',
        mint_date: '',
        mint_time: '',
        available_mint_spots: '',
        mint_price: '',
        raffle_time: new Date(),
      });
      setDraft('<p></p>');
      setContent('<p></p>');
      return;
    }
    getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{
      setProjectInfo(res);
      setFormData({
        logo: res.image,
        cover: res.banner_image,
        name: res.name,
        slug: res.slug,
        official_link: res.official_link,
        main_color: res.main_color,
        mint_date: res.mint_date,
        mint_time: res.mint_time,
        available_mint_spots: res.available_mint_spots,
        mint_price: res.mint_price,
        raffle_time: res.raffle_time,
      });
      setDraft(res.description);
      setContent(res.description);
    });
  }, [projectId]);
  
  return (
    <>
      <Header slug={projectInfo.slug}/>

      <div className="App__inner">
        <div className="App__inner-content center-block">
          <div className="App__sidebar">
            <SideBar projectId={projectId}/>
          </div>
          <div className="App__routes">
            <form>
              <div className="info">
                <div className="info__top">
                  <div className="info__top-bg">
                    <img src={formData.cover ? `${ASSET_BASE}/${formData.cover}` : infoBg} alt="" id="coverImgPrev" className="info__top-bg-img" />
                  </div>
                  <div className="info__top-btn">
                    <input type="file" id="coverImgFile" onChange={(ev)=>handleCoverFileChange(ev)} accept="image/*" hidden/>
                    <button type="button" onClick={handleCoverChange}>Change Project Page Banner Image</button>
                  </div>
                  <div className="info__top-left">
                    <div className="info__top-left-ava">
                      <img src={formData.logo ? `${ASSET_BASE}/${formData.logo}` : ava} alt="" id="logoImgPrev" className="img-rounded"/>
                    </div>
                    <input type="file" id="logoImgFile" onChange={(ev)=>handleLogoFileChange(ev)} accept="image/*" hidden/>
                    <button type="button" onClick={handleLogoChange} className="info__top-left-btn">Change Image</button>
                  </div>
                  <div className="info__second">
                    <div className="info__second-items">
                      <div className="info__second-items-title">Name</div>
                      <div className="info__second-items-input">
                        <input type="text" value={formData.name} placeholder="waffles" name="name" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="info__second-items">
                      <div className="info__second-items-title">Slug</div>
                      <div className="info__second-items-input">
                        <input type="text" value={formData.slug} name="slug" onChange={handleChange} />
                        <span>alphaspot.xyz/</span>
                      </div>
                    </div>
                  </div>
                  <div className="info__content bg">
                    <DraftEditor setContent={setContent} html={draft}/>
                  </div>
                  <div className="info__date">
                    <div className="info__date-title">Raffle Time</div>
                    <div className="info__date-subtitle">
                      Collectors always want to know when you'll be picking
                      winners.
                    </div>
                    <div className="info__date-content">
                      <div className="info__date-content-title">
                        Raffle time
                      </div>
                      <div className="custom-date">
                        <DateTimePicker
                          onChange={(_val)=>onDateChange(_val)}
                          value={formData.raffle_time}
                          name="raffle_time"
                          className="custom-date__wrapper"
                          calendarIcon={<i className="icon-calendarruffle"></i>}
                        />
                      </div>
                      <div className="info__date-content-text">
                        UTC Timezone. If you intend to pick winners from this
                        list, when will they be selected? Most collectors really
                        appreciate knowing when they'll find out if they won or
                        not.
                      </div>
                    </div>
                  </div>
                  <div className="info__link">
                    <div className="info__link-item">
                      <div className="info__link-title">Official link</div>
                      <div className="info__link-input">
                        <input type="text" className="input" name="official_link" value={formData.official_link} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="info__link-item">
                      <div className="info__link-title">Main color</div>
                      <div className="info__link-input">
                        <div className="info__link-input-wrapper">
                          <input
                            type="color" name="main_color"
                            value={formData.main_color}
                            onChange={handleChange}
                          />
                        </div>
                        <span>{formData.main_color}</span>
                      </div>
                    </div>
                  </div>
                  <div className="info__mint bg">
                    <div className="info__mint-title">Mint Info</div>
                    <div className="info__mint-items">
                      <div className="info__mint-item">
                        <div className="info__mint-item-title">Mint date</div>
                        <div className="input info__mint-item-input">
                          <input type="date" value={formData.mint_date} name="mint_date" onChange={handleChange}/>
                        </div>
                        <div className="info__mint-item-subtitle">
                          RECOMMENDED. This helps the person who is registering
                          remember to mint.
                        </div>
                      </div>
                      <div className="info__mint-item">
                        <div className="info__mint-item-title">Mint time</div>
                        <div className="input info__mint-item-input">
                          <input type="time" name="mint_time" value={formData.mint_time} onChange={handleChange}/>
                        </div>
                        <div className="info__mint-item-subtitle">
                          Use UTC time zone
                        </div>
                      </div>
                      <div className="info__mint-item">
                        <div className="info__mint-item-title">
                          Available mint spots
                        </div>
                        <div className="input info__mint-item-input">
                          <input type="text" name="available_mint_spots" value={formData.available_mint_spots} onChange={handleChange}/>
                        </div>
                        <div className="info__mint-item-subtitle">
                          If this is a raffle, and you will only choose a subset
                          of the entries, fill this out. If left blank, they are
                          guaranteed a spot.
                        </div>
                      </div>
                      <div className="info__mint-item">
                        <div className="info__mint-item-title">Mint price</div>
                        <div className="input info__mint-item-input">
                          <input type="number" name="mint_price" value={formData.mint_price} onChange={handleChange}/>
                        </div>
                        <div className="info__mint-item-subtitle">
                          Only use this field if currency is ETH
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info__bottom">
                    <div className="info__bottom-title">Collab Only</div>
                    <div className="info__bottom-subtitle">
                      You can set your list to only be joined via official
                      Collab pages. If you do this, you need to set up Collabs
                      in your project dashboard for this list to be usable.
                    </div>
                    <div className="info__bottom-input">
                      <input type="checkbox" name="collab_only" onChange={handleChange}/>
                      <div className="info__bottom-input-text">
                        <span>Registration via Collabs Only</span>
                        <span>
                          The only way to sign up for this list is through a
                          Collab you set up in the dashboard.
                        </span>
                      </div>
                    </div>
                    <div className="info__bottom-btn">
                      <button type="button" onClick={onSubmit}>{projectId == undefined ? 'Create Project' : 'Update Project'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
