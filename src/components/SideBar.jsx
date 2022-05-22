import React, { useEffect, useState, useRef } from "react";
import bookmark from "../assets/images/navbar/Bookmark.svg";
import cube from "../assets/images/navbar/Cube.svg";
import user from "../assets/images/navbar/User-add.svg";
import check from "../assets/images/navbar/Badge-check.svg";
import users from "../assets/images/navbar/User-group.svg";
import x from "../assets/images/navbar/X-circle.svg";
import message from "../assets/images/navbar/Mail.svg";
import { NavLink } from "react-router-dom";

const SideBar = (projectId) => {  
  const [more, setmore] = useState(false);

  const ToggleSwitchmore = () => {
    more ? setmore(false) : setmore(true);
  };

  let moreRef = useRef(null);

  const handlemoreToggle = (event) => {
    if (moreRef.current && !moreRef.current.contains(event.target)) {
      setmore(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handlemoreToggle);

    return () => {
      document.removeEventListener("click", handlemoreToggle);
    };
  }, []);

  return (
    <div className={`sidebar ${more ? "active" : ""}`}>
      <div className={`sidebar__inner ${more ? "active" : ""}`}>
        {/* <NavLink to={"/Info/" + projectId !==""?projectId:'new'} className="sidebar__nav"> */}
        <NavLink to={projectId.projectId == undefined ? '/info/new' : '/info/' + projectId.projectId} className="sidebar__nav">
          <img src={bookmark} alt="" /> <span>Project Info</span>
        </NavLink>
        <NavLink to={projectId.projectId == undefined ? '/RegistrationFlow/new' : '/RegistrationFlow/' + projectId.projectId} className="sidebar__nav">
          <img src={cube} alt="" />
          <span> Registration Flow</span>
        </NavLink>
        <NavLink to={projectId.projectId == undefined ? '/SignUp/new' : '/SignUp/' + projectId.projectId} className="sidebar__nav">
          <img src={user} alt="" /> <span>Signup Access</span>
        </NavLink>
        <NavLink to={projectId.projectId == undefined ? '/Transparency/new' : '/Transparency/' + projectId.projectId} className="sidebar__nav">
          <img src={check} alt="" /> <span>Transparency</span>
        </NavLink>
        <NavLink to={projectId.projectId == undefined ? '/Team/new' : '/Team/' + projectId.projectId} className="sidebar__nav">
          <img src={users} alt="" /> <span>Team</span>
        </NavLink>
        <NavLink to={projectId.projectId == undefined ? '/BlackList/new' : '/BlackList/' + projectId.projectId} className="sidebar__nav">
          <img src={x} alt="" /> <span>Black liste</span>
        </NavLink>
        <NavLink to={projectId.projectId == undefined ? '/Message/new' : '/Message/' + projectId.projectId} className="sidebar__nav">
          <img src={message} alt="" /> <span>Message</span>
        </NavLink>
      </div>
      <div
        className={`sidebar__toggle ${more ? "active" : ""}`}
        onClick={ToggleSwitchmore}
        ref={moreRef}
      >
        <i className="icon-Chevron-Right"></i>
      </div>
    </div>
  );
};

export default SideBar;
