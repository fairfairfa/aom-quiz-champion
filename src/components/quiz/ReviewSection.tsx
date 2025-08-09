import { Question } from "@/types/quiz";
import { choiceLabels } from "@/data/questions";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  questions: Question[];
  userAnswers: (number | null)[];
}

export const ReviewSection = ({ questions, userAnswers }: ReviewSectionProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8">
        📝 รายละเอียดการตอบ
      </h2>
      
      {questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        return (
          <div 
            key={index}
            className="bg-card rounded-xl p-4 sm:p-6 shadow-[var(--shadow-card)] border border-border"
          >
            <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-success mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3 leading-relaxed">
                  {index + 1}. {question.q}
                </h3>
                
                <div className="space-y-2 mb-3 sm:mb-4">
                  <div className={cn(
                    "text-xs sm:text-sm font-medium",
                    isCorrect ? "text-success" : "text-destructive"
                  )}>
                    {isCorrect ? "✅ ถูกต้อง" : "❌ ผิด"}
                  </div>
                  
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium text-muted-foreground">คำตอบที่ถูก: </span>
                    <span className="text-success font-medium">
                      {choiceLabels[question.answer]} {question.options[question.answer]}
                    </span>
                  </div>
                  
                  {userAnswer !== null && (
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium text-muted-foreground">คุณเลือก: </span>
                      <span className={cn(
                        "font-medium",
                        isCorrect ? "text-success" : "text-destructive"
                      )}>
                        {choiceLabels[userAnswer]} {question.options[userAnswer]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start space-x-2 p-3 sm:p-4 bg-muted/50 rounded-lg">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium">คำอธิบาย: </span>
                    {question.explanation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};