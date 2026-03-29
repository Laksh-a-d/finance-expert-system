import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ padding: "15px", background: "black" }}>
      <Link to="/" style={{ color: "white", marginRight: "15px" }}>Dashboard</Link>
      <Link to="/analyze" style={{ color: "white", marginRight: "15px" }}>Analyze</Link>
      <Link to="/history" style={{ color: "white", marginRight: "15px" }}>History</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
    </div>
  );
}

export default Navbar;