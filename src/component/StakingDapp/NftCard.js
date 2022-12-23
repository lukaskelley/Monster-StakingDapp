import { useState } from "react";
import Button from "../common/button";
import config from "../../config/config";
import { ClassicSpinner } from "react-spinners-kit";

import StakingImg from "../../assets/images/bg/art.png";
import { useWeb3React } from "@web3-react/core";

import NFTSTAKINGCONTRACT_ABI from "../../assets/abis/NFTSTAKINGACONTRACT_ABI.json";

const ethers = require("ethers");
const NftCard = ({ stakedState, imgUrl, tokenId, contractAddr }) => {
  const { account } = useWeb3React();
  const [stakeLoadingState, setStakeLoadingState] = useState(false);
  const [unStakeLoadingState, setUnStakeLoadingState] = useState(false);
  const [claimLoadingState, setClaimLoadingState] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = provider.getSigner();

  const stakeContract = new ethers.Contract(
    config.NFTSTAKINGCONTRACT_ADDRESS,
    NFTSTAKINGCONTRACT_ABI,
    Signer
  );

  const stakeNft = async () => {
    setStakeLoadingState(true);
    let tokenIdArray = [tokenId];
    await stakeContract
      .stake(
        contractAddr === config.MONSTERDUDES_ADDRESS
          ? 0
          : contractAddr === config.PLUSHBABIES_ADDRESS
          ? 1
          : 2,
        tokenIdArray,
        { gasLimit: config.totalGas }
      )
      .then((tx) => {
        tx.wait()
          .then(() => {
            setStakeLoadingState(false);
            console.log("success");
          })
          .catch(() => {
            setStakeLoadingState(false);
            console.log("error");
          });
      })
      .catch(() => {
        setStakeLoadingState(false);
        console.log("error");
      });
  };

  const unstake = async () => {
    setUnStakeLoadingState(true);
    let stakedNfts = await stakeContract.tokensOfOwner(account, 0);
    console.log("stakedNfts => ", stakedNfts);
    // console.log("stakingContract => ", stakeContract);
  };

  const claim = async () => {
    setClaimLoadingState(true);
  };

  return (
    <>
      {!stakedState ? (
        <div className="border-blue-500 nftCard w-full">
          <img src={imgUrl} alt="stakingIMG" className="rounded-t-lg" />
          <h1 className="font-regular text-center text-sm text-white">
            {" "}
            {contractAddr === config.MONSTERDUDES_ADDRESS
              ? "Monster Dudes"
              : contractAddr === config.PLUSHBABIES_ADDRESS
              ? "Plush Babies"
              : "Spooky Monster"}{" "}
          </h1>
          <h1 className="font-bold text-center text-sm text-white">
            {" "}
            #{tokenId}
          </h1>
          <Button
            variant="hover"
            className="bottom-0 mt-2 py-2 rounded-b-lg"
            onClick={() => stakeNft()}>
            Stake{" "}
            {stakeLoadingState && (
              <div className="mx-2">
                <ClassicSpinner size={15} />
              </div>
            )}
          </Button>
        </div>
      ) : (
        <div className="border-blue-500 nftCard w-full">
          <img src={StakingImg} alt="stakingIMG" className="rounded-t-lg" />
          <h1 className="font-regular mx-2 text-center text-sm text-white">
            {" "}
            Monster Dudes
          </h1>
          <h1 className="font-bold text-center text-sm text-white"> #23</h1>
          <Button
            variant="hover"
            className="border-b-2 border-white mt-1 py-2"
            onClick={() => unstake()}>
            Unstake{" "}
            {unStakeLoadingState && (
              <div className="mx-2">
                <ClassicSpinner size={15} />
              </div>
            )}
          </Button>
          <Button
            variant="hover"
            className="py-2 rounded-b-lg"
            onClick={() => claim()}>
            claim
            {claimLoadingState && (
              <div className="mx-2">
                <ClassicSpinner size={15} />
              </div>
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default NftCard;
