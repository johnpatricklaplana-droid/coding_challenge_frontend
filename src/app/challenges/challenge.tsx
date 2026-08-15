import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    StatusBar,
} from 'react-native';
import {
    BookOpen,
    Code2,
    CheckCircle2,
    Info,
    ListChecks,
    Check,
    X,
    Lightbulb,
    XCircle,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JavaEditorWebView from '@/components/JavaEditorWebVeiw';
import { colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { get, post } from '@/api/api';
import { API_URL } from '@/constants/backend_url';
import { ChallengeWithTestCases, History } from '@/interfaces/interface';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useHistory } from '../context/HistoryContext';

type Tab = 'learn' | 'code' | 'tests';

interface TestCase {
    label: string;
    passed: boolean;
}

const TEST_CASES: TestCase[] = [
    { label: 'Variable created', passed: true },
    { label: 'Used System.out.println()', passed: true },
    { label: 'Printed the variable', passed: true },
    { label: 'Output is correct', passed: true },
];

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        // Write your code here

    }
}`;

export default function ChallengeScreen() {
    const [activeTab, setActiveTab] = useState<Tab>('code');
    const [code, setCode] = useState(DEFAULT_CODE);
    const [challengeWithTestCases, setChallengeWithTestCases] = useState<ChallengeWithTestCases | null>(null);

    const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
    const [challengeResult, setChallengeResult] = useState<{ output: string, passed: boolean } | null>(null);

    const setHistory = useHistory().setHistory;

    useEffect(() => {
  
        if(!challengeId) return;

        const getIt = async () => {
 
            const result = await get(`${API_URL}/api/challenge/${challengeId}`);
            console.log("=================beat it=======================");
            console.log(result);
            setChallengeWithTestCases(result.response_body);

        };

        getIt();

    }, [challengeId]);

    const submit = async () => {
        console.log("happening?");
        const result = await post(`${API_URL}/api/challenge/${challengeId}/complete`, { source_code: code });
        console.log("=========================result============================");
        console.log(result);

        const challres: { output: string, passed: boolean } = result.response_body;
        const history: History = result.response_body.history;

        setChallengeResult(challres);
        setHistory(prev => [history, ...prev]);
        
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

            {/* Tabs */}
            <View style={styles.tabBar}>
                <TabButton
                    label="Learn"
                    icon={<BookOpen size={18} color={activeTab === 'learn' ? colors.accent : colors.textMuted} />}
                    active={activeTab === 'learn'}
                    onPress={() => setActiveTab('learn')}
                />
                <TabButton
                    label="Code"
                    icon={<Code2 size={18} color={activeTab === 'code' ? colors.accent : colors.textMuted} />}
                    active={activeTab === 'code'}
                    onPress={() => setActiveTab('code')}
                />
                <TabButton
                    label="Tests"
                    icon={<CheckCircle2 size={18} color={activeTab === 'tests' ? colors.accent : colors.textMuted} />}
                    active={activeTab === 'tests'}
                    onPress={() => setActiveTab('tests')}
                />
            </View>

            {/* Content */}
            <View style={styles.contentArea}>
                {activeTab === 'learn' && challengeWithTestCases && <LearnTab challenge={challengeWithTestCases} />}
                {activeTab === 'code' && challengeWithTestCases && <CodeTab result={challengeResult} submit={submit} code={code} setCode={setCode} />}
                {activeTab === 'tests' && challengeWithTestCases && <TestsTab />}
            </View>
        </SafeAreaView>
    );
}

function TabButton({
    label,
    icon,
    active,
    onPress,
}: Readonly<{
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onPress: () => void;
}>) {
    return (
        <Pressable style={styles.tabBtn} onPress={onPress}>
            {icon}
            <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>{label}</Text>
            <View style={[styles.tabIndicator, active && styles.tabIndicatorActive]} />
        </Pressable>
    );
}

// ---------- Learn tab ----------
function LearnTab({ challenge }: Readonly<{ challenge: ChallengeWithTestCases }>) {
    
    const videoSource = challenge?.videoUrl;

    const player = useVideoPlayer(videoSource, player => {
        player.loop = false;
        player.play;
    });

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Card>
                <CardHeader icon={<Info size={16} color={colors.accent} />} title="Challenge" />
                <Text style={{ fontSize: 22, marginBottom: 8 }}>{challenge?.title}</Text>
                <Text style={styles.body}>{challenge?.description}</Text>
            </Card>

            <Card>
                <CardHeader icon={<ListChecks size={16} color={colors.accent} />} title="Rules" />
                <RuleLine ok text="Use variables before printing" />
                <RuleLine ok text="Use System.out.println()" />
                <RuleLine text="Do not print values directly" />

                <Text style={[styles.subLabel, { color: colors.error, marginTop: 14 }]}>Wrong</Text>
                <CodeSnippet color={colors.error} bg="#2A1418">{`System.out.println("John");`}</CodeSnippet>

                <Text style={[styles.subLabel, { color: colors.success, marginTop: 10 }]}>Correct</Text>
                <CodeSnippet color={colors.success} bg="#12261E">{`String name = "John";\nSystem.out.println(name);`}</CodeSnippet>
            </Card>

            <View
            
            >
                <VideoView
                    style={{ width: '100%', height: 275 }}
                    player={player}
                >

                </VideoView>
            </View>

            <Card>
                <CardHeader icon={<Lightbulb size={16} color={colors.accent} />} title="How to Learn" />
                <Step number={1} text="Watch the tutorial and code along." />
                <Step number={2} text="Study the code line by line until you understand it. Ignore class and main for now. Ask AI if you don't understand any line." />
                <Step number={3} text="Code it yourself without looking. If you can't, watch again but try not to." />
                <Step number={4} text="When you can do it without help, move to the next challenge or take a rest." />
            </Card>

            <View style={{ height: 24 }} />
        </ScrollView>
    );
}

// ---------- Code tab ----------
function CodeTab({ 
    code, 
    setCode, 
    submit, 
    result 
}: Readonly<{ 
    code: string; 
    setCode: (v: string) => void, 
    submit: any, 
    result: { output: string, passed: boolean } | null }>
) {
    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.editorCard}>
                <View style={styles.editorHeader}>
                    <View style={styles.editorHeaderLeft}>
                        <Code2 size={15} color={colors.textSecondary} />
                        <Text style={styles.editorHeaderText}>Java Editor</Text>
                    </View>
                    <View style={styles.editorDots}>
                        <View style={[styles.dot, { backgroundColor: '#F2545B' }]} />
                        <View style={[styles.dot, { backgroundColor: '#E0B84F' }]} />
                        <View style={[styles.dot, { backgroundColor: '#3ECF8E' }]} />
                    </View>
                </View>

                <View style={styles.editorBody}>
                    <JavaEditorWebView
                        initialCode={code}
                        onChangeCode={setCode}
                    />
                </View>
            </View>

            <Pressable 
                style={styles.submitBtn}
                onPress={submit}
            >
                <Text style={styles.submitBtnText}>Submit</Text>
            </Pressable>

            {result && 
                <View
                    style={{
                        borderRadius: 16,
                        borderWidth: 1,
                        padding: 14,
                        marginTop: 12,
                        gap: 10,
                        backgroundColor: '#383737',
                        borderColor: result.passed ? '#BEEACD' : '#FBD5D5',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        {result.passed ? (
                            <CheckCircle2 size={18} color={colors.success} />
                        ) : (
                            <XCircle size={18} color={colors.error} />
                        )}
                        <Text
                            style={{
                                fontSize: 14.5,
                                fontWeight: '700',
                                color: result.passed ? colors.success : colors.error,
                            }}
                        >
                            {result.passed ? 'Passed you\'re a great one' : 'you\'re a failure try again'}
                        </Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#383737',
                            borderRadius: 10,
                            padding: 10,
                            borderWidth: 1
                        }}
                    >
                        <Text style={{ fontSize: 11, fontWeight: '600', color: colors.textMuted, marginBottom: 4 }}>
                            Output
                        </Text>
                        <Text style={{ fontFamily: 'Menlo', fontSize: 12.5, color: '#dddad6' }}>
                            {result.output}
                        </Text>
                    </View>
                </View>
            }

        </ScrollView>
    );
}

// ---------- Tests tab ----------
function TestsTab() {
    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Card>
                <CardHeader icon={<CheckCircle2 size={16} color={colors.accent} />} title="Test Cases" />
                {TEST_CASES.map((t) => (
                    <View key={t.label} style={styles.testRow}>
                        <View
                            style={[
                                styles.testIconWrap,
                                { backgroundColor: t.passed ? '#12261E' : colors.errorBg },
                            ]}
                        >
                            {t.passed ? (
                                <Check size={13} color={colors.success} />
                            ) : (
                                <X size={13} color={colors.error} />
                            )}
                        </View>
                        <Text style={styles.testLabel}>{t.label}</Text>
                    </View>
                ))}
            </Card>

            <Card>
                <CardHeader icon={<Info size={16} color={colors.accent} />} title="Status" />
                <Text style={styles.body}>Submit your code from the Code tab to run it against these tests.</Text>
            </Card>

            <View style={{ height: 24 }} />
        </ScrollView>
    );
}

// ---------- Shared primitives ----------
function Card({ children }: { children: React.ReactNode }) {
    return <View style={styles.card}>{children}</View>;
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <View style={styles.cardHeader}>
            {icon}
            <Text style={styles.cardHeaderText}>{title}</Text>
        </View>
    );
}

function Bullet({ text }: { text: string }) {
    return (
        <View style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{text}</Text>
        </View>
    );
}

function RuleLine({ text, ok }: { text: string; ok?: boolean }) {
    return (
        <View style={styles.ruleRow}>
            {ok ? (
                <Check size={15} color={colors.success} />
            ) : (
                <X size={15} color={colors.error} />
            )}
            <Text style={styles.ruleText}>{text}</Text>
        </View>
    );
}

function CodeSnippet({
    children,
    color,
    bg,
}: {
    children: string;
    color: string;
    bg: string;
}) {
    return (
        <View style={[styles.snippet, { backgroundColor: bg, borderColor: color + '33' }]}>
            <Text style={[styles.snippetText, { color }]}>{children}</Text>
        </View>
    );
}

function Step({ number, text }: { number: number; text: string }) {
    return (
        <View style={styles.stepRow}>
            <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{number}</Text>
            </View>
            <Text style={styles.stepText}>{text}</Text>
        </View>
    );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.bg },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.bg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
    },
    headerTitleWrap: { alignItems: 'center' },
    headerEyebrow: {
        fontSize: 10,
        letterSpacing: 1.5,
        color: colors.textMuted,
        fontWeight: '600',
        marginBottom: 2,
    },
    headerTitle: { fontSize: 16, color: colors.textPrimary, fontWeight: '700' },

    tabBar: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 4,
    },
    tabBtnText: { fontSize: 12.5, color: colors.textMuted, fontWeight: '600' },
    tabBtnTextActive: { color: colors.accent },
    tabIndicator: {
        position: 'absolute',
        bottom: -1,
        height: 2,
        width: '60%',
        borderRadius: 2,
        backgroundColor: 'transparent',
    },
    tabIndicatorActive: { backgroundColor: colors.accent },

    contentArea: { flex: 1, backgroundColor: colors.bg },
    scroll: { flex: 1 },
    scrollContent: { padding: 16, gap: 14 },

    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 14,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
    cardHeaderText: { fontSize: 14.5, fontWeight: '700', color: colors.textPrimary },

    body: { fontSize: 13.5, color: colors.textSecondary, lineHeight: 20, marginBottom: 4 },

    bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 6 },
    bulletDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.accent,
        marginTop: 7,
    },
    bulletText: { fontSize: 13.5, color: colors.textSecondary, lineHeight: 20, flex: 1 },

    ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    ruleText: { fontSize: 13.5, color: colors.textSecondary },

    subLabel: { fontSize: 11.5, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
    snippet: { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 6 },
    snippetText: { fontFamily: 'Menlo, Courier', fontSize: 12.5, lineHeight: 19 },

    videoThumb: {
        height: 140,
        borderRadius: 12,
        backgroundColor: '#1B1030',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    playCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.accentMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoDuration: {
        position: 'absolute',
        bottom: 10,
        right: 12,
        fontSize: 11,
        color: colors.textPrimary,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },

    stepRow: { flexDirection: 'row', gap: 10, marginTop: 12, alignItems: 'flex-start' },
    stepBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: colors.accentMuted,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
    },
    stepBadgeText: { fontSize: 11.5, fontWeight: '700', color: colors.textPrimary },
    stepText: { fontSize: 13.5, color: colors.textSecondary, lineHeight: 20, flex: 1 },

    editorCard: {
        backgroundColor: colors.surfaceRaised,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        marginBottom: 14,
    },
    editorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surface,
    },
    editorHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    editorHeaderText: { fontSize: 12.5, color: colors.textSecondary, fontWeight: '600' },
    editorDots: { flexDirection: 'row', gap: 5 },
    dot: { width: 8, height: 8, borderRadius: 4 },
    editorBody: { 
        height: 320, 
        backgroundColor: '#0D0F14' 
    },

    submitBtn: {
        backgroundColor: colors.accent,
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 14,
    },
    submitBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

    testRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
    testIconWrap: {
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    testLabel: { fontSize: 13.5, color: colors.textSecondary },

    footer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.bg,
    },
    footerBtnGhost: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    footerBtnGhostText: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
    footerBtnPrimary: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: colors.accent,
    },
    footerBtnPrimaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});