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
        <NavLink to={"/Info/" + projectId !==""?projectId:'new'} className="sidebar__nav">
          <img src={bookmark} alt="" /> <span>Project Info</span>
        </NavLink>
        <NavLink to="/RegistrationFlow" className="sidebar__nav">
          <img src={cube} alt="" />
          <span> Registration Flow</span>
        </NavLink>
        <NavLink to="/SignUp" className="sidebar__nav">
          <img src={user} alt="" /> <span>Signup Access</span>
        </NavLink>
        <NavLink to="/Transparency" className="sidebar__nav">
          <img src={check} alt="" /> <span>Transparency</span>
        </NavLink>
        <NavLink to="/Team" className="sidebar__nav">
          <img src={users} alt="" /> <span>Team</span>
        </NavLink>
        <NavLink to="/BlackList" className="sidebar__nav">
          <img src={x} alt="" /> <span>Black liste</span>
        </NavLink>
        <NavLink to="/Message" className="sidebar__nav">
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
