import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headline}>Login</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
    },
    headline:{
        paddingVertical:20,
        fontSize: 36
    }
});