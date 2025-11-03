import { StyleSheet, Text, View } from 'react-native';

export default function ClienteScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Cliente Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});