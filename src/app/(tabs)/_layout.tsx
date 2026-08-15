import { Tabs } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, History, User } from 'lucide-react-native';
import { colors } from '@/constants/theme';

const tabs = [
  { name: 'index', label: 'Home', icon: Home },
  { name: 'history', label: 'History', icon: History },
  { name: 'profile', label: 'Profile', icon: User },
];

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        marginBottom: insets.bottom + 14,
        width: '90%',
        marginHorizontal: 'auto',
        borderRadius: 30,
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: colors.surfaceRaised,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const tab = tabs.find((t) => t.name === route.name);
          if (!tab) return null;
          const Icon = tab.icon;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={{ flex: 1, alignItems: 'center' }}
              hitSlop={8}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  size={22}
                  color={isFocused ? colors.accent : colors.textMuted}
                  strokeWidth={isFocused ? 2.4 : 2}
                />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: isFocused ? '800' : '600',
                  color: isFocused ? colors.accent : colors.textMuted,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tabs 
      tabBar={(props) => <CustomTabBar {...props} />} 
      screenOptions={{ 
        headerShown: false
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}