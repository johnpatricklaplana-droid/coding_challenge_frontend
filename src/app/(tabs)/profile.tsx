import React, { use } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Zap, Flame, Trophy, Star, Code2, ChevronRight, Settings } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { useUser } from '../context/UserContext';

const badges = [
    { icon: Flame, label: '12 day streak', bg: '#FFF1E7', color: '#E8703A' },
    { icon: Zap, label: '48 challenges', bg: '#EFF6FF', color: colors.accent },
    { icon: Trophy, label: 'Top 5%', bg: '#FFFBEB', color: '#D6A419' },
];

const stats = [
    { label: 'Completed', value: '48' },
    { label: 'In progress', value: '3' },
    { label: 'Accuracy', value: '92%' },
];

const recentChallenges = [
    { title: 'Variable Swap', xp: '+20 XP' },
    { title: 'Sum of Two Numbers', xp: '+15 XP' },
    { title: 'Area of Rectangle', xp: '+25 XP' },
];

export default function ProfileScreen() {

    const user = useUser().user;

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={[colors.accent, '#5B4FE9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
            >
                <View style={styles.heroTopRow}>
                    <View style={styles.heroBadgeSmall}>
                        <Star size={12} color="#FFFFFF" />
                        <Text style={styles.heroBadgeSmallText}>{user?.currentLevel}</Text>
                    </View>
                    <Pressable style={styles.settingsBtn}>
                        <Settings size={18} color="#FFFFFF" />
                    </Pressable>
                </View>

                <View style={styles.avatarWrap}>
                    <View style={styles.avatarRing}>
                        <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
                    </View>
                    <View style={styles.levelPill}>
                        <Text style={styles.levelPillText}>{user?.currentLevel}</Text>
                    </View>
                </View>

                <Text style={styles.name}>{user?.fullName}</Text>
                <View style={styles.emailRow}>
                    <Mail size={13} color="rgba(255,255,255,0.85)" />
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </LinearGradient>

            <View style={styles.statsRow}>
                {stats.map((s) => (
                    <View key={s.label} style={styles.statCard}>
                        <Text style={styles.statValue}>{s.value}</Text>
                        <Text style={styles.statLabel}>{s.label}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <View style={styles.badgeRow}>
                    {badges.map((b) => (
                        <View key={b.label} style={[styles.badge, { backgroundColor: b.bg }]}>
                            <b.icon size={16} color={b.color} />
                            <Text style={[styles.badgeText, { color: b.color }]}>{b.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Recent activity</Text>
                    <Pressable style={styles.seeAllRow}>
                        <Text style={styles.seeAllText}>See all</Text>
                        <ChevronRight size={14} color={colors.textMuted} />
                    </Pressable>
                </View>

                <View style={styles.activityList}>
                    {recentChallenges.map((c) => (
                        <View key={c.title} style={styles.activityRow}>
                            <View style={styles.activityIconWrap}>
                                <Code2 size={16} color={colors.accent} />
                            </View>
                            <Text style={styles.activityTitle}>{c.title}</Text>
                            <Text style={styles.activityXp}>{c.xp}</Text>
                        </View>
                    ))}
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.bg },
    hero: {
        paddingTop: 60,
        paddingBottom: 28,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: 'center',
    },
    heroTopRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    heroBadgeSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(255,255,255,0.18)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    heroBadgeSmallText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
    settingsBtn: {
        width: 34, height: 34, borderRadius: 17,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center', justifyContent: 'center',
    },
    avatarWrap: { marginBottom: 14 },
    avatarRing: {
        width: 104, height: 104, borderRadius: 52,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 3, borderColor: '#FFFFFF',
    },
    avatar: { width: 92, height: 92, borderRadius: 46 },
    levelPill: {
        position: 'absolute', bottom: -6, alignSelf: 'center',
        backgroundColor: '#FFB020',
        paddingHorizontal: 10, paddingVertical: 3,
        borderRadius: 20, borderWidth: 2, borderColor: '#FFFFFF',
    },
    levelPillText: { fontSize: 11, fontWeight: '800', color: '#FFFFFF' },
    name: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
    emailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    email: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
    statsRow: {
        flexDirection: 'row', gap: 10,
        paddingHorizontal: 20, marginTop: -20,
    },
    statCard: {
        flex: 1, backgroundColor: colors.surface,
        borderRadius: 16, borderWidth: 1, borderColor: colors.border,
        paddingVertical: 14, alignItems: 'center',
    },
    statValue: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
    statLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
    section: { paddingHorizontal: 20, marginTop: 28 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 },
    seeAllRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    seeAllText: { fontSize: 12.5, color: colors.textMuted, fontWeight: '600' },
    badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    badge: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20,
    },
    badgeText: { fontSize: 12.5, fontWeight: '700' },
    activityList: {
        backgroundColor: colors.surfaceRaised, borderRadius: 16,
        borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
    },
    activityRow: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
        paddingVertical: 12, paddingHorizontal: 14,
        borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    activityIconWrap: {
        width: 32, height: 32, borderRadius: 10,
        backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center',
    },
    activityTitle: { flex: 1, fontSize: 13.5, fontWeight: '600', color: colors.textPrimary },
    activityXp: { fontSize: 12, fontWeight: '700', color: colors.accent },
    editBtn: {
        marginHorizontal: 20, marginTop: 28, marginBottom: 32,
        backgroundColor: colors.accent, borderRadius: 14,
        height: 50, alignItems: 'center', justifyContent: 'center',
    },
    editBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});