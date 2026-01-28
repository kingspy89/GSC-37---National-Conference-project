import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Lock, Users, Zap, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SyncTechnique {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  before: string[];
  after: string[];
  codeExample: string;
  pros: string[];
  cons: string[];
}

const techniques: SyncTechnique[] = [
  {
    id: "mutex",
    title: "Mutex Locks",
    description: "Mutual exclusion locks ensure only one thread can access a critical section at a time.",
    icon: Lock,
    color: "primary",
    before: [
      "Thread A reads value: 5",
      "Thread B reads value: 5",
      "Thread A writes: 6",
      "Thread B writes: 6",
      "Expected: 7, Actual: 6 ❌",
    ],
    after: [
      "Thread A acquires lock",
      "Thread A reads: 5, writes: 6",
      "Thread A releases lock",
      "Thread B acquires lock",
      "Thread B reads: 6, writes: 7 ✅",
    ],
    codeExample: `mutex.lock();
try {
  counter++;
} finally {
  mutex.unlock();
}`,
    pros: ["Simple to understand", "Prevents race conditions", "Strong guarantees"],
    cons: ["Can cause deadlocks", "Performance overhead", "Risk of forgotten unlock"],
  },
  {
    id: "semaphore",
    title: "Semaphores",
    description: "Counting mechanisms that control access to a pool of resources with a limited capacity.",
    icon: Users,
    color: "secondary",
    before: [
      "Pool has 3 connections",
      "10 threads request access",
      "All 10 try simultaneously",
      "Connection pool exhausted",
      "System crash ❌",
    ],
    after: [
      "Semaphore initialized: 3",
      "Threads 1-3 acquire permits",
      "Threads 4-10 wait in queue",
      "Thread releases, next acquires",
      "Controlled access ✅",
    ],
    codeExample: `Semaphore pool = new Semaphore(3);

pool.acquire(); // Wait for permit
try {
  useConnection();
} finally {
  pool.release();
}`,
    pros: ["Controls resource pools", "Allows multiple access", "Flexible counting"],
    cons: ["More complex than mutex", "Need to track permits", "Possible starvation"],
  },
  {
    id: "atomic",
    title: "Atomic Operations",
    description: "Hardware-supported indivisible operations that complete without interruption.",
    icon: Zap,
    color: "accent",
    before: [
      "Read counter value",
      "...context switch...",
      "Another thread modifies",
      "...context switch...",
      "Write stale value ❌",
    ],
    after: [
      "AtomicInteger counter",
      "counter.incrementAndGet()",
      "Single CPU instruction",
      "No interruption possible",
      "Always consistent ✅",
    ],
    codeExample: `AtomicInteger counter = new AtomicInteger(0);

// Thread-safe increment
int newValue = counter.incrementAndGet();

// Compare and swap
counter.compareAndSet(expected, newValue);`,
    pros: ["No locks needed", "Best performance", "No deadlock risk"],
    cons: ["Limited operations", "Not for complex logic", "Hardware dependent"],
  },
];

const Synchronization = () => {
  const [activeTechnique, setActiveTechnique] = useState<string>("mutex");
  const [showAfter, setShowAfter] = useState<Record<string, boolean>>({});

  const current = techniques.find((t) => t.id === activeTechnique)!;

  const toggleComparison = (id: string) => {
    setShowAfter((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Synchronization Techniques</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mechanisms to coordinate thread access and prevent concurrency issues
          </p>
        </div>

        {/* Technique Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techniques.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setActiveTechnique(tech.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTechnique === tech.id
                  ? `bg-${tech.color}/20 text-${tech.color} border-2 border-${tech.color} glow-cyan`
                  : "bg-muted/30 text-muted-foreground border border-border hover:border-primary/50"
              }`}
            >
              <tech.icon className="h-5 w-5" />
              {tech.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Description & Code */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${current.color}/20 flex items-center justify-center`}>
                <current.icon className={`h-6 w-6 text-${current.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{current.title}</h2>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">{current.description}</p>

            <h4 className="font-semibold text-foreground mb-3">Code Example:</h4>
            <div className="code-block mb-6">
              <pre className="text-primary text-sm whitespace-pre-wrap">{current.codeExample}</pre>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-primary mb-2">✅ Pros</h5>
                <ul className="space-y-1">
                  {current.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-destructive mb-2">⚠️ Cons</h5>
                <ul className="space-y-1">
                  {current.cons.map((con, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-foreground">Before vs After</h3>
              <button
                onClick={() => toggleComparison(current.id)}
                className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors"
              >
                {showAfter[current.id] ? "Show Problem" : "Show Solution"}
              </button>
            </div>

            <div className="space-y-2">
              {(showAfter[current.id] ? current.after : current.before).map((step, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg font-mono text-sm animate-fade-in ${
                    showAfter[current.id]
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-destructive/10 border border-destructive/30"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-muted-foreground mr-2">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>

            <div className={`mt-4 p-4 rounded-lg ${showAfter[current.id] ? 'bg-primary/20' : 'bg-destructive/20'}`}>
              <div className="flex items-center gap-2">
                <Shield className={`h-5 w-5 ${showAfter[current.id] ? 'text-primary' : 'text-destructive'}`} />
                <span className="font-medium text-foreground">
                  {showAfter[current.id] ? "Thread-safe execution guaranteed!" : "Data corruption possible!"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="glass-card p-6 mb-12">
          <h3 className="text-xl font-bold text-foreground mb-4">Quick Reference: When to Use What</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <h4 className="font-semibold text-primary mb-2">Mutex</h4>
              <p className="text-sm text-muted-foreground">
                Use for exclusive access to critical sections. Best when only one thread should access at a time.
              </p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <h4 className="font-semibold text-secondary mb-2">Semaphore</h4>
              <p className="text-sm text-muted-foreground">
                Use for connection pools, rate limiting, or any scenario with limited resources.
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <h4 className="font-semibold text-accent mb-2">Atomic</h4>
              <p className="text-sm text-muted-foreground">
                Use for simple counters, flags, or references where lock-free performance matters.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-cyan transition-all duration-300 hover:scale-105"
          >
            See Real-World Applications
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Synchronization;
