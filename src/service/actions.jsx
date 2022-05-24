import { API_BASE, ASSET_BASE } from "./config";

const options = (data) => {
  return {
    headers: {
      // 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "post",
    body: JSON.stringify(data),
  };
};

/** Register */
export const register = (wallet_address) => {
  let data = new FormData();
  data.append("wallet_address", wallet_address);
  // data.append("wallet_address", "0x757c494265270aaEde2751D56Be393925439aC21"); // for only test
  return fetch(`${ASSET_BASE}/web3-login-verify`, {
    method: "POST",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    body: data,
    mode: "cors",
  });
};

/** Get project */
export const getAllProjects = (wallet_address) => {
  let data = new FormData();
  data.append('wallet_address', wallet_address);
  // data.append("wallet_address", "0x722bd4163771851b847de0a69cf7190d747c62da"); // for only test
  return fetch(`${API_BASE}/projects`, {
    method: "POST",
    body: data,
  });
};

/** Get one project info */
export const getProjectInfo = (projectId) => {
  return fetch(`${API_BASE}/info/${projectId}`);
};

/** Save project */
export const saveProject = (projectId, param) => {
  let data = new FormData();
  Object.keys(param).map((key, index) => {
    data.append(key, param[key]);
  });
  return fetch(`${API_BASE}/updatedata/${projectId}`, {
    method: "POST",
    body: data,
  });
};

/** Create project */
export const createProject = (param) => {
  let data = new FormData();
  Object.keys(param).map((key, index) => {
    data.append(key, param[key]);
  });
  return fetch(`${API_BASE}/createproject`, {
    method: "POST",
    body: data,
    cors: true,
  });
};

/** remove project */
export const removeProject = (projectId, account) => {
  let data = new FormData();
  data.append("wallet_address", account);
  data.append("id", projectId);
  return fetch(`${API_BASE}/deleteproject`, {
    method: "POST",
    body: data,
  });
};

/** get project detail with its slug */
export const getProjectDetail = (slug) => {
  let data = new FormData();
  // data.append("wallet_address", address);
  data.append("slug", slug);
  return fetch(`${API_BASE}/details`, {
    method: "POST",
    body: data,
  });
};

/** duplicate the project  */
export const makeDuplicateProject = (projectId) => {
  return fetch(`${API_BASE}/duplicateproject/${projectId}`, {
    method: "POST"
  });
}

export const getBalance = (address) => {
  return fetch(`${API_BASE}/balance/${address}`);
};

export const getNfts = (address) => {
  return fetch(`${API_BASE}/getNfts/${address}`);
};

export const checknft = (address) => {
  return fetch(`${API_BASE}/checknft/${address}`);
};
