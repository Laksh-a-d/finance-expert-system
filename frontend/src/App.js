import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import FinanceForm from "./components/FinanceForm";

import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="/finance" element={<FinanceForm />} />
      </Routes>
    </Router>
  );
}

export default App;