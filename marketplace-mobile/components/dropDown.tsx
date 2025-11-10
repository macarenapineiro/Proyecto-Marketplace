import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface DropDownProps {
    label: string;
    data: { label: string; value: string }[];
    value?: string | null;
    onValueChange?: (value: string) => void;
    customStyles?: {
        dropdown?: object;
        placeholderStyle?: object;
        selectedTextStyle?: object;
        inputSearchStyle?: object;
    }
}

export default function DropDownComponent({ label, data, value, onValueChange, customStyles }: DropDownProps) {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && styles.dropdownFocus, customStyles?.dropdown]}
                placeholderStyle={[styles.placeholderStyle, isFocus && styles.placeholderFocus, customStyles?.placeholderStyle]}
                selectedTextStyle={[styles.selectedTextStyle, customStyles?.selectedTextStyle]}
                inputSearchStyle={[styles.inputSearchStyle, customStyles?.inputSearchStyle]}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? `Seleccionar ${label.toLowerCase()}` : '...'}
                searchPlaceholder="Buscar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => onValueChange && onValueChange(item.value)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    label: {
        position: 'absolute',
        left: 12,
        top: -8,
        backgroundColor: '#F8F9FD',
        fontSize: 12,
        color: '#4C8BF5',
        paddingHorizontal: 4,
        zIndex: 10,
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    dropdownFocus: {
        borderColor: '#4C8BF5',
        shadowOpacity: 0.1,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    placeholderFocus: {
        color: '#4C8BF5',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: '#4C8BF5',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})