import React from "react";
import Header from "../components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import twitter from "../assets/images/performance/twit.svg";
import linkedin from "../assets/images/performance/in.svg";
import facebook from "../assets/images/performance/face.svg";
import email from "../assets/images/performance/email.svg";
import reddit from "../assets/images/performance/reddit.svg";

import search from "../assets/images/Search.svg";
import trash from "../assets/images/trash.svg";
import time from "../assets/images/time.svg";
import users from "../assets/images/userss.svg";

import { useParams } from "react-router-dom";
import { getProjectInfo, getStats, getParticipants, getVisits, deleteParticipant, getPerformances } from "../service/actions";
import { useContext, useState, useEffect } from "react";
import WalletContext from "../context/WalletContext";
import { filterMatches } from "web3modal";
import swal from "sweetalert";

const Dashboard = () => {
  // pass the correct data for the chart
  const { projectId } = useParams();
  const {account} = useContext(WalletContext);
  const [projectInfo, setProjectInfo] = useState({});
  const [statistics, setStatistics] = useState({});
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [slug, setSlug] = useState();
  const [performances, setPerformances] = useState({});
  const [paFilter, setPaFilter] = useState('');

  const getProjectData = async(projectId) => {
    let _slug;
    await getProjectInfo(projectId)
    .then(res=>res.json())
    .then(res=>{      
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
      getStats(account, _slug).then(res=>res.json())
      .then(res=>{
        if(res.status == 'success')
        { 
          setStatistics(res[0]);
        }
      })

      setSlug(_slug);

      getVisits(account, _slug).then(res=>res.json())
        .then(res=> {
          console.log(res);
          if(res.status == "success")
          {
            let _data = [];
            for(let i = 0; i < 7; i ++ ){
              let graph = {
                name: res.days[i],
                signup: res.signup[i],
                visits: res.visits[i],
              }
              _data.push(graph);
            }
            setData(_data);
          }
        })

      getPerformances(account, _slug).then(res=>res.json())
        .then(res=> {
          if(res.status == "success")
          {
            console.log(res.email[0]);
            setPerformances(res);
          }
        })

      getParticipants(account, _slug).then(res=>res.json())
        .then(res => {
          if(res.status != "error"){
            let i = 0;
            let _participants = [];
            while(res.hasOwnProperty(i)){
              _participants.push(res[i]);
              i++;
            }
            setParticipants(_participants);
          } else {
            setParticipants([]);
          }
        })
    });
  }, [projectId]);

  const removeParticipant = (participant_id) => {
    swal({
      title: "Are you sure?",
      text: "Do you want to remove participant?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      deleteParticipant(account, slug, participant_id).then(res=>res.json())
      .then(res => {
         if(res.status == 'true')
         {
           window.location.reload();
         }
      })
    });
  }

  const getAbbrWalletAddress = (walletAddress) => {
    let abbrWalletAddress =
      walletAddress.substring(0, 6) + "..." + walletAddress.substring(38, 42);
    return abbrWalletAddress.toUpperCase();
  };

  const getDateTimeFormat = (dateTime) => {
    if(dateTime == null)
      return "";
    let abbrDate = 
      dateTime.substring(0, 10) + " " + dateTime.substring(11, 19);

    return abbrDate;
  }

  return (
    <div className="dashboard">
      <Header projectId={projectId} header={projectId == undefined} slug={projectInfo.slug}/>
      <div className="dashboard__inner">
        <div className="center-block">
          <div className="dashboard__top">
            <div className="dashboard__top-items">
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">{statistics.visites}</div>
                <div className="dashboard__top-item-subtitle">Visits</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">{statistics.participant}</div>
                <div className="dashboard__top-item-subtitle">Participants</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">{statistics.referrals}</div>
                <div className="dashboard__top-item-subtitle">Referrals</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">{statistics.share}</div>
                <div className="dashboard__top-item-subtitle">Shares</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">{statistics.conversions}%</div>
                <div className="dashboard__top-item-subtitle">
                  Conversion Rate
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard__center">
            <div className="dashboard__center-items">
              <div className="dashboard__chart bg">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                      verticalAlign="top"
                      wrapperStyle={{ paddingBottom: "20px" }}
                    />
                    {/* <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    /> */}
                    <Line type="monotone" dataKey="visits" stroke="#82ca9d" activeDot={{ r: 4 }}/>
                    <Line type="monotone" dataKey="signup" stroke="#8884d8" activeDot={{ r: 4 }}/>

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="dashboard__center-items">
              <div className="dashboard__performance">
                <div className="dashboard__performance-top">
                  <div className="dashboard__performance-title">
                    Channel Performance
                  </div>
                  <div className="dashboard__performance-subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
                <div className="dashboard__performance-items">
                  <div className="dashboard__performance-item">
                    <div className="dashboard__performance-item-top">
                      <div className="dashboard__performance-item-icon">
                        <img src={email} alt="" />
                      </div>
                      <div className="dashboard__performance-item-name">
                        Email
                      </div>
                    </div>
                    <div className="dashboard__performance-item-bot">
                      <div className="dashboard__performance-item-inner">
                        {performances.email ? performances.email[0] : ''}
                      </div>
                      <div className="dashboard__performance-item-inner">
                        {performances.email ? performances.email[1] : ''}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard__performance-item">
                    <div className="dashboard__performance-item-top">
                      <div className="dashboard__performance-item-icon">
                        <img src={twitter} alt="" />
                      </div>
                      <div className="dashboard__performance-item-name">
                        Twitter
                      </div>
                    </div>
                    <div className="dashboard__performance-item-bot">
                      <div className="dashboard__performance-item-inner">
                        {performances.twitter ? performances.twitter[0] : ''}
                      </div>
                      <div className="dashboard__performance-item-inner">
                        {performances.twitter ? performances.twitter[1] : ''}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard__performance-item">
                    <div className="dashboard__performance-item-top">
                      <div className="dashboard__performance-item-icon">
                        <img src={facebook} alt="" />
                      </div>
                      <div className="dashboard__performance-item-name">
                        Facebook
                      </div>
                    </div>
                    <div className="dashboard__performance-item-bot">
                      <div className="dashboard__performance-item-inner">
                        {performances.facebook ? performances.facebook[0] : ''}
                      </div>
                      <div className="dashboard__performance-item-inner">
                        {performances.facebook ? performances.facebook[1] : ''}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard__performance-item">
                    <div className="dashboard__performance-item-top">
                      <div className="dashboard__performance-item-icon">
                        <img src={reddit} alt="" />
                      </div>
                      <div className="dashboard__performance-item-name">
                        Reddit
                      </div>
                    </div>
                    <div className="dashboard__performance-item-bot">
                      <div className="dashboard__performance-item-inner">
                        {performances.reddit ? performances.reddit[0] : ''}
                      </div>
                      <div className="dashboard__performance-item-inner">
                        {performances.reddit ? performances.reddit[1] : ''}
                      </div>
                    </div>
                  </div>
                  <div className="dashboard__performance-item">
                    <div className="dashboard__performance-item-top">
                      <div className="dashboard__performance-item-icon">
                        <img src={linkedin} alt="" />
                      </div>
                      <div className="dashboard__performance-item-name">
                        Linkedin
                      </div>
                    </div>
                    <div className="dashboard__performance-item-bot">
                      <div className="dashboard__performance-item-inner">
                        {performances.linkedin ? performances.linkedin[0] : ''}
                      </div>
                      <div className="dashboard__performance-item-inner">
                        {performances.linkedin ? performances.linkedin[1] : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard__bottom">
            <div className="dashboard__bottom-header">
              <div className="dashboard__bottom-header-title">Participants</div>
              <div className="dashboard__bottom-header-right">
                <button className="dashboard__bottom-header-btn">
                  Manually Add Addresses
                </button>
                <div className="dashboard__bottom-header-search">
                  <img src={search} alt="" />
                  <input type="search" placeholder="Search" onKeyUp={(event) => {setPaFilter(event.target.value)}}/>
                </div>
              </div>
            </div>
            <div className="dashboard__bottom-items">
              {
                participants.filter(element => {
                  return element.discord_username.includes(paFilter) || element.twitter_username.includes(paFilter);
                }).map((participant, key) => {
                  return <div className="dashboard__bottom-item" key={key}>
                    <div className="dashboard__bottom-item-inner">
                      <div className="dashboard__bottom-item-title">
                        {getAbbrWalletAddress(participant.wallet_address)}
                      </div>
                      <div className="dashboard__bottom-item-subtitle">
                        <img src={time} alt="" /> {getDateTimeFormat(participant.created_at)}
                      </div>
                    </div>
                    <div className="dashboard__bottom-item-inner">
                    <div className="dashboard__bottom-item-link">
                        {participant.twitter_username}
                      </div>
                      {/* 
                      <div className="dashboard__bottom-item-title">{participant.twitter_username}</div>
                      <div className="dashboard__bottom-item-subtitle">
                        <img src={users} alt="" />1
                      </div> */}
                    </div>
                    <div className="dashboard__bottom-item-inner">
                      <div className="dashboard__bottom-item-link">
                        {participant.discord_username}
                      </div>
                    </div>
                    <div className="dashboard__bottom-item-inner">
                      <button className="dashboard__bottom-item-icon" onClick={() => {removeParticipant(participant.id)}}>
                        <img src={trash} alt="" />
                      </button>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
