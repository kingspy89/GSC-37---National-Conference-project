import { Cpu, Github, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-primary" />
            <span className="text-sm text-muted-foreground">
              Threads & Concurrency Dashboard
            </span>
          </div>

          {/* Credits */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Created by{" "}
              <span className="text-primary font-medium">Malav Patel</span>
              {" & "}
              <span className="text-secondary font-medium">Vaidik Trivedi</span>
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Gujarat University • Dept. of AIML & DS
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://docs.oracle.com/javase/tutorial/essential/concurrency/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">References</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/50">
            © 2024 Threads & Concurrency Educational Dashboard. Built with React, Three.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};
