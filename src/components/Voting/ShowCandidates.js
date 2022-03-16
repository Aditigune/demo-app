import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Election_NewABI from "../../abi/Election_NewABI.json";

//const Address = "0xF80c486595ea91668834dbE79109579194A14430";
import Table from "../../components/Table";
import Address from "../../secret";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import { UserData } from "./Data";
const ShowCandidates = () => {
  const { account } = useMoralis();
  const [Candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  //console.log(num);
  const contractProcessor = useWeb3ExecuteFunction();
  var arr = [];
  useEffect(() => {
    showAll();
  });
  const showAll = async () => {
    if (account) {
      try {
        let options = {
          contractAddress: Address,
          functionName: "getAllCandiates",
          abi: Election_NewABI,
          params: {},
          msgValue: 0,
        };
        var data = [];

        data = await contractProcessor.fetch({ params: options });
        //const data = await Moralis.executeFunction(options);
        const obj = data.length;
        for (let i = 0; i < obj; i++) {
          arr = [
            ...arr,
            { id: i, name: data[i].name, voteCount: String(data[i].voteCount) },
          ];
          // console.log(String(data[i].name));
          // console.log(String(data[i].voteCount));
        }
        //  console.log("data", JSON.stringify(String(data[0].voteCount)));
        // console.log("obj", obj);
      } catch (e) {
        console.log("Error Message-->", e);
      }
    }
    setCandidates(arr);
    //s console.log(arr);
    // console.log(Candidates);
    setLoading(true);
  };
  //Preparing Chart data
  /* const [userData, setCandidateData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Names ",
        data: UserData.map((data) => data.useGain),
        backgroundColour: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#F3BA2F",
          "#2A71D0",
        ],
        borderColour: "black",
        borderWidth: "2",
      },
    ],
  });*/
  return (
    <div style={{ width: "700" }}>
      {/* <Button onClick={showAll}>Vote For</Button> */}
      {loading && <Table Candidates={Candidates} showChkbox={false} />}
      {/* {loading && (
        <div style={{ width: "500" }}>
          <BarChart chartData={candidateData} />
        </div>
      )} */}
      {/* {loading && (
        <div style={{ width: "700" }}>
          <PieChart chartData={userData} />
        </div>
      )} */}
    </div>
  );
};

export default ShowCandidates;
