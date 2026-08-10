import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import {
  ChevronRight,
  Play,
  User
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GlobalResponse, Lesson } from '@/interfaces/interface';
import { get } from '@/api/api';
import { API_URL } from '@/constants/backend_url';
import { colors } from '@/constants/theme';

const JAVA_LOGO_URL =
  'https://picsum.photos/200/300?random=1';

export default function HomeScreen() {

  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson[]>([]);

  useEffect(() => {
    
    const getIt = async () => {
      const result: GlobalResponse = await get(`${API_URL}/api/lesson`);
      setLesson(result.response_body);
    };

    getIt();

  }, []);

  console.log(lesson);

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
          {lesson?.map((less) => (
            <Pressable
              onPress={() => 
                 router.push({pathname: '/challenges/challenges', params: { lessonId: less.id }}) 
              }
              key={less.title}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                gap: 8,
                overflow: 'hidden'
              }}
            >
              <Image style={{ width: 64, height: 64 }} source={{ uri: less.thumbnailUrl }} />

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>
                  {less.title}
                </Text>
                <Text style={{ fontSize: 12.5, color: colors.textSecondary, marginTop: 2 }}>
                  TODO: lesson sub title beat it like a pro
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