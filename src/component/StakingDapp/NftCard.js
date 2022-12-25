import { useState } from "react";
import Button from "../common/button";
import config from "../../config/config";
import { ClassicSpinner } from "react-spinners-kit";

import NFTSTAKINGCONTRACT_ABI from "../../assets/abis/NFTSTAKINGACONTRACT_ABI.json";
import MONSTERDUDESCONTRACT_ABI from "../../assets/abis/MONSTERDUDES_ABI.json";
import PLUSHBABIESCONTRACT_ABI from "../../assets/abis/PLUSHBABIES_ABI.json";
import SPOOKYCONTRACT_ABI from "../../assets/abis/SPOOKYMONSTER_ABI.json";

const ethers = require("ethers");
const NftCard = ({
  stakedState,
  imgUrl,
  tokenId,
  contractAddr,
  pid,
  stakedimgUrl,
  stakedTokenId,
}) => {
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
    const nftContract = new ethers.Contract(
      contractAddr === config.MONSTERDUDES_ADDRESS
        ? config.MONSTERDUDES_ADDRESS
        : contractAddr === config.PLUSHBABIES_ADDRESS
        ? config.PLUSHBABIES_ADDRESS
        : config.SPOOKYMONSTER_ADDRESS,
      contractAddr === config.MONSTERDUDES_ADDRESS
        ? MONSTERDUDESCONTRACT_ABI
        : contractAddr === config.PLUSHBABIES_ADDRESS
        ? PLUSHBABIESCONTRACT_ABI
        : SPOOKYCONTRACT_ABI,
      Signer
    );

    let tokenIdArray = [tokenId];
    await nftContract
      .approve(config.NFTSTAKINGCONTRACT_ADDRESS, tokenId)
      .then((tx) => {
        tx.wait().then(() => {
          stakeContract
            .stake(
              contractAddr === config.MONSTERDUDES_ADDRESS
                ? 0
                : contractAddr === config.PLUSHBABIES_ADDRESS
                ? 2
                : 3,
              tokenIdArray,
              { gasLimit: config.totalGas }
            )
            .then((tx1) => {
              tx1
                .wait()
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
        });
      });
  };

  const unstake = async () => {
    setUnStakeLoadingState(true);
    let tokenIdArray = [stakedTokenId];
    await stakeContract.unstake(tokenIdArray, pid.toString()).then((tx) => {
      tx.wait()
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("error");
        });
    });
  };

  const claim = async () => {
    setClaimLoadingState(true);
    let tokenIdArray = [stakedTokenId];
    await stakeContract.claim(tokenIdArray, pid.toString()).then((tx) => {
      tx.wait()
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("error");
        });
    });
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
          <img src={stakedimgUrl} alt="stakingIMG" className="rounded-t-lg" />
          <h1 className="font-regular mx-2 text-center text-sm text-white">
            {" "}
            {pid === 0
              ? "Monster Dudes"
              : pid === 2
              ? "Plush Babies"
              : "Spooky Monster"}{" "}
          </h1>
          <h1 className="font-bold text-center text-sm text-white">
            {" "}
            {stakedTokenId}
          </h1>
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
