const express = require("express");
const cors = require("cors");
const analyzeFinance = require("../inference-engine/inferenceEngine");
const connectDB = require("./config/db");
const Finance = require("./models/FinanceModel");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Finance Expert System API is running");
});


app.post("/analyze", (req, res) => {

    const userData = req.body;

    console.log("User Data:", userData);

    const result = analyzeFinance(userData);

    res.json(result)

});
app.get("/analyze", (req, res) => {
    res.send("Use POST request to analyze finance data.");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/analyze", async (req, res) => {

    const userData = req.body;

    const result = analyzeFinance(userData);

    const financeRecord = new Finance({

        income: userData.income,
        expenses: userData.expenses,
        debt: userData.debt,
        risk: userData.risk,
        financialScore: result.financialScore,
        recommendations: result.recommendations

    });

    await financeRecord.save();

    res.json(result);

});