import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import ava from "../assets/images/Avatar.svg";
import Title from "../components/Title";

const Participants = () => {
  const [more, setmore] = useState(false);
  const [tab, setTab] = useState(1);
  //console.log(tab);

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
    <div className="participants">
      <Header />
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
                  <tr>
                    <td>
                      <div className="participants__list-table-wallet">
                        <div className="participants__list-table-img">
                          <img src={ava} alt="" />
                        </div>
                        <div className="participants__list-table-info">
                          <span>0x9009...0924</span>
                          <span>04/20/2022 17:17</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-twitter">
                        <span>@Shrinkly1</span>
                        <span>10 Followers</span>
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-discord">
                        abdelchek#1248
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-delete">
                        Delete
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="participants__list-table-wallet">
                        <div className="participants__list-table-img">
                          <img src={ava} alt="" />
                        </div>
                        <div className="participants__list-table-info">
                          <span>0x9009...0924</span>
                          <span>04/20/2022 17:17</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-twitter">
                        <span>@Shrinkly1</span>
                        <span>10 Followers</span>
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-discord">
                        abdelchek#1248
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-delete">
                        Delete
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="participants__list-table-wallet">
                        <div className="participants__list-table-img">
                          <img src={ava} alt="" />
                        </div>
                        <div className="participants__list-table-info">
                          <span>0x9009...0924</span>
                          <span>04/20/2022 17:17</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-twitter">
                        <span>@Shrinkly1</span>
                        <span>10 Followers</span>
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-discord">
                        abdelchek#1248
                      </div>
                    </td>
                    <td>
                      <div className="participants__list-table-delete">
                        Delete
                      </div>
                    </td>
                  </tr>
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
