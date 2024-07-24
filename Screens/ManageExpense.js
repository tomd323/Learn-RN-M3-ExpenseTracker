import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { GlobalStyles } from '../constants/styles';

import IconButton from '../Components/UI/IconButton';
import Button from '../Components/UI/Button';

function ManageExpense({ route, navigation }) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });


    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        // delete expense
        console.log('delete expense');
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        console.log('confirm');
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button customStyle={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button customStyle={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
});