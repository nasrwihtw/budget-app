
import { BudgetCard } from "./BudgetCard";
import { useBudget } from "../context/BudgetContext";

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudget();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  return <BudgetCard name="Total" amount={amount} max={max} gray hideButtons />;
};

export default TotalBudgetCard;
