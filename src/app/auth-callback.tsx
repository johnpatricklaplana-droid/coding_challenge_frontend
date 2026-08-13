import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useEffect } from "react";
import { post } from "@/api/api";
import { API_URL } from "@/constants/backend_url";
import * as SecureStore from 'expo-secure-store';
import { jwtTokenKey } from "@/constants/storageKeys";

export default function AuthCallback() {
    const { code } = useLocalSearchParams<{ code: string }>();

    console.log(code);

    useEffect(() => {
        
        const getIt = async () => {
            const result = await post(`${API_URL}/api/auth/code-exchange/${code}`, null);

            await SecureStore.setItemAsync(jwtTokenKey, result.response_body);
        };

        getIt();

    }, [code]);

    return <SafeAreaView>
        <Text>
            Loading please super wait
        </Text>
    </SafeAreaView>
}