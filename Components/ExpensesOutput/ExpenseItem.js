import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

import { useNavigation } from '@react-navigation/native';

function ExpenseItem({ id, title, amount, date }) {
    const navigation = useNavigation();

    function expenseOnPressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id,
        });
    }

    return (
        <Pressable onPress={expenseOnPressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.container}>
                <View >
                    <Text style={[styles.textBase, styles.descriptionText]}>{title}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>{amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    container: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amountText: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
});