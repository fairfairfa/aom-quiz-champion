import { useState } from "react";
import { questions } from "@/data/questions";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ResultCard } from "@/components/quiz/ResultCard";
import { ReviewSection } from "@/components/quiz/ReviewSection";
import { QuizButton } from "@/components/ui/quiz-button";
import { QuizResult } from "@/types/quiz";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GraduationCap, BookOpen, Send } from "lucide-react";

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showReview, setShowReview] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (questionIndex: number, answer: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === null) {
        toast({
          title: "ยังตอบไม่ครบ",
          description: `กรุณาตอบคำถามข้อที่ ${i + 1} ให้ครบก่อนส่งคำตอบ`,
          variant: "destructive",
        });
        // Scroll to the unanswered question
        const questionElement = document.querySelector(`[data-question="${i}"]`);
        questionElement?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }

    // Calculate score
    let score = 0;
    const answers = userAnswers.map((answer, index) => {
      const isCorrect = answer === questions[index].answer;
      if (isCorrect) score++;
      return {
        questionIndex: index,
        selectedAnswer: answer!,
        isCorrect,
      };
    });

    const quizResult: QuizResult = {
      score,
      total: questions.length,
      answers,
    };

    setResult(quizResult);
    setShowReview(true);
    
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: "smooth" });

    toast({
      title: "ส่งคำตอบเรียบร้อย",
      description: `คุณได้คะแนน ${score}/${questions.length}`,
      variant: score >= 16 ? "default" : "destructive",
    });
  };

  const resetQuiz = () => {
    setUserAnswers(new Array(questions.length).fill(null));
    setResult(null);
    setShowReview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
              ข้อสอบครูผู้ช่วย
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">
            สำหรับ ออม
          </p>
          <div className="mt-3 sm:mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>{questions.length} ข้อ</span>
            <span>•</span>
            <span>เลือกตอบ 1 ข้อ</span>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mb-8 sm:mb-12">
            <ResultCard result={result} />
            <div className="flex flex-col sm:flex-row justify-center mt-4 sm:mt-6 gap-3">
              <QuizButton
                variant="outline"
                onClick={resetQuiz}
                className="w-full sm:w-auto"
              >
                ทำแบบทดสอบใหม่
              </QuizButton>
            </div>
          </div>
        )}

        {/* Questions Section */}
        {!showReview && (
          <>
            <div className="space-y-4 sm:space-y-8 mb-8 sm:mb-12">
              {questions.map((question, index) => (
                <div key={index} data-question={index}>
                  <QuestionCard
                    question={question}
                    questionIndex={index}
                    selectedAnswer={userAnswers[index]}
                    onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <QuizButton variant="submit" size="lg" className="min-w-[200px]">
                    <Send className="w-5 h-5 mr-2" />
                    ส่งคำตอบ
                  </QuizButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ยืนยันการส่งคำตอบ</AlertDialogTitle>
                    <AlertDialogDescription>
                      คุณแน่ใจหรือไม่ว่าจะส่งคำตอบ? หลังจากส่งแล้วจะไม่สามารถแก้ไขได้
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      ส่งคำตอบ
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}

        {/* Review Section */}
        {showReview && (
          <ReviewSection 
            questions={questions} 
            userAnswers={userAnswers} 
          />
        )}
      </div>
    </div>
  );
};