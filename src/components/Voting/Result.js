import React, { useDebugValue, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Election_NewABI from "../../abi/Election_NewABI.json";
import Address from "../../secret";

import Button from "@mui/material/Button";

const Result = () => {
  const { account, isAuthenticated } = useMoralis();
  const [winner, setWinner] = useState("XXXX");
  const contractProcessor = useWeb3ExecuteFunction();

  const showWinner = async () => {
    if (account) {
      try {
        let options = {
          contractAddress: Address,
          functionName: "leader",
          abi: Election_NewABI,
          params: {},
          msgValue: 0,
        };
        var data;

        data = await contractProcessor.fetch({ params: options });
        console.log("data==", String(data[0]));
        options = {
          contractAddress: Address,
          functionName: "the_one",
          abi: Election_NewABI,
          params: {},
          msgValue: 0,
        };

        var result = await contractProcessor.fetch({ params: options });
        console.log("result==", result[0]);
        setWinner(result[0]);
      } catch (e) {
        console.log("Error Message-->", e);
      }
    }
  };
  return (
    <div>
      The winner of the polling is: <h1>{winner}</h1>
      <Button onClick={showWinner}>View</Button>
    </div>
  );
};

export default Result;
