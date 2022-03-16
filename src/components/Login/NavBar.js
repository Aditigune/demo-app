import React from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useMoralis } from "react-moralis";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const NavBar = () => {
  const { authenticate, account, chainId, user, logout } = useMoralis();
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            BlockChain-React <b> {account} </b>
          </Typography>

          <nav>
            <Button onClick={authenticate}>Connect Wallet</Button>

            <Link
              varient="button"
              color="text.secondary"
              href="/aavedeposit"
              sx={{ my: 1, mx: 1.5 }}
            >
              Deposit Aave
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/contractdetails"
              sx={{ my: 1, mx: 1.5 }}
            >
              Contract Details
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/voting"
              sx={{ my: 1, mx: 1.5 }}
            >
              Voting
            </Link>
            <Button onClick={logout}>Logout</Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default NavBar;
