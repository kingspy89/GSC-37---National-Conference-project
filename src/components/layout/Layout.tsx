import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";


interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
