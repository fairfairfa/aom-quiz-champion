export interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizAnswer {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  answers: QuizAnswer[];
}