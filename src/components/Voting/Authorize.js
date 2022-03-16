import React, { useState, useEffect } from "react";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3ApiCall,
  useMoralisWeb3Api,
} from "react-moralis";

import ElectionAbi from "../../abi/ElectionAbi.json";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//const Address = "0xF80c486595ea91668834dbE79109579194A14430";
import Address from "../../secret";
const Authorize = () => {
  const { account, authenticate, Moralis, isAuthenticated } = useMoralis();
  //const [owner, setOwner] = useState();
  const contractProcessor = useWeb3ExecuteFunction();
  const { native } = useMoralisWeb3Api();
  const [address, setAddress] = useState("");

  const options = {
    chain: "rinkeby",
    address: Address,
    function_name: "owner",
    abi: ElectionAbi,
    params: {},
  };

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...options }
  );
  /* useEffect(() => {
    getOwner();
  }); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("account", account);
    //console.log("authenticate", authenticate);
    console.log("isAuthenticated", isAuthenticated);
    // getOwner();
    //    alert(address);

    try {
      let options = {
        contractAddress: Address,
        functionName: "authorize",
        abi: ElectionAbi,
        params: {
          _person: address,
        },
        msgValue: 0,
      };

      // await contractProcessor.fetch({ params: options });
      const d = await Moralis.executeFunction(options);
      console.log(d);
    } catch (e) {
      console.log(
        "You are not owner of this poll. So you can not authorize!!!!"
      );
      alert("You are not owner of this poll. So you can not authorize!!!!");
    }
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <label>Enter Address to Authorize:</label>
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>
      <Button onClick={handleSubmit} variant="contained">
        Authorize
      </Button>
    </div>
  );
};

export default Authorize;
