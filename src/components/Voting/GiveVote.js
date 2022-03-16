import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

import ElectionAbi from "../../abi/ElectionAbi.json";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VotingCandidates from "./VotingCandidates";
//const Address = "0xF80c486595ea91668834dbE79109579194A14430";
import Address from "../../secret";

const GiveVote = () => {
  const { account, authenticate, Moralis, isAuthenticated } = useMoralis();

  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("account", account);

    console.log("isAuthenticated", isAuthenticated);

    if (isAuthenticated) {
      // alert(id);
      try {
        let options = {
          contractAddress: Address,
          functionName: "vote",
          abi: ElectionAbi,
          params: {
            _voteIndex: id,
          },
          msgValue: 0,
        };

        const d = await Moralis.executeFunction(options);
        console.log(d);
      } catch (e) {
        console.log(
          "You have alredy voted or you are not authorized to vote!!!"
        );
        alert("You have alredy voted or you are not authorized to vote!!!");
      }
    } else {
      alert("Please Login first");
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
        <VotingCandidates />
      </Box>
    </div>
  );
};

export default GiveVote;
