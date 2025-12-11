import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main
      className={cn("container px-6 py-6 max-w-5xl relative z-10", className)}
    >
      {children}
    </main>
  );
};

export default PageContainer;
