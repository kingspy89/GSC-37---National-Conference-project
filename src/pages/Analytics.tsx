import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const threadPerformanceData = [
  { threads: 1, throughput: 100, latency: 50, cpuUsage: 25 },
  { threads: 2, throughput: 195, latency: 45, cpuUsage: 48 },
  { threads: 4, throughput: 380, latency: 40, cpuUsage: 92 },
  { threads: 8, throughput: 420, latency: 55, cpuUsage: 100 },
  { threads: 16, throughput: 400, latency: 85, cpuUsage: 100 },
];

const coreUtilizationData = [
  { name: "Core 1", value: 85, color: "#00ffff" },
  { name: "Core 2", value: 78, color: "#a855f7" },
  { name: "Core 3", value: 92, color: "#3b82f6" },
  { name: "Core 4", value: 65, color: "#ec4899" },
];

const serialVsParallelData = [
  { task: "Image Processing", serial: 12000, parallel: 3200 },
  { task: "Data Sorting", serial: 8500, parallel: 2100 },
  { task: "File Compression", serial: 15000, parallel: 4000 },
  { task: "Web Scraping", serial: 20000, parallel: 2500 },
];

const Analytics = () => {
  const [animatedStats, setAnimatedStats] = useState({
    tasksCompleted: 0,
    avgLatency: 0,
    peakThroughput: 0,
    efficiency: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const targets = {
      tasksCompleted: 15847,
      avgLatency: 42,
      peakThroughput: 420,
      efficiency: 94,
    };

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedStats({
        tasksCompleted: Math.floor(targets.tasksCompleted * progress),
        avgLatency: Math.floor(targets.avgLatency * progress),
        peakThroughput: Math.floor(targets.peakThroughput * progress),
        efficiency: Math.floor(targets.efficiency * progress),
      });

      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Performance Analytics</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive charts showing thread performance metrics and comparisons
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {animatedStats.tasksCompleted.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-secondary mb-2">
              {animatedStats.avgLatency}ms
            </div>
            <div className="text-sm text-muted-foreground">Avg Latency</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {animatedStats.peakThroughput}
            </div>
            <div className="text-sm text-muted-foreground">Peak Throughput</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-neon-green mb-2">
              {animatedStats.efficiency}%
            </div>
            <div className="text-sm text-muted-foreground">CPU Efficiency</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Thread Count vs Throughput */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Thread Count vs Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threadPerformanceData}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="threads" stroke="#888" label={{ value: 'Threads', position: 'bottom', fill: '#888' }} />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="throughput"
                  stroke="#00ffff"
                  fillOpacity={1}
                  fill="url(#colorThroughput)"
                  name="Throughput (ops/s)"
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: '#a855f7' }}
                  name="Latency (ms)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Performance peaks at 4 threads (matching core count), then degrades due to context switching overhead.
            </p>
          </div>

          {/* Core Utilization Pie */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Core Utilization Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={coreUtilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={{ stroke: '#888' }}
                >
                  {coreUtilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Well-balanced thread distribution across all available CPU cores.
            </p>
          </div>
        </div>

        {/* Serial vs Parallel Comparison */}
        <div className="glass-card p-6 mb-12">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Serial vs Parallel Execution Time (ms)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={serialVsParallelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis type="category" dataKey="task" stroke="#888" width={120} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="serial" fill="#ef4444" name="Serial (Single Thread)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="parallel" fill="#00ffff" name="Parallel (4 Threads)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {serialVsParallelData.map((item) => {
              const speedup = (item.serial / item.parallel).toFixed(1);
              return (
                <div key={item.task} className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{speedup}x</div>
                  <div className="text-xs text-muted-foreground">{item.task} speedup</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <h4 className="font-semibold text-primary mb-2">📈 Optimal Thread Count</h4>
            <p className="text-sm text-muted-foreground">
              Best performance is achieved when thread count matches CPU core count. 
              More threads beyond this adds overhead without benefit.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-semibold text-secondary mb-2">⚡ Speedup Potential</h4>
            <p className="text-sm text-muted-foreground">
              I/O-bound tasks (like web scraping) see the highest speedups from parallelization, 
              often achieving near-linear scaling.
            </p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-semibold text-accent mb-2">🎯 Amdahl's Law</h4>
            <p className="text-sm text-muted-foreground">
              The maximum speedup is limited by the sequential portion of the program. 
              10% sequential code limits speedup to 10x, regardless of cores.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Analytics;
