import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CPUVisualization } from "@/components/3d/CPUVisualization";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Cpu, Zap } from "lucide-react";

const CPUVisualizationPage = () => {
  const [threadCount, setThreadCount] = useState(4);
  const [isRunning, setIsRunning] = useState(true);
  const [viewMode, setViewMode] = useState<"single" | "multi">("multi");

  const stats = {
    activeThreads: isRunning ? threadCount : 0,
    cpuUsage: isRunning ? Math.min(threadCount * 25, 100) : 0,
    contextSwitches: isRunning ? Math.floor(threadCount * 1.5) : 0,
    throughput: isRunning ? threadCount * 250 : 0,
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">3D CPU Visualization</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive multi-core processor model showing threads moving between cores
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <div className="lg:col-span-2 glass-card p-4 min-h-[500px]">
            <CPUVisualization 
              threadCount={threadCount} 
              isRunning={isRunning}
              viewMode={viewMode}
            />
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">View Mode</h3>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "single" ? "default" : "outline"}
                  onClick={() => setViewMode("single")}
                  className="flex-1"
                >
                  <Cpu className="h-4 w-4 mr-2" />
                  Single Core
                </Button>
                <Button
                  variant={viewMode === "multi" ? "default" : "outline"}
                  onClick={() => setViewMode("multi")}
                  className="flex-1"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Multi Core
                </Button>
              </div>
            </div>

            {/* Thread Count Control */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Thread Count: <span className="text-primary">{threadCount}</span>
              </h3>
              <Slider
                value={[threadCount]}
                onValueChange={(value) => setThreadCount(value[0])}
                min={1}
                max={8}
                step={1}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Adjust the number of threads running on the CPU
              </p>
            </div>

            {/* Playback Controls */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Controls</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  variant={isRunning ? "destructive" : "default"}
                  className="flex-1"
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" /> Resume
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setThreadCount(4);
                    setIsRunning(true);
                  }}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Real-time Stats */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Real-time Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Threads</span>
                  <span className="text-primary font-bold">{stats.activeThreads}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-primary font-bold">{stats.cpuUsage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Context Switches/s</span>
                  <span className="text-secondary font-bold">{stats.contextSwitches}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Throughput</span>
                  <span className="text-accent font-bold">{stats.throughput} ops/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6">
            <h4 className="font-semibold text-foreground mb-2">🔄 Multi-Core Processing</h4>
            <p className="text-sm text-muted-foreground">
              Multiple cores can execute different threads simultaneously, achieving true parallelism.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-semibold text-foreground mb-2">⚡ Thread Migration</h4>
            <p className="text-sm text-muted-foreground">
              Threads can be moved between cores for load balancing and better resource utilization.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-semibold text-foreground mb-2">📊 Performance Scaling</h4>
            <p className="text-sm text-muted-foreground">
              Adding more threads increases throughput until CPU cores are saturated.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CPUVisualizationPage;
