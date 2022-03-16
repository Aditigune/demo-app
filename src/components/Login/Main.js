import React from "react";
import { Route, Routes } from "react-router-dom";
import ContractDetails from "../Contract/ContractDetails";

import Home from "../Home/Home";
import NoPages from "../../pages/NoPages";
import MyNFT from "../NFT/MyNFT";
import AAVEDeposit from "../Aave/AAVEDeposit";
import Voting from "../Voting/Voting";

function Main() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="*" element={<NoPages />} />

      <Route exact path="contractdetails" element={<ContractDetails />} />
      <Route exact path="mynfts" element={<MyNFT />} />
      <Route exact path="aavedeposit" element={<AAVEDeposit />} />
      <Route exact path="voting" element={<Voting />} />
    </Routes>
  );
}

export default Main;
