const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema({

    income: Number,
    expenses: Number,
    debt: Number,
    risk: String,
    financialScore: Number,
    recommendations: Array

});

module.exports = mongoose.model("Finance", FinanceSchema);