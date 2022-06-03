import React from "react";
import Header from "../components/Header";
import ava from "../assets/images/Avatar.png";
import pen from "../assets/images/Pencil.svg";
import { Link, NavLink, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { getProjectInfo, getCollabs} from "../service/actions";
import WalletContext from "../context/WalletContext";

const Collabs = () => {
  const { projectId } = useParams();
  const [slug, setSlug] = useState();
  const {account} = useContext(WalletContext);
  const [collabs, setCollabs] = useState([]);
  const [spotsTotal, setSpotsTotal] = useState(0);
  const [projectInfo, setProjectInfo] = useState({});

  const getProjectData = async(projectId) => {
    let _slug;
    await getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{      
      setProjectInfo(res);
      _slug = res.slug;
    });
    return _slug;
  }

  useEffect(() => {
    
    if(!projectId || projectId == undefined) {
      return;
    }
    getProjectData(projectId).then(res=>{
      const _slug = res;
      getCollabs(account, _slug).then(res=>res.json())
        .then(res=>{
          if(res.status == 'success')
          {
            let i = 0;
            let spots_total = 0;
            let _collabs = [];
            while(res.hasOwnProperty(i)){
              _collabs.push(res[i]);
              spots_total += res[i].spots;
              i++;
            }
            setSpotsTotal(spots_total);
            setCollabs(_collabs);
          }
        })
      setSlug(_slug);
    });

  }, [projectId]);

  return (
    <div>
      <Header projectId={projectId} header={projectId == undefined} slug={projectInfo.slug}/>
      <div className="collabs ">
        <div className="collabs__inner center-block">
          <div className="collabs__top">
            <div className="collabs__title">Collabs</div>
            <Link to={`/Collabs/${projectId}/create`} className="collabs__new">
              <i className="icon-plus"></i>Create New
            </Link>
          </div>
          <div className="collabs__subtitle">
            PREMINT Collabs make it easy to offer a different community spots on
            your list, and creates a dedicated registration page. All
            registrations will appear on your waffeles list. A wallet can only
            register on your list once.
          </div>
          <div className="collabs__statistics">
            <div className="collabs__statistics-item">
              <div className="collabs__statistics-item-title">Collabs</div>
              <div className="collabs__statistics-item-count">{collabs.length}</div>
            </div>
            <div className="collabs__statistics-item">
              <div className="collabs__statistics-item-title">
                Spots Offered
              </div>
              <div className="collabs__statistics-item-count">{spotsTotal}</div>
            </div>
            <div className="collabs__statistics-item">
              <div className="collabs__statistics-item-title">
                Total Entries
              </div>
              <div className="collabs__statistics-item-count">128</div>
            </div>
          </div>
          {
            collabs.map((collab, key) => {
              return <div className="collabs__block" key={key}>
                <div className="collabs__block-top">
                  <div className="collabs__block-top-left">
                    <div className="collabs__block-top-img">
                      <img src={collab.image} alt="" />
                      {/* <img src={ava} alt="" /> */}
                    </div>
                    <div className="collabs__block-top-info">
                      <div className="collabs__block-top-title">
                        {collab.name}
                      </div>
                      <div className="collabs__block-top-subtitle">
                        Product Designer
                      </div>
                    </div>
                  </div>
                  <div className="collabs__block-top-right">
                    <NavLink to={"/Collabs/" + projectId + "/" + collab.id + "/edit"}>
                    <button className="collabs__block-top-right-edit">
                      <img src={pen} alt="" /> Edit
                    </button>
                    </NavLink>
                    <NavLink to={"/" + slug + "-" + collab.name} target="_blank">
                    <button className="collabs__block-top-right-view">
                      <i className="icon-link"></i>View Offer Page
                    </button>
                    </NavLink>
                  </div>
                </div>
                <div className="collabs__block-bot">
                  <div className="collabs__block-bot-item">
                    <div className="collabs__block-bot-item-inner">Spots : {collab.spots}</div>
                  </div>
                  <div className="collabs__block-bot-item">
                    <div className="collabs__block-bot-item-inner">Entries : 0</div>
                  </div>
                </div>
              </div>
            })
          }
          
          <div className="collabs__footer">
            Note: People registering through the{" "}
            <span>PREMINT Collector Pass</span> will not be required to follow
            the requirements set by the original project.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collabs;
