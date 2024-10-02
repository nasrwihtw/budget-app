
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import { BudgetCard } from "./component/BudgetCard";
import AddBudgetModal from "./component/AddBudgetModal";
import AddExpenseModal from "./component/AddExpenseModal";
import ViewExpensesModel from "./component/ViewExpensesModal";
import UnCotegorizedBudgetCard from "./component/UnCotegorizedBudgetCard"
import TotalBudgetCard from "./component/TotalBudgetCard"
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "./context/BudgetContext";
function App() {
  const [showAddBudgetModal, setshowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setshowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setaddExpenseModalBudgetId] = useState();
  const [ViewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudget();

  const openAddExpenseModal = (budgetId) => {
    setshowAddExpenseModal(true);
    setaddExpenseModalBudgetId(budgetId);
  };
  return (
    <>
      <Container className="my-4">
        <Stack gap={2} direction="horizontal" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button onClick={() => setshowAddBudgetModal(true)} variant="primary">
            Add Budget
          </Button>
          <Button variant="outline-secondary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.name).reduce(
            (total, expense) => total + expense.amount, 0
          );
          console.log(budgets)
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.name)}
              onViewExpenseClick={ () => setViewExpenseModalBudgetId(budget.name) }
            />
          );
        })}
        <UnCotegorizedBudgetCard
        onAddExpenseClick={openAddExpenseModal}
        onViewExpenseClick={ () => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID) }
        />
        <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setshowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setshowAddExpenseModal(false)}
      />
      <ViewExpensesModel budgetId={ViewExpenseModalBudgetId} handleClose={()=> setViewExpenseModalBudgetId()} />
    </>
  );
}

export default App;
