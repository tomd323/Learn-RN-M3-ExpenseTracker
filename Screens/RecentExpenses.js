import { Text } from 'react-native';
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return expense.date > date7DaysAgo;
    });

    return <ExpensesOutput
        expenses={recentExpenses}
        expensePeriod={"Last 7 Days"}
        fallbackText={'no expenses input in the last 7days.'}
    />
}

export default RecentExpenses;