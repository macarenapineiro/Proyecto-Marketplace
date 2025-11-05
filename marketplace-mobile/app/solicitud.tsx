import Footer from '@/components/footer';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormSolicitud from '../components/formSolicitud';

export default function SolicitudScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <FormSolicitud />
            </ScrollView>
            <Footer activeTab="Publicar" onTabPress={() => {}} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,          // Ocupa toda la pantalla
        padding: 20,      // Espaciado alrededor
        backgroundColor: '#fff' // opcional, fondo blanco
    }
});