import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { ExpensesContext } from '../store/expenses-context';
import { GlobalStyles } from '../constants/styles';

import IconButton from '../Components/UI/IconButton';
import ExpenseForm from '../Components/ManageExpense/ExpenseForm';

function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });

    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
            navigation.goBack();
        } else {
            expensesCtx.addExpense(expenseData);
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash-outline"
                        size={36}
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
});