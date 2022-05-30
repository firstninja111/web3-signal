import React, { useState, useContext } from "react";
import Header from "../components/Header";
import premint from "../assets/images/premint.png";
import { useParams, useNavigate } from "react-router-dom";
import { getCollectionVerification, getProjectInfo, editCollab } from "../service/actions";
import WalletContext from "../context/WalletContext";
import { useEffect } from "react";


const CollabsNew = () => {
  const {projectId} = useParams();
  const [slug, setSlug] = useState();
  const [verification, setVerfication] = useState(false);
  const {account} = useContext(WalletContext);
  const [collectionName, setCollectionName] = useState('');
  const [collabId, setCollabId] = useState(0);
  const [collabForm, setCollabForm] = useState({selection_method: 'Raffle'});
  const navigate = useNavigate();

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
      setSlug(_slug);
    });

  }, [projectId]);

  const setupCollab = () => {
    if(collectionName == '')
      return;

    getCollectionVerification(account, slug, collectionName).then(res=>res.json())
    .then(res=>{
      if(res.success == true)
      {
        setCollabId(res.collab_id);
        setVerfication(true);
        setCollabForm({...collabForm, name:collectionName, logo:res.logo});
      } else {
        alert(`Sorry, there is no colletion at https://opensea.io/collection/${collectionName}.`);
        return;
      }
      console.log('Verification Result:', res);
    })
  }

  const createCollab = () => {
    if(collabId == 0)
      return;
    editCollab(account, slug, collabId, collabForm.name, collabForm.spots, collabForm.selection_method, collabForm.message).then(res=>res.json())
      .then(res=>{
        if(res.status == 'true'){
          navigate(`/Collabs/${projectId}`);   
        }
      })
  }

  const handleChange = (ev) =>{
    let _name = ev.target.name;
    let _val = ev.target.value;
    setCollabForm({...collabForm, [_name]: _val});
  }

  return (
    <div>
      <Header projectId={projectId} header={projectId == undefined} slug={slug}/>

      {
        !verification &&
        <div className="collab-setup-section">
          <div className="collabs-new__inner center-block">
              <div className="collabs-new__title">
                Setup New Collab
              </div>
              <div className="collabs-new__subtitle">
                Enter Collection's OpenSea Slug
              </div>
              <div className="collabs-new__input-input">
                  <input type="text" placeholder="cryptopunks" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}/>
              </div>
              <div className="collabs-new__subtitle">
                For https://opensea.io/collection/cryptopunks, enter "cryptopunks"
              </div>
              <button className="find__btn" type="button" onClick={setupCollab}>
                Find
              </button>
          </div>
        </div>
      }
      {
        verification &&
        <div className="collabs-new detail-section">
          <div className="collabs-new__inner center-block">
            <div className="collabs-new__title">
              Offer Spots To PREMINT Collector Pass Owners
            </div>
            <div className="collabs-new__subtitle">
              This will create a dedicated signup page for PREMINT Collector Pass
              owners to sign up for project1. This does not mean that your project
              is officially endorsed by PREMINT Collector Pass.
            </div>
            <button className="collabs-new__btn">
              You'll need a <span>PREMINT Creator Key</span> to access these
              features.
            </button>
            <div className="collabs-new__premint">
              <div className="collabs-new__premint-top">
                <div className="collabs-new__premint-img">
                  <img src={collabForm.logo} alt="" />
                </div>
                <div className="collabs-new__premint-info">
                  <div className="collabs-new__premint-title">
                    PREMINT Collector Pass
                  </div>
                  <a target="_blank" href={`https://opensea.io/collection/${collabForm.name}`} className="collabs-new__premint-link">
                    https://opensea.io/collection/{collabForm.name}
                  </a>
                </div>
              </div>
              <div className="collabs-new__premint-center">
                <p>
                  <span>From PREMINT Collector Pass:</span> We're looking for
                  projects backed by a proven team, doing something novel, or have
                  a lot of buzz. We generally don't approve derivative projects.
                  You are more likely to get an accepted collab if your list
                  already has a large number of registrations (showing demand).
                </p>
                <p>
                  Our community is 10,000 collectors and typically thousands sign
                  up for collabs, so we're hoping for a generous allocation
                  (500-1000 spots). If accepted, your project will show up in our
                  collector dashboard.
                </p>
              </div>
              <div className="collabs-new__premint-footer">
                Note: When a collab is approved by the partner team, a link to
                your list will be visible on this collection's
                <a >public offer page</a>.
              </div>
            </div>
            <div className="collabs-new__input bg">
              <div className="collabs-new__input-title">Spots Available</div>
              <div className="collabs-new__input-subtitle">
                How many spots are being set aside for the partner community? This
                will not limit the number of people who can sign up. It will just
                set the expectation with the collector of how many spots are
                available.
              </div>
              <div className="collabs-new__input-input">
                <input type="text" placeholder="0" name="spots" onChange={handleChange}/>
              </div>
            </div>
            <div className="collabs-new__input bg">
              <div className="collabs-new__input-title">Selection method</div>
              <div className="collabs-new__input-subtitle">
                How will winners be chosen? We recommend Raffle. If selection
                method is Guaranteed, the form will close when you get that many
                entries.
              </div>
              <div className="collabs-new__input-input">
                <select  name="selection_method" onChange={handleChange}>
                  <option value="raffle">Raffle</option>
                  <option value="guaranteed">Guaranteed</option>
                </select>
              </div>
            </div>
            <div className="collabs-new__input bg">
              <div className="collabs-new__input-title">Message to partner</div>
              <div className="collabs-new__input-subtitle">
                This will be visible to the partner team when they review this
                collab, so put anything that would add valuable context about your
                project.
              </div>
              <div className="collabs-new__input-input">
                <textarea type="text" name="message" placeholder="Message to partner" onChange={handleChange}/>
              </div>
            </div>
            <button className="signup__btn" type="button" onClick={createCollab}>
              Save
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default CollabsNew;
