import { Stack } from "expo-router";

export default function ChallengesStackLayout() {
    return (
        <Stack
            initialRouteName="challenges"
            screenOptions={{ 
                headerShown: true,
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen name="challenges" />
            <Stack.Screen name="challenge" />
        </Stack>
    );
}