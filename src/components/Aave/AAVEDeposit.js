import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ERC20abi from "../../abi/ERC20abi.json";
import LendingPoolAbi from "../../abi/LendingPoolAbi.json";
import { ethers } from "ethers";
import { getAccountPath } from "ethers/lib/utils";
//const Web3 = require("web3");
const daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";

const AAVEDeposit = () => {
  const [provider, setProvider] = useState();
  const [amount, setAmount] = useState("");
  const [blockNumber, setBlockNumber] = useState("0");
  const [gasPrice, setGasPrice] = useState("0");
  const [account, setAccount] = useState("");
  const [daiBalance, setDaiBalance] = useState("");
  const [connected, setConnected] = useState(false);

  const { walletAddress } = useUser();

  useEffect(() => {
    /*   // Set some data like block number and gas price provided, you can find more options in the API docs
      const setBlockchainData = async () => {
        setBlockNumber(await provider.getBlockNumber());
        let gasPrice = await provider.getGasPrice();
        // formats a returned big number as gwei where 1,000,000,000 gwei is 1 ether
        // you can read about more denominations here: https://ethdocs.org/en/latest/ether.html
        gasPrice = Math.trunc(ethers.utils.formatUnits(gasPrice, "gwei"));
        setGasPrice(gasPrice);
        // console.log("gasprice", gasPrice);
      };

      // Set aquired blockchain data as state to use in our frontend
      setBlockchainData();
 */
    // Set provider so we can use it in other functions
    //   setProvider(provider);
    // }
  }, []);

  const getAccount = async () => {
    console.log("you are in account");
    if (typeof window.ethereum !== "undefined") {
      // console.log("ethereum is available");

      // get provider injected by metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      //console.log(provider);
      await provider.send("eth_requestAccounts", []);
      const accountList = await provider.listAccounts();
      //    console.log("accountList", accountList);
      // debugger;
      setAccount(accountList[0]);
      setConnected(true);
    }
  };

  const getDAIBalance = async () => {
    console.log("you are in dai");
    getAccount();
    //console.log(account);
    console.log(connected);
    try {
      /*  let contract = new ethers.Contract(daiAddress, ERC20abi, provider);
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      console.log("contract", contract);
      let approve = await contractWithSigner
        .approve(
          "0xe0fba4fc209b4948668006b2be61711b7f465bae",
          "10000000000000000000"
        )
        .call();
 */
      let depositContract = new ethers.Contract(
        "0xe0fba4fc209b4948668006b2be61711b7f465bae",
        LendingPoolAbi,
        provider
      );
      console.log(depositContract);
      const signer1 = provider.getSigner();
      const depositSigner = depositContract.connect(signer1);
      let deposit = await depositSigner
        .deposit(
          "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
          "1000000000000000000",
          "0x5A1fAc0F55c2F3cafBD887F34198107c180cAbf5",
          "0"
        )
        .call();

      console.log(deposit);
      //balance = this.state.ethers.utils.fromWei(balance);
      //setDaiBalance(balance);
      //console.log("dai", daiBalance);
    } catch (e) {}
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    alert("amount", amount);
    // setDaiBalance(e.target.value);
    // console.log(amount);
    //getDAIBalance();
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
    console.log(amount);
  };

  return (
    <div>
      {walletAddress}

      <Container>
        AAVEDeposit
        {/* <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              mb: 2,
            }}
          >
            <label>From Account:</label>
            <input
              type="text"
              name="recipient"
              placeholder="Recipient Address"
            />
          </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            mb: 2,
          }}
        >
          <label>Amount(in Dai):</label>
          <input
            type="text"
            name="amount"
            placeholder="Amount to transfer"
            value={amount}
            onChange={handleChange}
          />
        </Box>
        <br></br>
        <br></br>
        <Button type="submit" variant="contained" onClick={handleDeposit}>
          Deposit
        </Button>
      </Container>
    </div>
  );
};

export default AAVEDeposit;
