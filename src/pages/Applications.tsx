import { PageWrapper } from "@/components/layout/PageWrapper";
import { Gamepad2, Pizza, Monitor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const applications = [
  {
    title: "Game Engines",
    icon: Gamepad2,
    color: "primary",
    description: "Modern games use multithreading to handle rendering, physics, AI, and audio simultaneously.",
    threads: [
      { name: "Render Thread", task: "Drawing frames at 60+ FPS", usage: 85 },
      { name: "Physics Thread", task: "Collision detection, gravity", usage: 70 },
      { name: "AI Thread", task: "NPC behavior, pathfinding", usage: 55 },
      { name: "Audio Thread", task: "Sound mixing, music", usage: 30 },
    ],
    benefits: [
      "Smooth gameplay experience",
      "No frame drops during complex scenes",
      "Responsive controls even during heavy computation",
    ],
  },
  {
    title: "Food Delivery Systems",
    icon: Pizza,
    color: "secondary",
    description: "Delivery apps process thousands of orders, driver locations, and routes concurrently.",
    threads: [
      { name: "Order Processing", task: "Handling new orders", usage: 90 },
      { name: "Driver Matching", task: "Optimal assignment algorithm", usage: 75 },
      { name: "Route Optimization", task: "Real-time navigation", usage: 80 },
      { name: "Notifications", task: "Push alerts to users", usage: 40 },
    ],
    benefits: [
      "Handle peak hour traffic",
      "Real-time order tracking",
      "Efficient driver utilization",
    ],
  },
  {
    title: "Operating Systems",
    icon: Monitor,
    color: "accent",
    description: "OS kernels manage thousands of processes and threads for all running applications.",
    threads: [
      { name: "System Services", task: "Background OS operations", usage: 25 },
      { name: "I/O Management", task: "Disk, network, USB", usage: 60 },
      { name: "Memory Manager", task: "Allocation, paging", usage: 45 },
      { name: "Scheduler", task: "Process/thread scheduling", usage: 35 },
    ],
    benefits: [
      "Multiple apps running smoothly",
      "Responsive user interface",
      "Efficient resource utilization",
    ],
  },
];

const Applications = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Real-World Applications</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how multithreading powers the software you use every day
          </p>
        </div>

        {/* Applications Grid */}
        <div className="space-y-12">
          {applications.map((app, index) => (
            <div
              key={app.title}
              className={`glass-card p-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Info Section */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-${app.color}/20 flex items-center justify-center`}>
                      <app.icon className={`h-7 w-7 text-${app.color}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{app.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{app.description}</p>

                  <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {app.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-primary">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Thread Visualization */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Thread Distribution:</h4>
                  {app.threads.map((thread, i) => (
                    <div key={thread.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-foreground">{thread.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">— {thread.task}</span>
                        </div>
                        <span className={`text-${app.color} font-bold`}>{thread.usage}%</span>
                      </div>
                      <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${app.color} rounded-full transition-all duration-1000`}
                          style={{
                            width: `${thread.usage}%`,
                            animation: `fade-in 0.5s ease-out forwards`,
                            animationDelay: `${i * 150}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Examples */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🌐", name: "Web Servers", desc: "Handle 1000s of requests" },
            { emoji: "🎬", name: "Video Editing", desc: "Real-time rendering" },
            { emoji: "💹", name: "Trading Systems", desc: "Microsecond decisions" },
            { emoji: "🔬", name: "Scientific Computing", desc: "Parallel simulations" },
          ].map((example) => (
            <div key={example.name} className="glass-card p-4 text-center hover-glow">
              <div className="text-3xl mb-2">{example.emoji}</div>
              <h4 className="font-semibold text-foreground text-sm">{example.name}</h4>
              <p className="text-xs text-muted-foreground">{example.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/analytics"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-cyan transition-all duration-300 hover:scale-105"
          >
            View Performance Analytics
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Applications;
