import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

function UserContextProvider(props) {
  const [walletAddress, setWalletAddress] = useState(null);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      console.log(walletAddress);
    }
  }

  const value = { walletAddress, connectWallet };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
