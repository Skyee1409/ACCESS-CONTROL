export interface SlideMeta {
  id: number;
  slug: string;
  title: string;
  category: 'INTRODUCTION' | 'FOUNDATIONS' | 'CORE MODELS' | 'ANALYSIS' | 'CASE STUDY' | 'EVALUATION';
  durationSeconds: number;
  summary: string;
  presenterNotes: {
    talkDuration: string;
    talkingPoints: string[];
    script: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenario?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  conceptTag: 'MAC' | 'ABAC' | 'DAC' | 'PRINCIPLES' | 'CASE STUDY';
}
