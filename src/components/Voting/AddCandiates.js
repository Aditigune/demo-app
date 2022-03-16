import React, { useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
//import ElectionAbi from "../../abi/ElectionAbi.json";
import Election_NewABI from "../../abi/Election_NewABI.json";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardAction from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//const Address = "0xF80c486595ea91668834dbE79109579194A14430";
import Address from "../../secret";
const AddCandidates = () => {
  const { account, Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const handleAddCandidate = async (e) => {
    console.log("Adding candidate");
    e.preventDefault();
    const data = new FormData(e.target);
    // console.log(data.get("candidate"));
    try {
      let options = {
        contractAddress: Address,
        functionName: "addCandidate",
        abi: Election_NewABI,
        params: {
          _name: data.get("candidate"),
        },
        msgValue: 0,
      };

      // await contractProcessor.fetch({ params: options });
      await Moralis.executeFunction(options);
    } catch (e) {
      console.log(e);
      alert(
        "You are not owner of this contract..So you can not add candidates!!!"
      );
    }
  };
  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  title="Add Candidates"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                >
                  {account}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCandidate}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          mb: 2,
                        }}
                      >
                        <label>Enter Address:</label>
                        <input
                          type="text"
                          name="candidate"
                          placeholder="Candidate Name"
                        />
                      </Box>
                    </Box>
                    <br></br>
                    <br></br>
                    <Button type="submit" variant="contained" fullWidth>
                      Add Candidate
                    </Button>
                  </form>
                </CardContent>
                <CardAction></CardAction>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AddCandidates;
