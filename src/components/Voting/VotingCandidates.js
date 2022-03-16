import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Election_NewABI from "../../abi/Election_NewABI.json";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
//import ElectionAbi from "../../abi/ElectionAbi.json";
//const Address = "0xF80c486595ea91668834dbE79109579194A14430";

import Address from "../../secret";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Candidate Name",
    width: 150,
    editable: false,
  },
];
const VotingCandidates = () => {
  const { account, authenticate, Moralis, isAuthenticated } = useMoralis();

  const [Candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  //console.log(num);
  const contractProcessor = useWeb3ExecuteFunction();
  var arr = [];
  useEffect(() => {
    loadCandidate();
  });
  const loadCandidate = async () => {
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

        const obj = data.length;
        for (let i = 0; i < obj; i++) {
          arr = [...arr, { id: i, name: data[i].name }];
        }
      } catch (e) {
        console.log("Error Message-->", e);
      }
    }
    setCandidates(arr);

    setLoading(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("account", account);

    console.log("isAuthenticated", isAuthenticated);
    console.log(selectionModel);
    console.log(selectionModel.length);
    if (isAuthenticated) {
      if (selectionModel.length === 1) {
        // alert(id);
        try {
          let options = {
            contractAddress: Address,
            functionName: "vote",
            abi: Election_NewABI,
            params: {
              _voteIndex: selectionModel,
            },
            msgValue: 0,
          };

          const d = await Moralis.executeFunction(options);
          console.log(d);
        } catch (e) {
          /* console.log(
            "You have alredy voted or you are not authorized to vote!!!"
          ); */
          alert("You have alredy voted or you are not authorized to vote!!!");
        }
      } else {
        alert("You can select only one candidate to vote");
      }
    } else {
      alert("Please Login first");
    }
  };

  return (
    <div>
      <div style={{ height: 400, width: "50%" }}>
        <DataGrid
          rows={Candidates}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </div>
      <br></br>

      <Button onClick={handleSubmit} variant="contained">
        Vote
      </Button>
    </div>
  );
};

export default VotingCandidates;
