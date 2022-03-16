import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const MyNFT = () => {
  const { isAuthencticate } = useMoralis();

  const getNFT = async () => {
    /*  const response = await fetch(
      `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${isAuthencticate}`
    );

    const data = await response.json();
    debugger; */
  };

  useEffect(() => {
    getNFT();
  }, [isAuthencticate]);

  return (
    <div>
      {isAuthencticate ? getNFT() : <div>"Please connect wallet" </div>}
    </div>
  );
};

export default MyNFT;
