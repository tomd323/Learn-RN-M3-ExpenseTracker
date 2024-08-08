import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from '../UI/Button';

import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ onSubmit, navigation, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues?.amount?.toString() || '',
            isValid: true
        },
        date: {
            value: defaultValues?.date.toISOString().slice(0, 10) || '',
            isValid: true
        },
        title: {
            value: defaultValues?.title || '',
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });

    }

    function cancelHandler() {
        navigation.goBack();
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            title: inputs.title.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount.value > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const titleIsValid = expenseData.title.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !titleIsValid) {
            // Alert.alert('invalid input', 'Please enter a valid amount, date and title', [{ text: 'Okay' }]);
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    title: { value: curInputs.title.value, isValid: titleIsValid },
                }
            });

            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid;

    return (
        <View style={styles.form}>
            <TextInput style={styles.title}>Your Expense</TextInput>
            <View style={styles.inputsRow}>
                <Input
                    customStyle={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    TextInputConfig={{
                        placeholder: "0.00",
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    label="Date"
                    invalid={!inputs.date.isValid}
                    TextInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.title.isValid}
                TextInputConfig={{
                    placeholder: "Enter description",
                    multiline: true,
                    maxLength: 100,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.title.value
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Field incorrect, check inputs</Text>}
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
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        margin: 10,
    }
});