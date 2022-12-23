import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../hooks/connect";
import { switchSongbirdNetwork } from "../../hooks/switch-network";

import Button from "../common/button";

import { FaWallet } from "react-icons/fa";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";

import "./header.css";

import LogoImg from "../../assets/images/bg/n2dr-logo.png";

export default function Header() {
  const { account, chainId, activate, deactivate } = useWeb3React();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  async function connect() {
    console.log("chainid", chainId);
    if (chainId !== 19 || chainId === undefined) {
      switchSongbirdNetwork();
    }
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
      window.location.reload();
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      id="header"
      className="fixed flex justify-between p-1 px-10 w-full z-50">
      {/* <h5 className="bg-gradient-to-r border-2 font-bold from-purple-700 p-1 rounded-lg sm:text-2xl text-white text-xl to-pink-600 uppercase">
        PETS NFTs
      </h5> */}{" "}
      <img
        src={LogoImg}
        alt="logoImg"
        width="70px"
        height="70px"
        className=""
      />
      <div className="header_link hidden lg:block w-full">
        <ul className="flex justify-center ml-32 my-4">
          <li className="cursor-pointer duration-200 font-bold hover:text-blue-400 px-3 text-sm text-white transition-all uppercase">
            <a href="/" target="_blank" rel="noreferrer">
              Dashboard
            </a>
          </li>
          <li className="cursor-pointer duration-200 font-bold hover:text-blue-400 px-3 text-sm text-white transition-all uppercase">
            <a href="/" target="_blank" rel="noreferrer">
              List NFTs
            </a>
          </li>
          <li className="cursor-pointer duration-200 font-bold hover:text-blue-400 px-3 text-sm text-white transition-all uppercase">
            <a
              href="https://www.monstersnftinc.co/staking/"
              target="_blank"
              rel="noreferrer">
              Stake NFTs
            </a>
          </li>
          <li className="cursor-pointer duration-200 font-bold hover:text-blue-400 px-3 text-sm text-white transition-all uppercase">
            <a
              href="https://monstermarket-next.vercel.app/"
              target="_blank"
              rel="noreferrer">
              Marketplace
            </a>
          </li>
          <li className="cursor-pointer duration-200 font-bold hover:text-blue-300 px-3 text-sm text-white transition-all uppercase">
            <a href="/" target="_blank" rel="noreferrer">
              Bridge NFTs
            </a>
          </li>
        </ul>
      </div>
      <div className="flex my-2">
        {!account ? (
          <Button
            className="connectWallet_btn rounded-xl"
            onClick={() => connect()}>
            <FaWallet /> Connect Wallet
          </Button>
        ) : (
          <Button
            className="connectWallet_btn rounded-xl"
            onClick={() => disconnect()}>
            <FaWallet />
            {account.toString().slice(0, 4)} .... {account.toString().slice(-4)}
          </Button>
        )}
        <div className="block duration-300 h-10 hover:bg-blue-900 lg:hidden m-1 mobileMenu_icon mx-3 p-2 rounded-lg transition-all w-10">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {!showMobileMenu ? (
              <RiMenu4Line size="1.5rem" color="white" />
            ) : (
              <RiCloseLine size="1.5rem" color="white" />
            )}
          </button>
        </div>
      </div>
      <div className={`mobile-nav ${showMobileMenu ? "opened" : ""}`}>
        <ul className="cursor-pointer font-extrabold font-mono header-ul px-3 text-3xl text-[#737b8f] uppercase">
          <li className="duration-300 hover:text-blue-400 px-4 py-2">
            Dashboard
          </li>
          <li className="duration-300 hover:text-blue-400 px-4 py-2">
            List NFTs
          </li>
          <li className="duration-300 hover:text-blue-400 px-4 py-2">
            Stake NFTs
          </li>
          <li className="duration-300 hover:text-blue-400 px-4 py-2">
            Marketplace
          </li>
          <li className="duration-300 hover:text-blue-400 px-4 py-2">
            Bridge NFTs
          </li>
        </ul>
      </div>
    </header>
  );
}
