const express = require("express");
const router = express.Router({mergeParams:true});

const budgetContribution=require('../controllers/dashboard/budgetContribution');
const budgetvsexpenses=require('../controllers/dashboard/budgetvsexpenses');
const latestexpenses=require('../controllers/dashboard/latestexpenses');
const totalvalue=require('../controllers/dashboard/totalvalue');
const quote=require('../controllers/dashboard/quote')
const authorisation=require('../middleware/authorizeUser')

router.get("/budgetcontribution",authorisation,budgetContribution);
router.get("/budgetvsexpenses",authorisation,budgetvsexpenses);
router.get('/latestexpenses',authorisation,latestexpenses);
router.get('/totalvalue',authorisation,totalvalue);
router.get('/quote',quote);
module.exports = router;
