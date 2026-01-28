import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import Lifecycle from "./pages/Lifecycle";
import CPUVisualizationPage from "./pages/CPUVisualizationPage";
import Simulations from "./pages/Simulations";
import Synchronization from "./pages/Synchronization";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/lifecycle" element={<Lifecycle />} />
            <Route path="/cpu-visualization" element={<CPUVisualizationPage />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/synchronization" element={<Synchronization />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
