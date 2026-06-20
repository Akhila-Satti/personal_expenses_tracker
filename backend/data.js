let budgets = [
  {
    id: 1,
    bn: "food",
    duration: "30 days",
    to: "12-02-26",
    from: "12-01-26",
    amount: 10000,
    spent: 1500,
    remaining: 8500,
  },
];

let expenses = [
  {
    id: 234,
    bid: 1,
    name: "kurkure",
    amount: 1500,
    date: "13-01-26",
    budgetname: "food",
  },
];
let budgetnames=[
  {
    id:1,
    bn:"food"
  }
]
module.exports = { budgets, expenses,budgetnames };
