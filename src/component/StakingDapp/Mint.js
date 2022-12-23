import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../common/button";

import config from "../../config/config";
import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";

import { GooSpinner } from "react-spinners-kit";

const ethers = require("ethers");

const Mint = () => {
  const { account } = useWeb3React();
  const [mintCount, setMintCount] = useState(1);
  const [mintLoadingState, setMintLoadingState] = useState(false);
  const [mintToken, setMintToken] = useState("SGB");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = provider.getSigner();

  const nftContract = new ethers.Contract(
    config.NFTCONTRACT_ADDRESS,
    NFTCONTRACT_ABI,
    Signer
  );

  const mint = async () => {
    setMintLoadingState(true);
    if (mintToken === "SGB") {
      await nftContract
        .mint(account, mintCount, {
          gasLimit: config.totalGas,
        })
        .then((tx) => {
          tx.wait().then(() => {
            setMintLoadingState(false);
          });
        })
        .catch(() => {
          setMintLoadingState(false);
          console.log("Canceled Mint");
        });
    } else if (mintToken === "MonsterBits") {
      await nftContract
        .mintpid(account, mintCount, 0, {
          gasLimit: config.totalGas,
        })
        .then((tx) => {
          tx.wait().then(() => {
            setMintLoadingState(false);
          });
        })
        .catch(() => {
          setMintLoadingState(false);
          console.log("Canceled Mint");
        });
    } else {
      await nftContract
        .mintpid(account, mintCount, 1, {
          gasLimit: config.totalGas,
        })
        .then((tx) => {
          tx.wait().then(() => {
            setMintLoadingState(false);
          });
        })
        .catch(() => {
          setMintLoadingState(false);
          console.log("Canceled Mint");
        });
    }
  };

  return (
    <div className="w-full">
      <div className="h-auto m-3 mint_content p-4 rounded-lg">
        <h1 className="font-bold text-2xl text-center text-white">
          NFT Minter
        </h1>
        <h1 className="font-bold py-4 text-3xl text-center text-white">
          0 / 1000
        </h1>
        <h1 className="font-bold text-center text-green-400 text-md">
          {account
            ? account.toString().slice(0, 4) +
              "...." +
              account.toString().slice(-4)
            : "Please Connect the wallet"}
        </h1>
        <h1 className="font-bold text-center text-sm text-white">
          Select NFT Quantity
        </h1>
        <div className="flex justify-center">
          <button
            className="cursor-pointer duration-300 flex font-bold px-4 rounded-xl text-4xl text-white transition-all"
            onClick={() =>
              mintCount <= 1 ? mintCount : setMintCount(mintCount - 1)
            }>
            -
          </button>
          <h1 className="font-bold p-1 px-5 text-4xl text-white">
            {mintCount}
          </h1>
          <button
            className="cursor-pointer duration-300 flex font-bold px-3 rounded-xl text-4xl text-white transition-all"
            onClick={() =>
              mintCount >= 5 ? mintCount : setMintCount(mintCount + 1)
            }>
            +
          </button>
        </div>
        <h1 className="font-bold py-2 text-center text-sm text-white">
          Buy with your preferred crypto!
        </h1>
        <div className="gap-2 grid grid-cols-2 w-full">
          <select
            defaultValue="SGB"
            className=" font-general-medium cursor-pointer
                              sm:px-1
                              py-2
                              mr-2
                              rounded-xl
                              text-sm
                              sm:text-md
                              font-medium bg-gray-700
                              text-white
                              outline-none"
            onChange={(e) => {
              setMintToken(e.target.value);
            }}>
            <option>SGB</option>
            <option>SDOOD</option>
            <option>MonsterBits</option>
          </select>
          <Button
            className="bg-blue-500 py-2 rounded-xl"
            onClick={() => mint()}>
            Mint{" "}
            {mintLoadingState && (
              <div className="mx-2">
                <GooSpinner size={20} />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Mint;
