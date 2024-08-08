import { TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from '../UI/Button';

function ExpenseForm({ onSubmit, navigation, submitButtonLabel }) {
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            };
        });

    }

    function cancelHandler() {
        navigation.goBack();
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        onSubmit(expenseData);
    }

    return (
        <View style={styles.form}>
            <TextInput style={styles.title}>Your Expense</TextInput>
            <View style={styles.inputsRow}>
                <Input
                    customStyle={styles.rowInput}
                    label="Amount"
                    TextInputConfig={{
                        placeholder: "0.00",
                        keyboardType: "decimal-pad",
                        onChange: inputChangedHandler.bind(this, 'amount'),
                        value: inputValues.amount
                    }}
                />
                <Input
                    label="Date"
                    TextInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChange: inputChangedHandler.bind(this, 'date'),
                        value: inputValues.date
                    }}
                />
            </View>
            <Input
                label="Description"
                TextInputConfig={{
                    placeholder: "Enter description",
                    multiline: true,
                    maxLength: 100,
                    onChange: inputChangedHandler.bind(this, 'description'),
                    value: inputValues.description
                }}
            />
            <View style={styles.buttons}>
                <Button customStyle={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button customStyle={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
        marginVertical: 8
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginVertical: 24,
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
});