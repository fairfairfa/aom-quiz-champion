import { QuizResult } from "@/types/quiz";
import { Trophy, Target, BookOpen, Download, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuizButton } from "@/components/ui/quiz-button";
import { generateResultImage, downloadImage } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ResultCardProps {
  result: QuizResult;
  onShare?: () => void;
}

export const ResultCard = ({ result, onShare }: ResultCardProps) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { toast } = useToast();
  const percentage = Math.round((result.score / result.total) * 100);
  
  const getMessage = () => {
    if (result.score < 10) {
      return `ได้ ${result.score}/20 คะแนน\nเก่งแล้วรักเหมือนเดิมนะ แต่ไปอ่านหนังสือเพิ่มด้วยนะ`;
    } else if (result.score <= 15) {
      return `ได้ ${result.score}/20 คะแนน\nเก่งมาก รัก ๆ น้า`;
    } else if (result.score <= 18) {
      return `ได้ ${result.score}/20 คะแนน\nสุดยอดดด รักที่สุด`;
    } else {
      return `ได้ ${result.score}/20 คะแนน\nโอ้ววว รักคุณครูคนนี้ที่สุด`;
    }
  };

  const getScoreColor = () => {
    if (result.score < 10) return "text-destructive";
    if (result.score <= 15) return "text-warning-foreground";
    return "text-success";
  };

  const getIcon = () => {
    if (result.score < 10) return BookOpen;
    if (result.score <= 15) return Target;
    return Trophy;
  };

  const handleDownloadResult = async () => {
    setIsGeneratingImage(true);
    try {
      const imageBlob = await generateResultImage(result);
      const now = new Date();
      const filename = `ผลการสอบครูผู้ช่วย_ออม_${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}.png`;
      downloadImage(imageBlob, filename);
      
      toast({
        title: "บันทึกสำเร็จ! 📸",
        description: "ภาพผลการสอบถูกบันทึกแล้ว",
        variant: "default",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสร้างภาพได้ กรุณาลองใหม่",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-card rounded-xl p-6 sm:p-8 shadow-[var(--shadow-success)] border border-border text-center">
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <div className={cn(
          "p-3 sm:p-4 rounded-full",
          result.score < 10 ? "bg-destructive/10" : 
          result.score <= 15 ? "bg-warning/10" : "bg-success/10"
        )}>
          <Icon className={cn(
            "w-6 h-6 sm:w-8 sm:h-8",
            result.score < 10 ? "text-destructive" : 
            result.score <= 15 ? "text-warning" : "text-success"
          )} />
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-bold mb-2">
            <span className={getScoreColor()}>{result.score}</span>
            <span className="text-muted-foreground">/{result.total}</span>
          </div>
          <div className="text-base sm:text-lg text-muted-foreground mb-1">
            คะแนนรวม ({percentage}%)
          </div>
        </div>

        <div className="text-base sm:text-lg font-medium text-card-foreground leading-relaxed whitespace-pre-line px-2">
          {getMessage()}
        </div>

        <div className="w-full bg-muted rounded-full h-2 sm:h-3 overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-1000 ease-out rounded-full",
              result.score < 10 ? "bg-destructive" : 
              result.score <= 15 ? "bg-warning" : "bg-gradient-to-r from-success to-accent"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <QuizButton
            variant="success"
            onClick={handleDownloadResult}
            disabled={isGeneratingImage}
            className="w-full sm:w-auto min-w-[160px]"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGeneratingImage ? "กำลังสร้าง..." : "บันทึกเป็นภาพ"}
          </QuizButton>
          
          {onShare && (
            <QuizButton
              variant="outline"
              onClick={onShare}
              className="w-full sm:w-auto min-w-[120px]"
            >
              <Share className="w-4 h-4 mr-2" />
              แชร์ผล
            </QuizButton>
          )}
        </div>
      </div>
    </div>
  );
};