import React, {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import ava from "../assets/images/ava.svg";
import {Link, NavLink} from "react-router-dom";
import WalletContext from "../context/WalletContext";
import {getAllProjects, makeDuplicateProject, removeProject} from "../service/actions";
import {ASSET_BASE} from "../service/config";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [more, setmore] = useState(null);
  const {account} = useContext(WalletContext);
  const [projects, setProjects] = useState([]);
  const [activedId, setActivedId] = useState(0);
  const navigate = useNavigate();
  const {
    slug,
    setSlug
  } = React.useContext(WalletContext);

  useEffect(() => {

    if (!account) 
      return;
    getAllProjects(account).then(res => res.json()).then(res => {
      setProjects(res);
    })
  }, [account]);

  const toggleActive = (projectId) => {
    if (activedId == projectId) {
      setActivedId(0);
      return;
    }
    setActivedId(projectId);
  }

  const editProject = (slug, id) => {
    setSlug(slug);
    localStorage.setItem('slug', slug);
    navigate(`/info/${id}`);
  }

  const deleteProject = (projectId) => {
    if(window.confirm('Do you want to remove this project?')){
      removeProject(projectId, account).then(res => res.json()).then(res => {
        if (res.result) {
          getAllProjects(account).then(res => res.json()).then(res => {
            setProjects(res);
          })
        }
      })  
    }
  }

  const duplicateProject = (projectId) => {
    if(window.confirm('Do you want to duplicate this project?')){
      makeDuplicateProject(projectId).then(res => res.json()).then(res => {
        if(res.status == "success") {
          alert("Successfully Duplicated");
          getAllProjects(account).then(res => res.json()).then(res => {
            setProjects(res);
          })
        }
      })
    }
  }

  return (
    <div className="projects">
      <Header header={true}/>
      <div className="projects__inner center-block">
        <div className="projects__title">All Projects</div>
        <div className="projects__subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="projects__items">
          <div className="projects__items-title">Active Project</div>
          {
            projects.length == 0 &&
              <div className="projects__items-no-content">There is no project assigned to you for now.</div>
          }
          {
          projects.map((project, key) => (
            <div className="projects__items-inner"
              key={key}>
              <div className="projects__item">
                <div className="projects__item-left">
                  <div className="projects__item-left-ava">
                    <img src={
                        project.image ? `${ASSET_BASE}/${
                          project.image
                        }` : ava
                      }
                      alt=""/>
                  </div>
                  <div className="projects__item-left-content">
                    <div className="projects__item-left-title">
                      {
                         <NavLink
                          to={"/" + project.slug}
                          className={
                            (!project.slug || project == "undefined" ? "disabled" : "")
                          }
                          target={"_blank"}
                        >
                        {project.name}
                      </NavLink>
                    }</div>
                    <div className="projects__item-left-subtitle">
                      {
                      project.official_link
                    } </div>
                  </div>
                </div>
              </div>
              <div className="projects__item">
                <div className="projects__item-center">
                  <div className="projects__item-center-block">
                    <div className="projects__item-center-title">
                      Participants
                    </div>
                    <div className="projects__item-center-subtitle">{project.participants_count}</div>
                  </div>
                  <div className="projects__item-center-block">
                    <div className="projects__item-center-title">Referrals</div>
                    <div className="projects__item-center-subtitle">{project.referrals_count}</div>
                  </div>
                  <div className="projects__item-center-block">
                    <div className="projects__item-center-title">Shares</div>
                    <div className="projects__item-center-subtitle">{project.shares_count}</div>
                  </div>
                </div>
              </div>
              <div className="projects__item">
                <div className="projects__item-right">
                  <Link to={`/Dashboard/${project.id}`} className="projects__item-right-btn">
                    Dashboard
                  </Link>
                  <button className="projects__item-right-dropdown">
                    <p onClick={() => {editProject(project.slug, project.id)}}>Edit</p>
                    <i onClick={
                        () => {
                          toggleActive(project.id)
                        }
                      }
                      className="icon-Chevron-down"></i>
                  </button>
                  <div className={
                    `projects__item-right-select ${
                      activedId == project.id ? "active" : ""
                    }`
                  }>
                    <div className="projects__item-right-select-item"
                      onClick={
                        () => duplicateProject(project.id)
                    }>
                      Duplicate
                    </div>
                    <div className="projects__item-right-select-item">
                      Draft
                    </div>
                    <div className="projects__item-right-select-item"
                      onClick={
                        () => deleteProject(project.id)
                    }>
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} 
        </div>
        <div className="projects__footer">
          <div className="projects__footer-socials">
            <a href="/">
              <i className="icon-facebook"></i>
            </a>
            <a href="/">
              <i className="icon-instagram"></i>
            </a>
            <a href="/">
              <i className="icon-twitter"></i>
            </a>
            <a href="/">
              <i className="icon-github"></i>
            </a>
            <a href="/">
              <i className="icon-dribble"></i>
            </a>
          </div>
          <div className="projects__footer-copyright">
            © 2022 AlphaSpot, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
