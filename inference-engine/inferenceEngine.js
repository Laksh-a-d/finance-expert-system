const fs = require("fs");
const path = require("path");

/* -------- Financial Health Score Function -------- */

function calculateFinancialScore(income, expenses, debt) {

    const savingsRate = (income - expenses) / income;
    const debtRatio = debt / income;

    let score = 50;

    if (savingsRate > 0.3) score += 30;
    else if (savingsRate > 0.2) score += 20;
    else if (savingsRate > 0.1) score += 10;

    if (debtRatio < 0.2) score += 20;
    else if (debtRatio < 0.4) score += 10;
    else score -= 10;

    if (score > 100) score = 100;
    if (score < 0) score = 0;

    return score;
}

/* -------- Expert System Inference Engine -------- */

function analyzeFinance(userData) {

    const rulesPath = path.join(__dirname, "../knowledge-base/rules.json");
    const rulesData = JSON.parse(fs.readFileSync(rulesPath));

    const income = userData.income;
    const expenses = userData.expenses;
    const debt = userData.debt;
    const risk = userData.risk;

    const savings_rate = (income - expenses) / income;
    const debt_ratio = debt / income;

    let recommendations = [];

    rulesData.rules.forEach(rule => {

        try {

            if (eval(rule.condition)) {

                recommendations.push({
                    rule_id: rule.id,
                    recommendation: rule.recommendation,
                    confidence: rule.confidence,
                    reason: rule.condition
                });

            }

        } catch (error) {

            console.error("Rule evaluation error:", error);

        }

    });

    /* -------- Calculate Financial Score -------- */

    const financialScore = calculateFinancialScore(income, expenses, debt);

    /* -------- Final Result -------- */

    return {
        financialScore: financialScore,
        recommendations: recommendations
    };
}

module.exports = analyzeFinance;