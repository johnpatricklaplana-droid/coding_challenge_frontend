export interface Lesson {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface GlobalResponse {
    status_code: number;
    response_body: any;
    date: string;
    success: boolean;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    videoUrl: string | null;
    passed: boolean;
}

export interface ChallengeWithTestCases {
    id: string;
    title: string;
    description: string;
    videoUrl: string | null;
    testCases: TestCase[];
}

export interface TestCase {
    input: string;
    expectedOutput: string;
}

export interface User {
    id: string;
    fullName: string;
    avatarUrl: string;
    email: string;
    currentLevel: number;
}

export interface History {
    challenge_id: string;
    challengeThumbnail: string;
    passed: boolean;
    title: string;
    description: string;
}