import React, { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalstorage from "../hooks/useLocalstorage";
const BudgetContext = createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalstorage("budgets", []);
  const [expenses, setExpenses] = useLocalstorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        console.log("hello");
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function deleteBudget({ id }) {
    // TODO: deal with expenses
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((expenses) => {
      return expenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
