import axios from "axios";

const url = "https://rn-module-et-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
    const response = await axios.post(`${url}/expenses.json`, expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(`${url}/expenses.json`);

    const expenses = [];

    for (const key in response.data) {
        const expense = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            title: response.data[key].title,
        };
        expenses.push(expense);
    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(`${url}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(`${url}/expenses/${id}.json`);
}