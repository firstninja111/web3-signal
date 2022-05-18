import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./assets/scss/_styles.scss";
import "./assets/css/tailwind.css";
import "./assets/scss/app.scss";
import Main from "./pages/Main";
import Info from "./pages/Info";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Dashboard from "./pages/Dashboard";
import Ethereum from "./pages/Ethereum";
import ConnectWallet from "./pages/ConnectWallet";
import Projects from "./pages/Projects";
import RegistrationFlow from "./pages/RegistrationFlow";
import SignUp from "./pages/SignUp";
import Analytics from "./pages/Analytics";
import Transparency from "./pages/Transparency";
import Team from "./pages/Team";
import BlackList from "./pages/BlackList";
import Message from "./pages/Message";
import Participants from "./pages/Participants";
import Settings from "./pages/Settings";
import Collabs from "./pages/Collabs";
import PublicPage from "./pages/PublicPage";
import WalletContext from "./context/WalletContext";
import NewInfo from "./pages/NewInfo";
import MainBlack from "./pages/MainBlack";

function App() {
  const location = useLocation();

  const [account, setAccount] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [walletText, setWalletText] = useState("Connect To Wallet");

  return (
    <WalletContext.Provider
      value={{
        account,
        setAccount,
        web3Instance,
        setWeb3Instance,
        chainId,
        setChainId,
        walletText,
        setWalletText,
      }}
    >
      <div className="App">
        {
          <Routes>
            <Route exact path="/" element={<Ethereum />} />
            <Route exact path="/Projects" element={<Projects />} />
            <Route exact path="/Info/new" element={<NewInfo />} />
            <Route exact path="/Info/:projectId" element={<Info />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/Ethereum" element={<Ethereum />} />
            <Route exact path="/ConnectWallet" element={<ConnectWallet />} />
            <Route
              exact
              path="/RegistrationFlow"
              element={<RegistrationFlow />}
            />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/Transparency" element={<Transparency />} />
            <Route exact path="/Team" element={<Team />} />
            <Route exact path="/BlackList" element={<BlackList />} />
            <Route exact path="/Message" element={<Message />} />
            <Route exact path="/Analytics" element={<Analytics />} />
            <Route exact path="/Main" element={<Main />} />
            <Route exact path="/MainBlack" element={<MainBlack />} />
            {/* pages with no content */}
            <Route exact path="/Participants" element={<Participants />} />
            <Route exact path="/Settings" element={<Settings />} />
            <Route exact path="/Collabs" element={<Collabs />} />
            <Route exact path="/:slug" element={<Main />} />
          </Routes>
        }
      </div>
    </WalletContext.Provider>
  );
}

export default App;
