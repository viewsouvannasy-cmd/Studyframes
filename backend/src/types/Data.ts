export interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string | null | boolean;
  profile_url: string | null;
  image_id: string | null;
  create_at: Date;
  update_at: Date;
}

export interface ListStudyCard {
  sci_id: number;
  credit_source: string;
  sci_name: string;
  color: string;
  title: string;
  total_chapters: number;
  total_length_seconds: number;
  video_thumbnail_url: string;
  create_at: Date;
}

export interface StudyCardLesson {
  sci_id: number;
  credit_source: string;
  title: string;
  total_chapters: number;
  total_length_seconds: number;
  source_type: string;
  instructor: string | null;
  video_url: string;
  video_thumbnail_url: string;
  license: string | null;
  psci_type: string;
  chapter_id: number;
  is_generated: boolean;
  pc_title: string;
  start_time: number;
  pc_number: number;
  total_quizs: number | null;
}

export interface Quizs {
  question: string | "No Quiz";
  choice: {
    A: string | "No Quiz";
    B: string | "No Quiz";
    C: string | "No Quiz";
  };
  correct_answer: "A" | "B" | "C" | "No Quiz";
}
