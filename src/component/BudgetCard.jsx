import React from "react";
import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utlities";

export const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  hideButtons,
  onViewExpenseClick,
}) => {
  const className = [];

  if (amount > max) {
    className.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    className.push("bg-light");
  }
  return (
    <Card className={className.join("")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div>
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgessBarVaiant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expensee
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpenseClick}>
              View Expensee
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

function getProgessBarVaiant(amount, max) {
  const ratio = amount / max;

  if (ratio < 0.5) return "primary";
  if (ratio < 0.7) return "warning";
  return "danger";
}
