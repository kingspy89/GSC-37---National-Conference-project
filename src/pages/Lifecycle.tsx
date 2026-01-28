import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArrowRight, Play, Clock, CheckCircle, XCircle, Pause } from "lucide-react";
import { Link } from "react-router-dom";

interface ThreadState {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ElementType;
  codeExample: string;
  details: string[];
}

const threadStates: ThreadState[] = [
  {
    id: "new",
    name: "New",
    description: "Thread is created but not yet started",
    color: "neon-blue",
    icon: Play,
    codeExample: "Thread t = new Thread(runnable);",
    details: [
      "Thread object is instantiated",
      "Resources not yet allocated",
      "Waiting for start() call",
    ],
  },
  {
    id: "ready",
    name: "Ready/Runnable",
    description: "Thread is ready to run and waiting for CPU time",
    color: "neon-cyan",
    icon: Clock,
    codeExample: "t.start(); // Thread enters runnable state",
    details: [
      "Thread is in the ready queue",
      "Waiting for scheduler to pick it",
      "All resources allocated",
    ],
  },
  {
    id: "running",
    name: "Running",
    description: "Thread is currently executing on a CPU core",
    color: "neon-green",
    icon: Play,
    codeExample: "// run() method is executing",
    details: [
      "Actively using CPU resources",
      "Executing the run() method",
      "Can be preempted by scheduler",
    ],
  },
  {
    id: "waiting",
    name: "Waiting/Blocked",
    description: "Thread is waiting for a resource or condition",
    color: "neon-purple",
    icon: Pause,
    codeExample: "synchronized(lock) { lock.wait(); }",
    details: [
      "Waiting for I/O operation",
      "Waiting for lock acquisition",
      "Waiting for notify() signal",
    ],
  },
  {
    id: "terminated",
    name: "Terminated",
    description: "Thread has completed execution",
    color: "destructive",
    icon: CheckCircle,
    codeExample: "// run() method completed or exception thrown",
    details: [
      "run() method finished",
      "Resources being released",
      "Cannot be restarted",
    ],
  },
];

const transitions = [
  { from: "new", to: "ready", label: "start()" },
  { from: "ready", to: "running", label: "Scheduler dispatch" },
  { from: "running", to: "ready", label: "Yield/Preempt" },
  { from: "running", to: "waiting", label: "wait()/sleep()" },
  { from: "waiting", to: "ready", label: "notify()/timeout" },
  { from: "running", to: "terminated", label: "Complete/Exception" },
];

const Lifecycle = () => {
  const [activeState, setActiveState] = useState<string>("new");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentState = threadStates.find((s) => s.id === activeState);

  const simulateLifecycle = () => {
    setIsAnimating(true);
    const states = ["new", "ready", "running", "waiting", "ready", "running", "terminated"];
    let index = 0;

    const interval = setInterval(() => {
      setActiveState(states[index]);
      index++;
      if (index >= states.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1000);
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Thread Lifecycle</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the states a thread goes through from creation to termination
          </p>
        </div>

        {/* Lifecycle Diagram */}
        <div className="glass-card p-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Interactive State Diagram</h2>
            <button
              onClick={simulateLifecycle}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:glow-cyan transition-all disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              {isAnimating ? "Simulating..." : "Simulate Lifecycle"}
            </button>
          </div>

          {/* State Nodes */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {threadStates.map((state) => (
              <button
                key={state.id}
                onClick={() => setActiveState(state.id)}
                className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 min-w-[120px] ${
                  activeState === state.id
                    ? `border-${state.color} bg-${state.color}/20 glow-cyan scale-110`
                    : "border-border bg-muted/30 hover:border-primary/50"
                }`}
              >
                <state.icon
                  className={`h-8 w-8 mb-2 ${
                    activeState === state.id ? `text-${state.color}` : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    activeState === state.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {state.name}
                </span>
              </button>
            ))}
          </div>

          {/* Transitions */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {transitions.map((t, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  activeState === t.from || activeState === t.to
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {t.from} → {t.to}: {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* State Details */}
        {currentState && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Description */}
            <div className="glass-card p-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                <currentState.icon className="h-6 w-6 text-primary" />
                {currentState.name} State
              </h3>
              <p className="text-muted-foreground mb-6">{currentState.description}</p>

              <h4 className="font-semibold text-foreground mb-3">Key Characteristics:</h4>
              <ul className="space-y-2">
                {currentState.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Example */}
            <div className="glass-card p-6 animate-fade-in">
              <h4 className="font-semibold text-foreground mb-4">Code Example:</h4>
              <div className="code-block">
                <code className="text-primary">{currentState.codeExample}</code>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h5 className="text-sm font-semibold text-foreground mb-2">💡 Tip</h5>
                <p className="text-sm text-muted-foreground">
                  {currentState.id === "new" &&
                    "Always call start() instead of run() to create a new thread of execution."}
                  {currentState.id === "ready" &&
                    "The JVM scheduler decides which thread runs next based on priority and scheduling algorithm."}
                  {currentState.id === "running" &&
                    "A thread can yield() to give other threads a chance to run."}
                  {currentState.id === "waiting" &&
                    "Always use wait() inside a synchronized block to avoid IllegalMonitorStateException."}
                  {currentState.id === "terminated" &&
                    "Once terminated, a thread cannot be restarted. Create a new thread object instead."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/cpu-visualization"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-cyan transition-all duration-300 hover:scale-105"
          >
            Explore 3D CPU Visualization
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Lifecycle;
