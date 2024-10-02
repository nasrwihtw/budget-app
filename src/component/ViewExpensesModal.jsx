import { Modal, Stack, Button } from "react-bootstrap";
import { useBudget, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";
import {currencyFormatter} from "../utlities"

const ViewExpensesModel = ({ handleClose, budgetId }) => {
  const { getBudgetExpenses, deleteExpense, deleteBudget, budgets } =
    useBudget();

      const expenses = getBudgetExpenses(budgetId)
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "UnCategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => (b.id = budgetId));
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expense - {budget?.name}</div>
            { budgetId !== UNCATEGORIZED_BUDGET_ID  && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
            {expenses.map(expense => (
              <Stack direction="horizontal">
                  <div className="me-auto fs-4">{expense.description}</div>
                  <div className="fs-5 me-2">{currencyFormatter.format(expense.amount)}</div>
                  <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger" >&times;</Button>
              </Stack>
            ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModel;
