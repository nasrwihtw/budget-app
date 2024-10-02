import React from "react";
import { BudgetCard } from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../context/BudgetContext";

const UnCotegorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudget();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) return;
  return <BudgetCard name="Uncategorized" {...props} amount={amount} gray />;
};

export default UnCotegorizedBudgetCard;
