import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudget } from "../context/BudgetContext";
const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget,budgets } = useBudget();
  const handleSumbit = (e) => {
    e.preventDefault();
    addBudget({
      id: budgets.budgetId,
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose()
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSumbit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
