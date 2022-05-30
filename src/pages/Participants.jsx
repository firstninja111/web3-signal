import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../components/Header";
import ava from "../assets/images/Avatar.svg";
import Title from "../components/Title";
import { getParticipants, getProjectInfo, deleteParticipant } from "../service/actions";
import WalletContext from "../context/WalletContext";
import { useParams } from "react-router-dom";

const Participants = () => {
  const initialArray = [];
  const [more, setmore] = useState(false);
  const [tab, setTab] = useState(1);
  const {account} = useContext(WalletContext);
  const [participants, setParticipants] = useState(initialArray);
  const [slug, setSlug] = useState();
  const { projectId } = useParams();
  
  const ToggleSwitchmore = () => {
    more ? setmore(false) : setmore(true);
  };

  let moreRef = useRef(null);

  const getProjectData = async(projectId) => {
    let _slug;
    await getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{      
      _slug = res.slug;
    });
    return _slug;
  }

  const removeParticipant = (participant_id) => {
    if(!window.confirm('Do you want to delete participant?'))
      return;
      
    deleteParticipant(account, slug, participant_id).then(res=>res.json())
      .then(res => {
         if(res.status == 'true')
         {
           window.location.reload();
         }
      })
  }

  const handlemoreToggle = (event) => {
    if (moreRef.current && !moreRef.current.contains(event.target)) {
      setmore(false);
    }
  };

  useEffect(() => {
    if(!projectId || projectId == undefined) 
      return;

    if (!account || slug == "invalid") 
      return;

    getProjectData(projectId).then(res=>{
      const _slug = res;
      setSlug(_slug);

      getParticipants(account, _slug).then(res=>res.json())
        .then(res => {
          if(res.status != "error"){
            let i = 0;
            let _participants = [];
            while(res.hasOwnProperty(i)){
              _participants.push(res[i]);
              i++;
            }
            console.log(_participants);
            setParticipants(_participants);
          } else {
            setParticipants([]);
          }
        })
    });
  }, [projectId]);

  // useEffect(() => {
  //   document.addEventListener("click", handlemoreToggle);
    
  //   return () => {
  //     document.removeEventListener("click", handlemoreToggle);
  //   };
  // }, []);

  const getAbbrWalletAddress = (walletAddress) => {
    let abbrWalletAddress =
      walletAddress.substring(0, 6) + "..." + walletAddress.substring(38, 42);
    return abbrWalletAddress.toUpperCase();
  };

  const getDateTimeFormat = (dateTime) => {
    let abbrDate = 
      dateTime.substring(0, 10) + " " + dateTime.substring(11, 19);

    return abbrDate;
  }

  return (
    <div className="participants">
      <Header projectId={projectId} header={projectId == undefined} slug={slug}/>
      <div className="participants__inner center-block">
        <div className="participants__top">
          <div className="participants__tabs">
            <div
              className={`participants__tabs-tabpane ${
                tab === 1 ? "active" : ""
              }`}
              onClick={() => setTab(1)}
            >
              Full List
            </div>
            <div
              className={`participants__tabs-tabpane ${
                tab === 2 ? "active" : ""
              }`}
              onClick={() => setTab(2)}
            >
              Pick Winners
            </div>
          </div>
          {tab === 1 ? (
            <div className="participants__select" ref={moreRef}>
              <div
                className="participants__select-btn"
                onClick={ToggleSwitchmore}
              >
                Export
                <i className={`icon-Chevron-down ${more ? "active" : ""}`}></i>
              </div>
              <div
                className={`participants__select-dropdown ${
                  more ? "active" : ""
                }`}
              >
                <button>Full CSV</button>
                <button>Plain Text Wallet List</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {tab === 1 ? (
          <div className="participants__list">
            <div className="participants__list-search">
              <input type="search" placeholder="Search" />
            </div>
            <div className="participants__list-table">
              <table>
                <thead>
                  <tr>
                    <th>Wallet</th>
                    <th>Twitter</th>
                    <th>Discord</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    participants.map((participant, key) => {
                      return <tr key = {key}>
                          <td>
                            <div className="participants__list-table-wallet">
                              <div className="participants__list-table-img">
                                <img src={ava} alt="" />
                              </div>
                              <div className="participants__list-table-info">
                                <span>{getAbbrWalletAddress(participant.wallet_address)}</span>
                                <span>{getDateTimeFormat(participant.created_at)}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="participants__list-table-twitter">
                              <span>{participant.twitter_username}</span>
                              {/* <span>10 Followers</span> */}
                            </div>
                          </td>
                          <td>
                            <div className="participants__list-table-discord">
                              <span>{participant.discord_username}</span>
                            </div>
                          </td>
                          <td>
                            <div className="participants__list-table-delete" onClick={() => {removeParticipant(participant.id)}}>
                              Delete
                            </div>
                          </td>
                        </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="participants__winners">
            <Title
              title={"Schedule"}
              subtitle={"Open and close your list at specific times."}
            />
            <div className="participants__winners-inputs-wrapper">
              <div className="participants__winners-inputs">
                <div className="input-container">
                  <div className="input-container__title">How many?</div>
                  <div className="input-container__input">
                    <input type="text" placeholder="0" />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-container__title">How many?</div>
                  <div className="input-container__input">
                    <input type="text" placeholder="0" />
                  </div>
                </div>
              </div>
            </div>
            <Title
              title={"Collabs"}
              subtitle={
                "When picking winners, PREMINT will first raffle the entries to your partner collabs. Any remaining entries will be included in the general raffle."
              }
            />
            <div className="participants__winners-table">
              <table>
                <thead>
                  <tr>
                    <th>Partner </th>
                    <th>Spots </th>
                    <th>Entries </th>
                    <th>Spots Used </th>
                    <th>Over</th>
                    <th>Winners</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jane Cooper</td>
                    <td>12</td>
                    <td>12</td>
                    <td>10</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Jane Cooper</td>
                    <td>12</td>
                    <td>12</td>
                    <td>10</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Jane Cooper</td>
                    <td>12</td>
                    <td>12</td>
                    <td>10</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Jane Cooper</td>
                    <td>12</td>
                    <td>12</td>
                    <td>10</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Jane Cooper</td>
                    <td>12</td>
                    <td>12</td>
                    <td>10</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Jane Cooper</td>
                    <td>12</td>
                    <td>12</td>
                    <td>10</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="participants__winners-bottom">
              <button className="signup__btn">Save Settings</button>
              <div className="participants__select" ref={moreRef}>
                <div
                  className="participants__select-btn"
                  onClick={ToggleSwitchmore}
                >
                  Export
                  <i
                    className={`icon-Chevron-down ${more ? "active" : ""}`}
                  ></i>
                </div>
                <div
                  className={`participants__select-dropdown ${
                    more ? "active" : ""
                  }`}
                >
                  <button>Full CSV</button>
                  <button>Plain Text Wallet List</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
