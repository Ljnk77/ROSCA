import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { SummaryStrip } from "@/components/layout/SummaryStrip";
import { InvestTab } from "@/components/tabs/InvestTab";
import { SavingsTab } from "@/components/tabs/SavingsTab";
import { LoansTab } from "@/components/tabs/LoansTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background text-foreground">
      <Navbar />
      <SummaryStrip />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="invest" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted/50 border border-border p-1">
              <TabsTrigger value="invest" className="px-8 py-2 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all">Invest</TabsTrigger>
              <TabsTrigger value="savings" className="px-8 py-2 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all">Savings</TabsTrigger>
              <TabsTrigger value="loans" className="px-8 py-2 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all">Loans</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="invest" className="focus-visible:outline-none">
            <InvestTab />
          </TabsContent>
          
          <TabsContent value="savings" className="focus-visible:outline-none">
            <SavingsTab />
          </TabsContent>
          
          <TabsContent value="loans" className="focus-visible:outline-none">
            <LoansTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
