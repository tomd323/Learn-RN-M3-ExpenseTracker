import { Text, StyleSheet, View, FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
    )
}

function ExpensesList({ expenses }) {

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={expenses}
            renderItem={renderExpenseItem}
        />
    )
};

export default ExpensesList;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
