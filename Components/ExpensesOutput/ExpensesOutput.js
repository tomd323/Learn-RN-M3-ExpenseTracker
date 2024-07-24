import { Text, StyleSheet, View, FlatList } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

import ExpenseSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';



function ExpensesOutput({ expenses, expensePeriod }) {

    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    )
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    },
});
