import styled from "styled-components";
// import BgShape from "../../assets/images/bg/mint-1_bg.png";
// import gradientShape from "../../assets/images/nft/v4_baner_mesh-grad.png";

const MintStyleWrapper = styled.section`
  background: radial-gradient(
    circle at 50% 50%,
    #5e99ac,
    #508aa3,
    #35678f,
    #1f457a,
    #173771
  );
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

export default MintStyleWrapper;
