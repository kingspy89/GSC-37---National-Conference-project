import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Layers, Zap, Server, AlertTriangle, Clock, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const comparisonData = [
  {
    type: "Single-threaded",
    description: "Tasks executed one after another",
    time: "100%",
    icon: "🔄",
    color: "destructive",
    tasks: ["Task A", "Task B", "Task C", "Task D"],
  },
  {
    type: "Multi-threaded",
    description: "Tasks executed in parallel",
    time: "25-50%",
    icon: "⚡",
    color: "primary",
    tasks: ["Task A+B", "Task C+D"],
  },
];

const problems = [
  {
    title: "Blocking Operations",
    description: "When one thread waits, the entire program stalls. I/O operations can freeze your application while waiting for responses.",
    icon: Clock,
    color: "destructive",
  },
  {
    title: "Poor Scalability",
    description: "Single-threaded apps can't leverage multiple CPU cores, leaving processing power unused as workload increases.",
    icon: AlertTriangle,
    color: "secondary",
  },
  {
    title: "Underutilized Hardware",
    description: "Modern CPUs have 4-16+ cores. Single-threaded code only uses one, wasting 75-95% of available processing power.",
    icon: Cpu,
    color: "accent",
  },
];

const flipCards = [
  {
    front: { title: "What is a Thread?", icon: Layers },
    back: "A thread is the smallest unit of execution within a process. Multiple threads share the same memory space but can execute independently.",
  },
  {
    front: { title: "What is Concurrency?", icon: Zap },
    back: "Concurrency is when multiple tasks make progress within overlapping time periods. Tasks may not run simultaneously but are interleaved.",
  },
  {
    front: { title: "What is Parallelism?", icon: Server },
    back: "Parallelism is true simultaneous execution of multiple tasks on different CPU cores. It requires multi-core hardware.",
  },
];

const Introduction = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Introduction to Concurrency</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding how modern applications leverage multiple threads 
            to achieve better performance and responsiveness
          </p>
        </div>

        {/* Flip Cards Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-glow-cyan">
            Core Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flipCards.map((card, index) => (
              <div
                key={index}
                onClick={() => toggleCard(index)}
                className="relative h-64 cursor-pointer perspective-1000"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                    flippedCards.includes(index) ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCards.includes(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full glass-card p-6 flex flex-col items-center justify-center backface-hidden hover:glow-cyan transition-all"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <card.front.icon className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">
                      {card.front.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">Click to learn more</p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full glass-card p-6 flex items-center justify-center backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-center text-foreground leading-relaxed">
                      {card.back}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-glow-purple">
            Single-threaded vs Multi-threaded
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {comparisonData.map((item, index) => (
              <div key={index} className="glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{item.type}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Animated Timeline */}
                <div className="space-y-3 mb-6">
                  {item.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                        item.type === "Single-threaded"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-primary/20 text-primary"
                      }`}
                      style={{
                        animation: `fade-in 0.5s ease-out forwards`,
                        animationDelay: `${taskIndex * 200}ms`,
                        opacity: 0,
                      }}
                    >
                      {task}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Execution Time:</span>
                  <span
                    className={`font-bold ${
                      item.type === "Single-threaded" ? "text-destructive" : "text-primary"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Problems Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-glow-cyan">
            Problems with Single-Threading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="glass-card p-6 hover-glow group"
              >
                <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <problem.icon className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/lifecycle"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-cyan transition-all duration-300 hover:scale-105"
          >
            Learn Thread Lifecycle
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Introduction;
