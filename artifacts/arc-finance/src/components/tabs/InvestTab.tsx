import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Users, Calendar, TrendingUp } from "lucide-react";

import poolVilla from "@/assets/pool-villa.png";
import poolCar from "@/assets/pool-car.png";
import poolYacht from "@/assets/pool-yacht.png";
import poolWatch from "@/assets/pool-watch.png";

import { useWalletStore } from "@/lib/wallet-store";
import { useToast } from "@/hooks/use-toast";

type Pool = {
  id: number;
  title: string;
  target: number;
  monthly: number;
  progress: number;
  participants: number;
  apy: number;
  date: string;
  image: string;
};

const pools: Pool[] = [
  {
    id: 1,
    title: "Buy a House",
    target: 50000,
    monthly: 1000,
    progress: 68,
    participants: 142,
    apy: 8.5,
    date: "Dec 2025",
    image: poolVilla,
  },
  {
    id: 2,
    title: "Buy a Car",
    target: 40000,
    monthly: 800,
    progress: 45,
    participants: 98,
    apy: 7.2,
    date: "Aug 2024",
    image: poolCar,
  },
  {
    id: 3,
    title: "Superyacht",
    target: 40000,
    monthly: 900,
    progress: 22,
    participants: 61,
    apy: 9.1,
    date: "May 2026",
    image: poolYacht,
  },
  {
    id: 4,
    title: "Rolex Watch",
    target: 30000,
    monthly: 600,
    progress: 81,
    participants: 203,
    apy: 6.8,
    date: "Mar 2024",
    image: poolWatch,
  },
];

export function InvestTab() {
  const { isConnected } = useWalletStore();
  const { toast } = useToast();

  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleJoin = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to join a pool.",
        variant: "destructive",
      });
      return;
    }

    if (!depositAmount || Number(depositAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Enter an amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setTimeout(() => {
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setSelectedPool(null);
        setDepositAmount("");

        toast({
          title: "Success",
          description: `Joined ${selectedPool?.title} pool successfully.`,
        });
      }, 1500);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold">Investment Pools</h2>
        <p className="text-muted-foreground mt-1">
          Join community savings goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pools.map((pool, index) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="overflow-hidden">
              <div className="h-48 relative">
                <img
                  src={pool.image}
                  className="w-full h-full object-cover"
                  alt={pool.title}
                />
                <Badge className="absolute top-3 right-3">
                  APY {pool.apy}%
                </Badge>

                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-xl font-bold">{pool.title}</h3>
                  <p className="text-sm">
                    Target ${pool.target.toLocaleString()}
                  </p>
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{pool.progress}%</span>
                  </div>

                  <Progress value={pool.progress} className="h-2 mt-2" />
                </div>

                <div className="grid grid-cols-3 text-sm gap-2">
                  <div>
                    <p className="text-muted-foreground">Monthly</p>
                    <p>${pool.monthly}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Users</p>
                    <p>{pool.participants}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p>{pool.date}</p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedPool(pool)}
                >
                  Join Pool
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedPool} onOpenChange={() => setSelectedPool(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {selectedPool?.title}</DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div className="text-center py-6">
                <CheckCircle2 className="mx-auto text-green-500 w-12 h-12" />
                <p className="mt-3 font-bold text-green-500">
                  Successfully Joined!
                </p>
              </motion.div>
            ) : (
              <motion.div className="space-y-4">
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <Button className="w-full" onClick={handleJoin}>
                  Confirm Investment
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
