import {createContext} from 'react';

const WalletContext = createContext({account: null, web3Instance: null, chainId: null});

export default WalletContext;
