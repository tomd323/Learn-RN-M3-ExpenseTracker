import { Text } from 'react-native';
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../Components/UI/LoadingOverlay';
import ErrorOverlay from '../Components/UI/ErrorOverlay';

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses)

            } catch (error) {
                setError('could not fetch expenses');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />  // LoadingOverlay   
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return expense.date > date7DaysAgo;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensePeriod={"Last 7 Days"}
            fallbackText={'no expenses input in the last 7days.'}
        />
    )
}

export default RecentExpenses;