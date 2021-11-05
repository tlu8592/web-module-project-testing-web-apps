import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less than 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.queryByPlaceholderText('Edd');
    userEvent.type(firstNameInput, 'Edd');

    const firstNameError = screen.queryByTestId("error");
    expect(firstNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitBtn = screen.queryByRole('button');
    userEvent.click(submitBtn);

    const firstNameError = screen.queryByText(/must have at least 5 characters/i);
    const lastNameError = screen.queryByText(/lastname is a required field/i);
    const emailError = screen.queryByText(/must be a valid email address/i);

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.queryByPlaceholderText('Edd');
    userEvent.type(firstNameInput, 'Ralph');

    const lastNameInput = screen.queryByPlaceholderText('Burke');
    userEvent.type(lastNameInput, 'Vaughn');

    const submitBtn = screen.queryByRole('button');
    userEvent.click(submitBtn);

    const errorMessage = screen.queryByTestId("error");
    expect(errorMessage).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.queryByLabelText(/email/i);
    userEvent.type(emailInput, 'email.com');

    const emailError = screen.queryByText(/must be a valid email address/i);
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.queryByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Franco');

    const emailInput = screen.queryByLabelText(/email/i);
    userEvent.type(emailInput, 'franco@email.com');

    const submitBtn = screen.queryByRole('button');
    userEvent.click(submitBtn);

    const errorMessage = screen.queryByTestId('error');
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.queryByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Franco');

    const lastNameInput = screen.queryByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Corelli');

    const emailInput = screen.queryByLabelText(/email/i);
    userEvent.type(emailInput, 'franco_corelli@opera.com');

    const submitBtn = screen.queryByRole('button');
    userEvent.click(submitBtn);

    const messageDisplay = screen.queryByTestId('messageDisplay');
    expect(messageDisplay).toBeFalsy();
});

test('renders all fields text when all fields are submitted.', async () => {
});