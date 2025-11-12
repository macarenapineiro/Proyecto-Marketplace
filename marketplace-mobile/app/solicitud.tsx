import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormSolicitud from '../components/formSolicitud';

export default function SolicitudScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <FormSolicitud />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,          
        padding: 20,      
        backgroundColor: '#f7f9fc' 
    }
});