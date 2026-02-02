import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Zap, GitBranch, BarChart3, Settings, Layers, Activity } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";


const navigationCards = [
  {
    title: "Introduction",
    description: "What is concurrency & multithreading?",
    icon: Layers,
    path: "/introduction",
    color: "neon-cyan",
  },
  {
    title: "Thread Lifecycle",
    description: "Understand thread states & transitions",
    icon: GitBranch,
    path: "/lifecycle",
    color: "neon-purple",
  },
  {
    title: "3D CPU Visualization",
    description: "Interactive multi-core processor model",
    icon: Cpu,
    path: "/cpu-visualization",
    color: "neon-blue",
  },
  {
    title: "Live Simulations",
    description: "Race conditions, deadlocks & more",
    icon: Activity,
    path: "/simulations",
    color: "neon-pink",
  },
  {
    title: "Synchronization",
    description: "Mutex, semaphores & atomic operations",
    icon: Settings,
    path: "/synchronization",
    color: "neon-green",
  },
  {
    title: "Performance Analytics",
    description: "Charts & metrics visualization",
    icon: BarChart3,
    path: "/analytics",
    color: "neon-cyan",
  },
];

const Home = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">Threads & Concurrency</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in delay-100">
              Performance Scaling on Multi-Core Systems
            </p>
            <p className="text-lg text-muted-foreground/70 mb-8 animate-fade-in delay-200 max-w-2xl mx-auto">
              An interactive exploration of how modern processors achieve parallelism
              through multithreading, synchronization, and concurrent execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Link
                to="/introduction"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-cyan transition-all duration-300 hover:scale-105"
              >
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/cpu-visualization"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary/50 text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                <Cpu className="h-5 w-5" />
                Explore 3D CPU
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
            <div className="w-1.5 h-3 bg-primary rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Explore Topics</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Dive deep into concurrent programming concepts with interactive visualizations and simulations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <Link
                key={card.path}
                to={card.path}
                className="group glass-card p-6 hover-glow transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-${card.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`h-6 w-6 text-${card.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8+", label: "Interactive Pages" },
              { value: "3D", label: "CPU Visualization" },
              { value: "Live", label: "Simulations" },
              { value: "∞", label: "Learning Possibilities" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
