import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { useUser } from './context/UserContext';
import { Redirect } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useUser().user;

    if(user) return <Redirect href="/(tabs)" />

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Sign in to continue your Java journey</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputWrap}>
                    <Mail size={18} color={colors.textMuted} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor={colors.textMuted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputWrap}>
                    <Lock size={18} color={colors.textMuted} />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <Pressable 
                    style={styles.primaryBtn}
                >
                    <Text style={styles.primaryBtnText}>Sign in</Text>
                </Pressable>

                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity 
                    style={styles.googleBtn}
                    onPress={() => Linking.openURL(`https://colonist-osmosis-comprised.ngrok-free.dev/oauth2/authorization/google`)}
                >
                    <Text style={styles.googleBtnText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.bg,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    form: {
        gap: 12,
    },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 50,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: colors.textPrimary,
    },
    primaryBtn: {
        backgroundColor: colors.accent,
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    primaryBtnText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 8,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        fontSize: 12,
        color: colors.textMuted,
    },
    googleBtn: {
        backgroundColor: colors.surfaceRaised,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textPrimary,
    },
});