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

}