import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <main
      className={cn(
        "min-h-screen pt-16 animate-fade-in",
        className
      )}
    >
      {children}
    </main>
  );
};
