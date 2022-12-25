import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from "./component/Header";
import StakingDapp from "./component/StakingDapp";
import AppFooter from "./component/Footer";

import { motion } from "framer-motion";
import "./App.css";
function App() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.1 }}>
      <div className="main-section">
        <Router>
          <AppHeader />
          <StakingDapp />
          <AppFooter />
        </Router>
      </div>
    </motion.section>
  );
}

export default App;
