import { Text, StyleSheet, View, FlatList } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

import ExpenseSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';



function ExpensesOutput({ expenses, expensePeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
            {content}
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
    infoText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 32,
    },
});
