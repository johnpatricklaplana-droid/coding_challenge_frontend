import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";
import { ChevronRight, Braces } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { get } from "@/api/api";
import { API_URL } from "@/constants/backend_url";
import { Challenge } from "@/interfaces/interface";
import { colors } from "@/constants/theme";

export default function ChallengesScreen() {

    const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        
        if(!lessonId) return;

        const getIt = async () => {
            const result = await get(`${API_URL}/api/challenge/lesson/${lessonId}`);
            setChallenges(result.response_body);
        };

        getIt();

    }, [lessonId]);

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Lesson header */}
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <View style={styles.iconBadge}>
                            <Braces size={26} color="#FFFFFF" strokeWidth={2.25} />
                        </View>

                        <View style={styles.eyebrow}>
                            <Text style={styles.eyebrowText}>Lesson</Text>
                        </View>

                        <Text style={styles.title}>Variables</Text>

                        <Text style={styles.subtitle}>
                            Learn how to store and manipulate data using variables in Java.
                        </Text>
                    </View>

                    <View style={styles.headerImageWrap}>
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1770393985997-06479d624614?w=220&h=220&q=80&fit=crop&auto=format",
                            }}
                            accessibilityLabel="A cup of coffee resting on a stack of books"
                            style={styles.headerImage}
                        />
                    </View>
                </View>

                {/* Challenges section */}
                <View style={styles.challengesSection}>
                    <Text style={styles.sectionTitle}>Challenges</Text>
                    <Text style={styles.sectionSubtitle}>Practice what you've learned</Text>

                    <View style={styles.challengeList}>
                        {challenges.map((challenge) => (
                            <Pressable
                                key={challenge.title}
                                onPress={() => router.push({pathname: '/challenges/challenge', params:{ challengeId: challenge.id }})}
                                style={({ pressed }) => [
                                    styles.challengeCard,
                                    pressed && styles.challengeCardPressed,
                                ]}
                            >
                                <View
                                    style={[styles.thumbWrap]}
                                >
                                    <Image
                                        source={{ uri: 'https://picsum.photos/200/300?random=1' }}
                                        style={styles.thumbImage}
                                    />
                                </View>

                                <View style={styles.challengeText}>
                                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                    <Text style={styles.challengeDescription} numberOfLines={3}>
                                        {challenge.description}
                                    </Text>
                                </View>

                                <ChevronRight size={18} color={colors.textMuted} />
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 24,
        gap: 16,
    },
    headerText: {
        flex: 1,
    },
    iconBadge: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: "#F5A93C",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    eyebrow: {
        alignSelf: "flex-start",
        backgroundColor: "#FBEBD8",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        marginBottom: 10,
    },
    eyebrowText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#D8823A",
    },
    title: {
        fontSize: 30,
        lineHeight: 34,
        fontWeight: "800",
        color: colors.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14.5,
        lineHeight: 21,
        color: colors.textSecondary,
    },
    headerImageWrap: {
        width: 96,
        alignItems: "center",
        paddingTop: 4,
    },
    headerImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: colors.surface,
    },
    challengesSection: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.textPrimary,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 13.5,
        color: colors.textSecondary,
        marginBottom: 18,
    },
    challengeList: {
        gap: 12,
    },
    challengeCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 12,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceRaised,
    },
    challengeCardPressed: {
        backgroundColor: colors.bg,
    },
    thumbWrap: {
        width: 64,
        height: 64,
        borderRadius: 14,
        overflow: "hidden",
    },
    thumbImage: {
        width: "100%",
        height: "100%",
    },
    challengeText: {
        flex: 1,
    },
    challengeTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.textPrimary,
        marginBottom: 3,
    },
    challengeDescription: {
        fontSize: 12.5,
        lineHeight: 18,
        color: colors.textSecondary,
    },
});