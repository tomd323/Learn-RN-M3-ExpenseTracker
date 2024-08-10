import { useLayoutEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ExpensesContext } from '../store/expenses-context';
import { GlobalStyles } from '../constants/styles';

import IconButton from '../Components/UI/IconButton';
import ExpenseForm from '../Components/ManageExpense/ExpenseForm';
import { storeExpense, deleteExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../Components/UI/LoadingOverlay';
import ErrorOverlay from '../Components/UI/ErrorOverlay';

function ManageExpense({ route, navigation }) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });

    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsFetching(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();

        } catch (error) {
            setError('could not delete expense');
            setIsFetching(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        try {
            if (isEditing) {
                setIsFetching(true);
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                setIsFetching(true);
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();

        } catch (error) {
            setError('Could not save data - try again later')
            setIsFetching(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />  // LoadingOverlay   
    }


    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                navigation={navigation}
                defaultValues={selectedExpense}
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