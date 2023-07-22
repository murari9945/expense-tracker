// AddExpensePage.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {Provider} from 'react-redux';
import AddExpensePage from './AddExpensePage';

describe('AddExpensePage Component', () => {
  // Test case: Verify that the "Add Expense" button is rendered
  it('should render the "Add Expense" button', () => {
    render(
    <Provider><AddExpensePage /></Provider>);
    const addButton = screen.getByText('Add Expense');
    expect(addButton).toBeInTheDocument();
  });

  // Test case: Verify that the form can be submitted with valid data
  it('should add a new expense when the form is submitted with valid data', () => {
    render(<AddExpensePage />);

    // Fill in the form with valid data
    const moneySpentInput = screen.getByLabelText('MoneySpent:');
    const descriptionInput = screen.getByLabelText('Description:');
    const categoryInput = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Add Expense' });

    fireEvent.change(moneySpentInput, { target: { value: '100' } });
    fireEvent.change(descriptionInput, { target: { value: 'Groceries' } });
    fireEvent.change(categoryInput, { target: { value: 'Food' } });

    fireEvent.click(submitButton);

    // Verify that the new expense is displayed in the expense list
    const moneySpentElement = screen.getByText('100');
    const descriptionElement = screen.getByText('Groceries');
    const categoryElement = screen.getByText('Food');

    expect(moneySpentElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
  });

  // Test case: Verify that the form shows an error message with invalid data
  it('should show an error message with invalid data', () => {
    render(<AddExpensePage />);

    // Fill in the form with invalid data (missing required fields)
    const submitButton = screen.getByRole('button', { name: 'Add Expense' });
    fireEvent.click(submitButton);

    // Verify that error messages are displayed for the required fields
    const moneySpentError = screen.getByText('MoneySpent is required');
    const descriptionError = screen.getByText('Description is required');
    const categoryError = screen.getByText('Category is required');

    expect(moneySpentError).toBeInTheDocument();
    expect(descriptionError).toBeInTheDocument();
    expect(categoryError).toBeInTheDocument();
  });

  // Add more test cases as needed to cover other functionalities and scenarios
});
