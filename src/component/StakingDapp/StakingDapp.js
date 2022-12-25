// import Countdown from "react-countdown";

// import Button from "../common/button";
// import SliderNFT from "./Slider";

import { useEffect, useState } from "react";
import MintStyleWrapper from "./Staking.style";

import Button from "../common/button";

import "./stakingDapp.css";

import StakingImg from "../../assets/images/bg/art.png";
import { useWeb3React } from "@web3-react/core";

import config from "../../config/config";
import NFTSTAKINGCONTRACT_ABI from "../../assets/abis/NFTSTAKINGACONTRACT_ABI.json";
import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";

import { ClassicSpinner } from "react-spinners-kit";

import Mint from "./Mint";
import StakeComponent from "./Stake";

const ethers = require("ethers");

const StakingDapp = () => {
  const { account } = useWeb3React();
  const [ownerStakedNftCount, setOwnerStakedNftCount] = useState(0);
  const [totalStakedNftCount, setTotalStakedNftCount] = useState(0);

  const [verifyLoadingState, setVerifyLoadingState] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = provider.getSigner();

  const stakingContract = new ethers.Contract(
    config.NFTSTAKINGCONTRACT_ADDRESS,
    NFTSTAKINGCONTRACT_ABI,
    Signer
  );

  const nftContract = new ethers.Contract(
    config.NFTCONTRACT_ADDRESS,
    NFTCONTRACT_ABI,
    Signer
  );

  useEffect(() => {
    if (account) {
      getStakedNFTCount();
      // getMintedCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const getStakedNFTCount = async () => {
    let ownerStaked;
    let totalStaked;
    ownerStaked = await stakingContract.tokensOfOwner(account, 0);
    totalStaked = await stakingContract.balanceOf(account, 0);
    console.log(
      "ownerStaked => ",
      ownerStaked,
      "totalStaked => ",
      Number(totalStaked.toString())
    );
    setOwnerStakedNftCount(Number(ownerStaked.toString()));
    setTotalStakedNftCount(Number(totalStaked.toString()));
  };

  // const getMintedCount = async () => {
  //   const count = await nftContract.walletOfOwner(account);
  //   console.log(Number(count.toString()));
  // };

  const verifyStakedNftCount = () => {
    setVerifyLoadingState(true);
    getStakedNFTCount();
    setVerifyLoadingState(false);
  };

  const authorizeWallet = async () => {
    await nftContract.setApprovalForAll(
      config.NFTSTAKINGCONTRACT_ADDRESS,
      true,
      { gasLimit: config.totalGas }
    );
  };

  return (
    <MintStyleWrapper>
      <div className="md:container mt-20 sm:mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
          <Mint />
          <div className="col-span-2 m-3 p-4 rounded-lg staking_content">
            <h1 className="font-bold text-2xl text-center text-white">
              Monsters NFT Staking Vault
            </h1>
            <div className="w-full">
              <h1 className="font-bold my-3 text-center text-sm text-white">
                First time Staking?
              </h1>
              <div className="flex justify-center w-full">
                <Button
                  variant="blue"
                  className="authorize_btn rounded-xl"
                  onClick={() => authorizeWallet()}>
                  Authorize Your Wallet
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 p-5 sm:grid-cols-3">
              <div className="m-3 rounded-lg staking_content">
                <h1 className="font-bold my-3 text-center text-sm text-white">
                  Your Vault Activity
                </h1>
                <h1 className="font-bold my-3 text-center text-sm text-white">
                  Verify Staked Amount
                </h1>
                <div className="flex justify-center px-1 w-full">
                  <Button
                    variant="hover"
                    className="rounded-xl verify_btn"
                    onClick={() => verifyStakedNftCount()}>
                    Verify {verifyLoadingState && <ClassicSpinner size={24} />}
                  </Button>
                </div>
                <h1 className="font-bold my-3 text-center text-sm text-white">
                  Your Staked NFTs : {ownerStakedNftCount}s
                </h1>
                <h1 className="font-bold my-3 text-center text-sm text-white">
                  Total Staked NFTs : {totalStakedNftCount}s
                </h1>

                <div className="flex justify-center mb-3 px-1 w-full">
                  <Button variant="hover" className="rounded-xl unstakeAll_btn">
                    Unstake All
                  </Button>
                </div>
              </div>
              <img
                src={StakingImg}
                alt="art"
                className="mt-3 object-cover rounded-lg"
              />
              <div className="m-3 rounded-lg staking_content">
                <h1 className="font-bold my-3 text-center text-sm text-white">
                  Staking Rewards
                </h1>
                <div className="flex justify-center px-2 w-full">
                  <Button variant="hover" className="earned_btn rounded-xl">
                    Earned Rewards
                  </Button>
                </div>

                <h1 className="font-bold my-3 text-center text-green-500 text-sm">
                  Earned Tokens
                </h1>
                <h1 className="font-bold my-3 text-center text-sm text-white">
                  Claim Rewards
                </h1>
                <div className="flex justify-center mb-3 px-1 w-full">
                  <Button variant="hover" className="rounded-xl unstakeAll_btn">
                    Claim
                  </Button>
                </div>
              </div>
            </div>
            <div className="activeReward_table my-2 p-5">
              <h1 className="font-regular text-center text-white text-xl">
                Monsters NFT Staking Vault
              </h1>
              <div className="rounded-lg staking_content">
                <table className="staking-content text-center text-white w-full">
                  <thead className="border-b-2 border-blue-500">
                    <tr>
                      <th>Collection</th>
                      <th>Rewards Perday</th>
                      <th>Exchangeable Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monster Truck Collection</td>
                      <td>0.50 MonsterBits</td>
                      <td>2 NFTs/M</td>
                    </tr>
                    <tr>
                      <td>Monster Silver Collection</td>
                      <td>2.50 MonsterBits </td>
                      <td>10 NFTs/M</td>
                    </tr>
                    <tr className="stakegoldeffect">
                      <td>Monster Gold Collection</td>
                      <td>1 MonsterBits+ </td>
                      <td>25 NFTs/M or 100 N2DR/M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="activeReward_table my-2 p-5">
              <h1 className="font-regular text-center text-white text-xl">
                Monsters Token Stake Farms
              </h1>
              <div className="rounded-lg staking_content">
                <table className="staking-content text-center text-white w-full">
                  <thead className="border-b-2 border-blue-500">
                    <tr>
                      <th>Farm Pools</th>
                      <th>Harvest Daily Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Stake MonsterBits to Earn MonsterBits </td>
                      <td>0.01 Per MB</td>
                    </tr>
                    <tr>
                      <td>Stake MonsterBits to Earn MonsterBits+ </td>
                      <td>0.005 Per MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <StakeComponent stakingContract={stakingContract} />
      </div>
    </MintStyleWrapper>
  );
};

export default StakingDapp;
