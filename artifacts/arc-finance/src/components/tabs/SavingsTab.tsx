import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const dataA = [
  { value: 100 }, { value: 120 }, { value: 150 }, { value: 200 }, 
  { value: 280 }, { value: 350 }, { value: 450 }, { value: 600 }, 
  { value: 800 }, { value: 1000 }, { value: 1240 }
];

const dataB = [
  { value: 300 }, { value: 450 }, { value: 650 }, { value: 900 }, 
  { value: 1200 }, { value: 1600 }, { value: 2100 }, { value: 2700 }, 
  { value: 3200 }, { value: 3500 }, { value: 3890 }
];

function ProgressRing({ progress, size = 120, strokeWidth = 8, color = "hsl(var(--primary))" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{progress}%</span>
      </div>
    </div>
  );
}

export function SavingsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Savings Goals</h2>
          <p className="text-muted-foreground mt-1">Manage your personal savings targets.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Goal A */}
        <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold">Save $100,000</h3>
                <p className="text-muted-foreground text-sm mt-1">Est. completion: Dec 2027</p>
              </div>
              <ProgressRing progress={34} size={100} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Monthly contribution</p>
                <p className="text-lg font-semibold">$2,000</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Interest earned</p>
                <p className="text-lg font-semibold text-primary">+$1,240</p>
              </div>
            </div>

            <div className="h-24 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataA}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    labelStyle={{ display: 'none' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-primary text-primary-foreground">Deposit</Button>
              <Button variant="outline" className="flex-1">Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        {/* Goal B */}
        <Card className="bg-card border-border/50 hover:border-accent/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold">Save $80,000</h3>
                <p className="text-muted-foreground text-sm mt-1">Est. completion: Mar 2026</p>
              </div>
              <ProgressRing progress={58} size={100} color="hsl(var(--accent))" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Monthly contribution</p>
                <p className="text-lg font-semibold">$1,500</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Interest earned</p>
                <p className="text-lg font-semibold text-accent">+$3,890</p>
              </div>
            </div>

            <div className="h-24 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataB}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    labelStyle={{ display: 'none' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-primary text-primary-foreground">Deposit</Button>
              <Button variant="outline" className="flex-1">Withdraw</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
