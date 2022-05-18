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

const Dashboard = () => {
  // pass the correct data for the chart
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__inner">
        <div className="center-block">
          <div className="dashboard__top">
            <div className="dashboard__top-items">
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">10000</div>
                <div className="dashboard__top-item-subtitle">Visits</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">100</div>
                <div className="dashboard__top-item-subtitle">Participants</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">24</div>
                <div className="dashboard__top-item-subtitle">Referrals</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">10k</div>
                <div className="dashboard__top-item-subtitle">Shares</div>
              </div>
              <div className="dashboard__top-item">
                <div className="dashboard__top-item-title">5%</div>
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
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
                        100
                      </div>
                      <div className="dashboard__performance-item-inner">
                        1092
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
                        200
                      </div>
                      <div className="dashboard__performance-item-inner">
                        2999
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
                        600
                      </div>
                      <div className="dashboard__performance-item-inner">
                        1922
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
                        120
                      </div>
                      <div className="dashboard__performance-item-inner">
                        890
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
                        235
                      </div>
                      <div className="dashboard__performance-item-inner">
                        765
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
                  <input type="search" placeholder="Search" />
                </div>
              </div>
            </div>
            <div className="dashboard__bottom-items">
              <div className="dashboard__bottom-item">
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-title">
                    0x9009...0924
                  </div>
                  <div className="dashboard__bottom-item-subtitle">
                    <img src={time} alt="" /> 04/20/2022 17:17
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-title">@Shrinkly1</div>
                  <div className="dashboard__bottom-item-subtitle">
                    <img src={users} alt="" />1
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-link">
                    abdelchek#1248
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <button className="dashboard__bottom-item-icon">
                    <img src={trash} alt="" />
                  </button>
                </div>
              </div>
              <div className="dashboard__bottom-item">
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-title">
                    0x9009...0924
                  </div>
                  <div className="dashboard__bottom-item-subtitle">
                    <img src={time} alt="" /> 04/20/2022 17:17
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-title">@Shrinkly1</div>
                  <div className="dashboard__bottom-item-subtitle">
                    <img src={users} alt="" />1
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-link">
                    abdelchek#1248
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <button className="dashboard__bottom-item-icon">
                    <img src={trash} alt="" />
                  </button>
                </div>
              </div>
              <div className="dashboard__bottom-item">
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-title">
                    0x9009...0924
                  </div>
                  <div className="dashboard__bottom-item-subtitle">
                    <img src={time} alt="" /> 04/20/2022 17:17
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-title">@Shrinkly1</div>
                  <div className="dashboard__bottom-item-subtitle">
                    <img src={users} alt="" />1
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <div className="dashboard__bottom-item-link">
                    abdelchek#1248
                  </div>
                </div>
                <div className="dashboard__bottom-item-inner">
                  <button className="dashboard__bottom-item-icon">
                    <img src={trash} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
