import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const quizButtonVariants = cva(
  "relative font-semibold transition-[var(--transition-smooth)] transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)] hover:shadow-lg border-0",
        submit: "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)] hover:bg-primary/90 border-0",
        success: "bg-blue-500 text-white shadow-blue-400 hover:shadow-lg border-0",
        outline: "border-2 border-primary text-primary bg-background hover:bg-primary/5",
      },
      size: {
        default: "h-12 px-8 text-base",
        lg: "h-14 px-10 text-lg",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface QuizButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof quizButtonVariants> {}

export const QuizButton = ({ className, variant, size, ...props }: QuizButtonProps) => {
  return (
    <Button
      className={cn(quizButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
};