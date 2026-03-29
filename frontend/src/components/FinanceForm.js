import React, { useState } from "react";

function FinanceForm() {

  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [debt, setDebt] = useState("");
  const [risk, setRisk] = useState("medium");

  const [result, setResult] = useState([]);
  const [score, setScore] = useState(null);

  const analyzeFinance = async () => {

    try {

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          income: Number(income),
          expenses: Number(expenses),
          debt: Number(debt),
          risk: risk
        })
      });

      const data = await response.json();

      // Safe assignment
      setScore(data.financialScore ?? null);
      setResult(data.recommendations ?? []);

    } catch (error) {

      console.error("Error calling API:", error);
      setScore(null);
      setResult([]);

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Personal Finance Expert System</h2>

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Expenses"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Debt"
        value={debt}
        onChange={(e) => setDebt(e.target.value)}
      />

      <br /><br />

      <select value={risk} onChange={(e) => setRisk(e.target.value)}>
        <option value="low">Low Risk</option>
        <option value="medium">Medium Risk</option>
        <option value="high">High Risk</option>
      </select>

      <br /><br />

      <button onClick={analyzeFinance}>Analyze Finance</button>

      <br /><br />

      {/* Financial Score */}

      {score !== null && (
        <h2>Financial Health Score: {score}/100</h2>
      )}

      <h3>Recommendations</h3>

      {Array.isArray(result) && result.length > 0 ? (
        result.map((r, index) => (
          <div key={index}>
            <p><b>Advice:</b> {r.recommendation}</p>
            <p><b>Confidence:</b> {r.confidence}</p>
            <p><b>Reason:</b> {r.reason}</p>
          </div>
        ))
      ) : (
        <p>No recommendations yet.</p>
      )}

    </div>
  );
}

export default FinanceForm;