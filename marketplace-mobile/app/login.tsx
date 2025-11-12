import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface User {
    name: string;
    rol: string;
}

interface AuthContextType {
    currentUser: User | null;
    login: (username: string, password: string) => Promise<{ success: boolean; user: User | null }>;
}

export default function LoginScreen() {
    const { login } = useAuth() as AuthContextType;
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
        } else {
            setError("Usuario o contraseña incorrectos");
            setSuccessMessage(null);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerRow}>
                <MaterialIcons name="store" size={50} color="black" />
                <Text style={styles.headline}>Marketplace de Servicios</Text>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.subtitle}>Iniciar sesión</Text>
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
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    containerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    containerForm: {
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
    },
    headline: {
        marginLeft: 12,
        fontWeight: "700",
        fontStyle: "italic",
        fontSize: 20,
    },
    subtitle: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 20,
        fontStyle: "italic",
        alignSelf: "center",
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
