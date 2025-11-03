import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface User {
    name: string;
    rol: string;
}

interface AuthContextType {
    currentUser: User | null;
    login: (username: string, password: string) => Promise<{ success: boolean; user: User | null }>;
    logout: () => Promise<void>;
    loading: boolean;
    isAuthenticated: boolean;
}

export default function LoginScreen() {
    const { login, logout, isAuthenticated, currentUser } = useAuth() as AuthContextType;
    // const navigation = useNavigation<LoginScreenNavigationProp>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!username || !password) {
            setError("Por favor complete todos los campos");
            setSuccessMessage(null);
            return;
        }
        const result = await login(username, password);
        if (result.success && result.user) {
            setError(null);
            setSuccessMessage(`Bienvenido, ${result.user.name}`);
            // if (result.user.rol === 'Solicitante') navigation.replace('Cliente');
            // else if (result.user.rol === 'Proveedor') navigation.replace('Servicio');
            // else if (result.user.rol === 'Proveedor de Insumos') navigation.replace('Insumo');
        } else {
            setError("Usuario o contraseña incorrectos");
            setSuccessMessage(null);
        }
    };


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headline}>LogIn</Text>

                <Text>Email:</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <Text>Password:</Text>
                <TextInput
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {error && <Text style={styles.errorText}>{error}</Text>}
                {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    headline: {
        textAlign: "center",
        marginTop: -100,
        marginBottom: 50,
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: 72,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,

        marginTop: 10,
        marginBottom: 10,
        borderColor: "grey",
    },
    button: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    successText: {
        color: 'green',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    }

});
