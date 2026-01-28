import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, AlertTriangle, Lock, RefreshCw } from "lucide-react";

// Race Condition Simulator
const RaceConditionSimulator = () => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [thread1Value, setThread1Value] = useState(0);
  const [thread2Value, setThread2Value] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const currentValue = counter;
      
      // Simulate race condition
      setTimeout(() => {
        setThread1Value(currentValue + 1);
        setLogs(prev => [...prev.slice(-4), `Thread 1: Read ${currentValue}, Write ${currentValue + 1}`]);
      }, Math.random() * 100);

      setTimeout(() => {
        setThread2Value(currentValue + 1);
        setLogs(prev => [...prev.slice(-4), `Thread 2: Read ${currentValue}, Write ${currentValue + 1}`]);
      }, Math.random() * 100);

      // Race condition: both threads read the same value
      setCounter(prev => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, counter]);

  const reset = () => {
    setCounter(0);
    setThread1Value(0);
    setThread2Value(0);
    setLogs([]);
    setIsRunning(false);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        Race Condition Simulator
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-primary/20 rounded-lg">
          <div className="text-3xl font-bold text-primary">{counter}</div>
          <div className="text-sm text-muted-foreground">Shared Counter</div>
        </div>
        <div className="text-center p-4 bg-secondary/20 rounded-lg">
          <div className="text-3xl font-bold text-secondary">{thread1Value}</div>
          <div className="text-sm text-muted-foreground">Thread 1 Sees</div>
        </div>
        <div className="text-center p-4 bg-accent/20 rounded-lg">
          <div className="text-3xl font-bold text-accent">{thread2Value}</div>
          <div className="text-sm text-muted-foreground">Thread 2 Sees</div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-muted/30 rounded-lg p-3 mb-4 h-32 overflow-y-auto font-mono text-xs">
        {logs.map((log, i) => (
          <div key={i} className="text-muted-foreground">{log}</div>
        ))}
        {logs.length === 0 && <div className="text-muted-foreground/50">Press Start to begin simulation...</div>}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
          {isRunning ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Start</>}
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Deadlock Visualizer
const DeadlockVisualizer = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { thread1: "Waiting", thread2: "Waiting", lock1: "Free", lock2: "Free", desc: "Both threads ready to acquire locks" },
    { thread1: "Holds Lock A", thread2: "Waiting", lock1: "Thread 1", lock2: "Free", desc: "Thread 1 acquires Lock A" },
    { thread1: "Holds Lock A", thread2: "Holds Lock B", lock1: "Thread 1", lock2: "Thread 2", desc: "Thread 2 acquires Lock B" },
    { thread1: "Waiting Lock B", thread2: "Holds Lock B", lock1: "Thread 1", lock2: "Thread 2", desc: "Thread 1 tries to acquire Lock B - BLOCKED" },
    { thread1: "Waiting Lock B", thread2: "Waiting Lock A", lock1: "Thread 1", lock2: "Thread 2", desc: "Thread 2 tries to acquire Lock A - DEADLOCK!" },
  ];

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning]);

  const currentStep = steps[step];
  const isDeadlock = step === steps.length - 1;

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Lock className="h-5 w-5 text-secondary" />
        Deadlock Visualizer
      </h3>

      {/* Visual Representation */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg border-2 ${isDeadlock ? 'border-destructive bg-destructive/10' : 'border-primary/50 bg-primary/10'}`}>
          <div className="font-bold text-foreground mb-2">Thread 1</div>
          <div className="text-sm text-muted-foreground">{currentStep.thread1}</div>
        </div>
        <div className={`p-4 rounded-lg border-2 ${isDeadlock ? 'border-destructive bg-destructive/10' : 'border-secondary/50 bg-secondary/10'}`}>
          <div className="font-bold text-foreground mb-2">Thread 2</div>
          <div className="text-sm text-muted-foreground">{currentStep.thread2}</div>
        </div>
      </div>

      {/* Locks */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-muted/30 rounded-lg text-center">
          <Lock className="h-6 w-6 mx-auto mb-1 text-primary" />
          <div className="text-sm font-medium">Lock A: {currentStep.lock1}</div>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg text-center">
          <Lock className="h-6 w-6 mx-auto mb-1 text-secondary" />
          <div className="text-sm font-medium">Lock B: {currentStep.lock2}</div>
        </div>
      </div>

      {/* Status */}
      <div className={`p-3 rounded-lg mb-4 text-center ${isDeadlock ? 'bg-destructive/20 text-destructive' : 'bg-muted/50 text-muted-foreground'}`}>
        {currentStep.desc}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
          {isRunning ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Simulate</>}
        </Button>
        <Button onClick={() => { setStep(0); setIsRunning(false); }} variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Context Switch Demo
const ContextSwitchDemo = () => {
  const [speed, setSpeed] = useState([50]);
  const [activeThread, setActiveThread] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [switchCount, setSwitchCount] = useState(0);

  const threads = ["Thread A", "Thread B", "Thread C", "Thread D"];

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setActiveThread(prev => (prev + 1) % threads.length);
      setSwitchCount(prev => prev + 1);
    }, 1000 - speed[0] * 8);

    return () => clearInterval(interval);
  }, [isRunning, speed]);

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <RefreshCw className="h-5 w-5 text-accent" />
        Context Switching Demo
      </h3>

      {/* Thread Visualization */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {threads.map((thread, i) => (
          <div
            key={thread}
            className={`p-3 rounded-lg text-center transition-all duration-300 ${
              activeThread === i
                ? 'bg-primary/30 border-2 border-primary scale-105 glow-cyan'
                : 'bg-muted/30 border border-border'
            }`}
          >
            <div className={`text-sm font-medium ${activeThread === i ? 'text-primary' : 'text-muted-foreground'}`}>
              {thread}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {activeThread === i ? '🏃 Running' : '⏸️ Waiting'}
            </div>
          </div>
        ))}
      </div>

      {/* Speed Control */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Switch Speed</span>
          <span className="text-sm text-primary">{speed[0]}%</span>
        </div>
        <Slider value={speed} onValueChange={setSpeed} min={10} max={100} step={10} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-muted/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">{switchCount}</div>
          <div className="text-xs text-muted-foreground">Context Switches</div>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-secondary">{Math.floor(switchCount * 0.5)}ms</div>
          <div className="text-xs text-muted-foreground">Overhead Time</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
          {isRunning ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Start</>}
        </Button>
        <Button onClick={() => { setSwitchCount(0); setIsRunning(false); }} variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Simulations = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Live Simulations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive demonstrations of common concurrency problems and concepts
          </p>
        </div>

        {/* Simulations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <RaceConditionSimulator />
          <DeadlockVisualizer />
          <ContextSwitchDemo />
        </div>

        {/* Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6">
            <h4 className="font-semibold text-destructive mb-2">⚠️ Race Conditions</h4>
            <p className="text-sm text-muted-foreground">
              Occur when multiple threads access shared data simultaneously without proper synchronization, 
              leading to unpredictable results.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-semibold text-secondary mb-2">🔒 Deadlocks</h4>
            <p className="text-sm text-muted-foreground">
              Happen when two or more threads are blocked forever, each waiting for the other to release a lock.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-semibold text-accent mb-2">🔄 Context Switching</h4>
            <p className="text-sm text-muted-foreground">
              The process of saving and restoring thread state has overhead. Too many switches reduce performance.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Simulations;
