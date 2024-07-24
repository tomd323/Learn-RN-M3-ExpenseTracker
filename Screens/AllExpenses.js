import { Text } from 'react-native';
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensePeriod={"Total"}
        fallbackText={'no expenses registered.'} />
}

export default AllExpenses;