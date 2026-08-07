import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import {
  ChevronRight,
  Play,
  User,
  Terminal,
  Box,
  Keyboard,
  Scale,
  RotateCw,
  Layers,
  Settings,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const colors = {
  bg: '#F5F6F8',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  accent: '#5B4FE9',
  accentMuted: '#EDEBFC',
  success: '#22C55E',
  error: '#EF4444',
  errorBg: '#FEF2F2',
};

const JAVA_LOGO_URL =
  'https://picsum.photos/200/300?random=1';

interface Lesson {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  bg: string;
  iconColor: string;
}

const LESSONS: Lesson[] = [
  { title: 'Printing', subtitle: 'Output to the console', icon: Terminal, bg: colors.accentMuted, iconColor: colors.accent },
  { title: 'Variables', subtitle: 'Store and manipulate data', icon: Box, bg: colors.accentMuted, iconColor: colors.accent },
  { title: 'Input', subtitle: 'Get data from the user', icon: Keyboard, bg: '#E6F9F1', iconColor: colors.success },
  { title: 'If Statements', subtitle: 'Make decisions', icon: Scale, bg: '#FEF6E7', iconColor: '#D97706' },
  { title: 'Loops', subtitle: 'Repeat tasks', icon: RotateCw, bg: '#E7F0FE', iconColor: '#2563EB' },
  { title: 'Arrays', subtitle: 'Work with collections', icon: Layers, bg: colors.accentMuted, iconColor: colors.accent },
  { title: 'Methods', subtitle: 'Create reusable code', icon: Settings, bg: '#E6F9F1', iconColor: colors.success },
];

export default function HomeScreen() {

  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image
              source={{ uri: JAVA_LOGO_URL }}
              style={{ width: 40, backgroundColor: colors.accent, height: 40 }}
              resizeMode="contain"
            />
            <View>
              <Text style={{ fontSize: 20, fontWeight: '800', color: colors.textPrimary }}>
                Java for Beginners
              </Text>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>
                Learn. Practice. Master.
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.accentMuted,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={20} color={colors.accent} />
          </Pressable>
        </View>

        {/* Continue Learning */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.textPrimary }}>
            Continue Learning
          </Text>
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.accent }}>See All</Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: colors.accent,
            borderRadius: 20,
            padding: 20,
            marginBottom: 28,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 6 }}>
            Variables
          </Text>
          <Text
            style={{
              fontSize: 13.5,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 20,
              marginBottom: 18,
            }}
          >
            Learn how to store and manipulate data in Java.
          </Text>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              paddingVertical: 13,
            }}
          >
            <Play size={16} color={colors.accent} fill={colors.accent} />
            <Text style={{ fontSize: 14.5, fontWeight: '700', color: colors.accent }}>
              Continue
            </Text>
          </Pressable>
        </View>

        {/* Lessons */}
        <Text
          style={{ fontSize: 17, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}
        >
          Lessons
        </Text>

        <View style={{ gap: 10 }}>
          {LESSONS.map((lesson) => (
            <Pressable
              onPress={() => { console.log("beat it")
                 router.push('/challenges/challenge') }}
              key={lesson.title}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 14,
                gap: 14,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: lesson.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <lesson.icon size={20} color={lesson.iconColor} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>
                  {lesson.title}
                </Text>
                <Text style={{ fontSize: 12.5, color: colors.textSecondary, marginTop: 2 }}>
                  {lesson.subtitle}
                </Text>
              </View>

              <ChevronRight size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}