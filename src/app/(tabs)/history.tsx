import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle2, XCircle, Trophy, Target, Flame } from "lucide-react-native";
import { colors } from "@/constants/theme";
import { useHistory } from "../context/HistoryContext";
import { History } from "@/interfaces/interface";

export default function HistoryPage() {

    const [challenges, setChallenges] = useState<History[]>([]);
    const { history } = useHistory();

    useEffect(() => {

        if(!history) return;

        setChallenges(history);

    }, [history]);

    const passedCount = useMemo(() => challenges.filter((c) => c.passed).length, [challenges]);
    const failedCount = challenges.length - passedCount;
    const accuracy = challenges.length ? Math.round((passedCount / challenges.length) * 100) : 0;

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <LinearGradient
                    colors={[colors.accent, '#4B5FD1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        paddingTop: 20,
                        paddingBottom: 28,
                        paddingHorizontal: 20,
                        borderBottomLeftRadius: 32,
                        borderBottomRightRadius: 32,
                    }}
                >
                    <Text style={{ fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
                        Your journey
                    </Text>
                    <Text style={{ fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 20 }}>
                        History
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, padding: 14, alignItems: 'center', gap: 6 }}>
                            <Target size={18} color="#FFFFFF" />
                            <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF' }}>{challenges.length}</Text>
                            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '600' }}>Attempted</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, padding: 14, alignItems: 'center', gap: 6 }}>
                            <Trophy size={18} color="#FFD873" />
                            <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF' }}>{passedCount}</Text>
                            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '600' }}>Passed</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, padding: 14, alignItems: 'center', gap: 6 }}>
                            <Flame size={18} color="#FF9E5E" />
                            <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF' }}>{accuracy}%</Text>
                            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '600' }}>Accuracy</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40, gap: 18 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontWeight: '800', color: colors.textPrimary }}>
                            All attempts
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E7F8ED', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 }}>
                                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success }} />
                                <Text style={{ fontSize: 11, fontWeight: '700', color: colors.success }}>{passedCount} passed</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.errorBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 }}>
                                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.error }} />
                                <Text style={{ fontSize: 11, fontWeight: '700', color: colors.error }}>{failedCount} failed</Text>
                            </View>
                        </View>
                    </View>

                    {challenges.map((item, index) => (
                        <View
                            key={item.challenge_id}
                            style={{
                                backgroundColor: colors.surfaceRaised,
                                borderRadius: 24,
                                borderWidth: 1,
                                borderColor: colors.border,
                                overflow: 'hidden',
                                shadowColor: '#111827',
                                shadowOpacity: 0.06,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 2,
                            }}
                        >
                            <View style={{ position: 'relative' }}>
                                <Image
                                    source={{ uri: `https://picsum.photos/200/300?random=${index}` }}
                                    style={{ width: '100%', height: 140 }}
                                />
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.55)', 'transparent']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 70 }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: colors.accent,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ fontSize: 12, fontWeight: '800', color: '#FFFFFF' }}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 5,
                                        backgroundColor: item.passed ? colors.success : colors.error,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 20,
                                    }}
                                >
                                    {item.passed ? (
                                        <CheckCircle2 size={13} color="#FFFFFF" />
                                    ) : (
                                        <XCircle size={13} color="#FFFFFF" />
                                    )}
                                    <Text style={{ fontSize: 11.5, fontWeight: '800', color: '#FFFFFF' }}>
                                        {item.passed ? 'Passed' : 'Failed'}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 14,
                                        fontSize: 17,
                                        fontWeight: '800',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </View>

                            <View style={{ padding: 16 }}>
                                <Text style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 19 }}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    ))}

                    {challenges.length === 0 && (
                        <View style={{ alignItems: 'center', paddingVertical: 60, gap: 8 }}>
                            <Target size={28} color={colors.textMuted} />
                            <Text style={{ color: colors.textMuted, fontSize: 13.5 }}>
                                No challenges attempted yet.
                            </Text>
                        </View>
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}