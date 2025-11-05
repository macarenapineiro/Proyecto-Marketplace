import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterProps {
    activeTab: string;
    onTabPress: (tabName: string) => void;
}

export default function Footer({ activeTab, onTabPress }: FooterProps) {
    const navigation = useNavigation<any>();
    const tabs = [
        { name: "Solicitudes", icon: "list-alt", route: "Cliente" },
        { name: "Publicar", icon: "add-box", route: "Cliente" },
        { name: "Cotizaciones", icon: "attach-money", route:"Cliente" },
        { name: "Perfil", icon: "person", route: "Perfil" },
    ]
    return (
        <View style={styles.footer}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.name;
                return (
                    <TouchableOpacity key={tab.name} style={styles.tab} onPress={() => { onTabPress(tab.name); navigation.replace(tab.route); }}>
                        <MaterialIcons name={tab.icon as any} size={26} color={isActive ? "black" : "#999"} />
                        <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute', 
        bottom: 0,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingBottom: 20,
    },
    tab: {
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        color: "#999",
        marginTop: 3,
    },
    activeLabel: {
        color: "black",
        fontWeight: "bold",
    },
});