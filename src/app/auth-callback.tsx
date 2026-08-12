import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function AuthCallback() {
    const { code } = useLocalSearchParams<{ code: string }>();

    console.log(code);

    return <SafeAreaView>
        <Text>
            Loading please super wait
        </Text>
    </SafeAreaView>
}