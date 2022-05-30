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
import CollabsNew from "./pages/CollabsNew";  
import CollabsEdit from "./pages/CollabsEdit";  

function App() {
  const location = useLocation();

  const [account, setAccount] = useState(localStorage.getItem("account") == null ? false : localStorage.getItem("account"));
  const [web3Instance, setWeb3Instance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [walletText, setWalletText] = useState("Connect To Wallet");
  const [connected, setConnected] = useState(localStorage.getItem("connected") == null ? false : localStorage.getItem("connected"));
  const [slug, setSlug] = useState(localStorage.getItem("slug") == null ? "invalid" : localStorage.getItem("slug"));


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
        connected,
        setConnected,
        slug, 
        setSlug,
      }}
    >
      <div className="App">
        {
          <Routes>
            <Route exact path="/" element={<Ethereum />} />
            <Route exact path="/:slug" element={<Main />} />
            <Route exact path="/Projects" element={<Projects />} />
            <Route exact path="/Info/new" element={<Info />} />
            <Route exact path="/Info/:projectId" element={<Info />} />
            <Route exact path="/Dashboard/:projectId" element={<Dashboard />} />
            <Route exact path="/Ethereum" element={<Ethereum />} />
            <Route exact path="/ConnectWallet" element={<ConnectWallet />} />
            <Route exact path="/RegistrationFlow/new" element={<RegistrationFlow />}/>
            <Route exact path="/RegistrationFlow/:projectId" element={<RegistrationFlow />} />
            <Route exact path="/SignUp/new" element={<SignUp />} />
            <Route exact path="/SignUp/:projectId" element={<SignUp />} />
            <Route exact path="/Transparency/new" element={<Transparency />} />
            <Route exact path="/Transparency/:projectId" element={<Transparency />} />
            <Route exact path="/Team/new" element={<Team />} />
            <Route exact path="/Team/:projectId" element={<Team />} />
            <Route exact path="/BlackList/new" element={<BlackList />} />
            <Route exact path="/BlackList/:projectId" element={<BlackList />} />
            <Route exact path="/Message/new" element={<Message />} />
            <Route exact path="/Message/:projectId" element={<Message />} />
            <Route exact path="/Analytics" element={<Analytics />} />
            <Route exact path="/Main" element={<Main />} />
            <Route exact path="/MainBlack" element={<MainBlack />} />
            {/* pages with no content */}
            <Route exact path="/Participants/:projectId" element={<Participants />} />
            <Route exact path="/Settings" element={<Settings />} />
            <Route exact path="/Collabs/:projectId" element={<Collabs />} />
            <Route exact path="/Collabs/:projectId/create" element={<CollabsNew />} />
            <Route exact path="/Collabs/:projectId/:collabId/edit" element={<CollabsEdit />} />

            <Route exact path="/:slug" element={<Main />} />
          </Routes>
        }
      </div>
    </WalletContext.Provider>
  );
}

export default App;

