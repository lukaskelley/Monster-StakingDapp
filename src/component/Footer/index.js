import "./footer.css";

import RightImg from "../../assets/images/bg/ethereum.png";
import LeftImg from "../../assets/images/bg/usdt.png";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-900 bottom-0 flex h-14 justify-between lg:px-10 p-2 w-full z-50">
      <img src={LeftImg} alt="leftIMG" />
      <img src={RightImg} alt="RightIMG" className="" />
    </footer>
  );
}
