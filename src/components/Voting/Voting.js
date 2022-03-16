import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import ElectionAbi from "../../abi/ElectionAbi.json";

import Button from "@mui/material/Button";

import AddCandidates from "./AddCandiates";
import ShowCandidates from "./ShowCandidates";
import Authorize from "./Authorize";
import VotingCandidates from "./VotingCandidates";
import Result from "./Result";

//const Address = "0xF80c486595ea91668834dbE79109579194A14430";
import Address from "../../secret";

const Voting = () => {
  const { account, isAuthenticated } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  let data;
  const [total, setTotal] = useState("0");
  const [title, setTitle] = useState("");
  const [isCandidateShown, setCandidateShown] = useState(false);
  const [addCandidate, setAddCandidate] = useState(false);
  const [isAuthorize, setAuthorize] = useState(false);
  const [voting, setVoting] = useState(false);
  const [isResult, setIsResult] = useState(false);

  async function loadContract() {
    // alert(account);
    //alert(Address);
    console.log(account);
    console.log(isAuthenticated);
    if (account) {
      let options = {
        contractAddress: Address,
        functionName: "electionName",
        abi: ElectionAbi,
        params: {},
        msgValue: 0,
      };

      data = await contractProcessor.fetch({ params: options });
      // console.log(data);
      setTitle(data);
      totalCandidate();
    } else {
      alert("Connect to Metamask first");
    }
    setAddCandidate(false);
    setCandidateShown(false);
    setAuthorize(false);
    setVoting(false);
    setIsResult(false);
  }

  async function totalCandidate() {
    try {
      let options2 = {
        contractAddress: Address,
        functionName: "getNumCandidate",
        abi: ElectionAbi,
        params: {},
        msgValue: 0,
      };
      let numCandidate = await contractProcessor.fetch({ params: options2 });
      //console.log(numCandidate.toString());
      setTotal(numCandidate.toString());
    } catch (e) {
      console.log(e);
    }
  }
  const showCandidate = (e) => {
    e.preventDefault();
    // console.log("showCandidate");
    setAddCandidate(false);
    setCandidateShown(true);
    setAuthorize(false);
    setVoting(false);
    setIsResult(false);
  };

  const add = (e) => {
    e.preventDefault();
    console.log("addcandiate");
    setAddCandidate(true);
    setCandidateShown(false);
    setAuthorize(false);
    setVoting(false);
    setIsResult(false);
  };

  const authorize = (e) => {
    e.preventDefault();
    setCandidateShown(false);
    setAddCandidate(false);
    setAuthorize(true);
    setVoting(false);
    setIsResult(false);
  };
  const doVote = (e) => {
    e.preventDefault();
    setCandidateShown(false);
    setAddCandidate(false);
    setAuthorize(false);
    setVoting(true);
    setIsResult(false);
  };

  const showResult = (e) => {
    e.preventDefault();
    setCandidateShown(false);
    setAddCandidate(false);
    setAuthorize(false);
    setVoting(false);
    setIsResult(true);
  };
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Button onClick={loadContract}>Vote For</Button>
          <Button onClick={add}>Add Candidate</Button>
          <Button onClick={showCandidate}>Show All Candidates</Button>
          <Button onClick={authorize}>Authorize</Button>
          <Button onClick={doVote}>Give Vote</Button>
          <Button onClick={showResult}>Winner</Button>
          <div>
            <h1>{title}</h1>
            <h1>Total number of candiates : {total}</h1>

            {addCandidate && <AddCandidates />}
            {isCandidateShown && <ShowCandidates />}
            {isAuthorize && <Authorize />}
            {voting && <VotingCandidates />}
            {isResult && <Result />}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Voting;
