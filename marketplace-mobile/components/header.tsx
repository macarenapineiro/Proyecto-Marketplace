import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
    rol: string;
    name: string;
}

export default function Header({ rol, name }: HeaderProps) {
    const getColorByRole = (rol: string) => {
        switch (rol.toLowerCase()) {
            case "solicitante":
                return "#0E4784";
            case "proveedor":
                return "#00601D";
            case "proveedor de insumos":
                return "#2B0060";
            default:
                return "#000";
        }
    };
    const getBackgroundColorByRole = (rol: string) => {
        switch (rol.toLowerCase()) {
            case "solicitante":
                return "#90C6DA";
            case "proveedor":
                return "#92DA90";
            case "proveedor de insumos":
                return "#B6B7EB";
            default:
                return "#FFF";
        }
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.rol, { color: getColorByRole(rol), backgroundColor: getBackgroundColorByRole(rol) }]}>{rol}</Text>
            <View style={styles.userInfo}>
                <MaterialIcons name="account-circle" size={24} color="black" />
                <Text style={styles.name}>{name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f2f2f2",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: '100%',
    },
    rol: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
        borderRadius: 15,
        paddingVertical:4,
        paddingHorizontal:12,

    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        marginLeft: 8,
        fontSize: 16,
    }
});