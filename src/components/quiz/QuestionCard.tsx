import { Question } from "@/types/quiz";
import { choiceLabels } from "@/data/questions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
}

export const QuestionCard = ({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onAnswerSelect 
}: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)] border border-border">
      <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4 leading-relaxed">
        {questionIndex + 1}. {question.q}
      </h3>
      
      <div className="space-y-2 sm:space-y-3">
        {question.options.map((option, index) => (
            <label
              key={index}
              className={cn(
                "flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-[var(--transition-smooth)] border",
                selectedAnswer === index
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-muted/50 border-muted hover:bg-muted hover:border-border"
              )}
            >
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={index}
                checked={selectedAnswer === index}
                onChange={() => onAnswerSelect(index)}
                className="sr-only"
              />
              <div className={cn(
                "w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mr-2 sm:mr-3 flex items-center justify-center transition-[var(--transition-smooth)]",
                selectedAnswer === index
                  ? "border-primary bg-primary"
                  : "border-muted-foreground"
              )}>
                {selectedAnswer === index && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium mr-1 sm:mr-2 text-muted-foreground min-w-[18px] sm:min-w-[24px]">
                {choiceLabels[index]}
              </span>
              <span className="text-xs sm:text-sm flex-1 leading-relaxed">{option}</span>
            </label>
        ))}
      </div>
    </div>
  );
};