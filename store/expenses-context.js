import { createContext, useState, useReducer } from "react";

const DUMMY_EXPENSES = [
    { id: 'e1', title: 'New Shoes', amount: 99.99, date: new Date(2024, 7, 23) },
    { id: 'e2', title: 'New Shirt', amount: 59.99, date: new Date(2021, 4, 19) },
    { id: 'e3', title: 'New Pants', amount: 49.99, date: new Date(2024, 7, 20) },
    { id: 'e4', title: 'New Hat', amount: 29.99, date: new Date(2021, 7, 7) },
    { id: 'e5', title: 'New Socks', amount: 19.99, date: new Date(2021, 7, 14) },
    { id: 'e6', title: 'New Underwear', amount: 9.99, date: new Date(2021, 1, 10) },
    { id: 'e7', title: 'New Tie', amount: 39.99, date: new Date(2021, 7, 1) },
    { id: 'e8', title: 'New Belt', amount: 49.99, date: new Date(2021, 7, 24) },
    { id: 'e9', title: 'New Watch', amount: 199.99, date: new Date(2021, 7, 18) },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;


    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })

    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    );
}


export default ExpensesContextProvider;