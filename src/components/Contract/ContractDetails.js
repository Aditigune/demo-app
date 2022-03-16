import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ERC20abi from "../../abi/ERC20abi.json";
import { ErrorDescription } from "@ethersproject/abi/lib/interface";
import TransactionList from "../Contract/TransactionList";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardAction from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ContractDetails = () => {
  const [contractListened, setContractListened] = useState();
  const [txns, setTxns] = useState([]);
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });

  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-",
  });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(
        contractInfo.address,
        ERC20abi,
        provider
      );

      erc20.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });
        setTxns((currentTxn) => [
          ...currentTxn,
          {
            txnHash: event.TransactionHash,
            from,
            to,
            amount: String(amount),
          },
        ]);
      });

      setContractListened(erc20);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20 = new ethers.Contract(data.get("addr"), ERC20abi, provider);

    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    setContractInfo({
      address: data.get("addr"),
      tokenName,
      tokenSymbol,
      totalSupply,
    });
  };

  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contractInfo.address, ERC20abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance),
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    console.log("in transfer");
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log(signer);
    const erc20 = new ethers.Contract(contractInfo.address, ERC20abi, signer);
    await erc20.transfer(data.get("recipient"), data.get("amount"));
  };

  function Copyright(props) {
    return (
      <Typography
        varient="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright @"}
        <Link color="inherit" href="http://mui.com">
          Aditi Gune
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <>
      <Container>
        <Typography
          component="h1"
          varient="h2"
          align="center"
          color="red"
          gutterBottom
        >
          Contract Deatils
        </Typography>
      </Container>
      <Container spacing={10}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  title="Read from contract"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                ></CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <label>Enter Contract number:</label>
                      <input
                        type="text"
                        name="addr"
                        placeholder="ERC20 contract address"
                        maxLength={100}
                      />
                    </Box>
                    <Button type="submit" fullWidth variant="contained">
                      Get Token Info
                    </Button>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Symbol</TableCell>
                            <TableCell align="right">Total Supply</TableCell>
                            <TableCell align="right">Deployed At</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {contractInfo.tokenName}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {contractInfo.tokenSymbol}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {String(contractInfo.totalSupply)}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {contractInfo.deployedAt}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button
                      onClick={getMyBalance}
                      variant="contained"
                      fullWidth
                    >
                      Get Token Balance
                    </Button>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Balance</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{balanceInfo.address}</TableCell>
                            <TableCell>{String(balanceInfo.balance)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader
                  title="Write to contract"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                ></CardHeader>
                <CardContent>
                  <form onSubmit={handleTransfer}>
                    <Box>
                      <Box
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
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          mb: 2,
                        }}
                      >
                        <label>To Account:</label>
                        <input
                          type="text"
                          name="amount"
                          placeholder="Amount to transfer"
                        />
                      </Box>
                    </Box>
                    <br></br>
                    <br></br>
                    <Button type="submit" variant="contained" fullWidth>
                      Transfer
                    </Button>
                  </form>
                </CardContent>
                <CardAction></CardAction>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  title="Recent Transactions"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                ></CardHeader>
                <CardContent>
                  <TransactionList txs={txns} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
};

export default ContractDetails;
