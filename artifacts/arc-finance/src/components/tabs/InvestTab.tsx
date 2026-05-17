import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Users, Calendar, TrendingUp } from "lucide-react";

import poolVilla from "@/assets/pool-villa.png";
import poolCar from "@/assets/pool-car.png";
import poolYacht from "@/assets/pool-yacht.png";
import poolWatch from "@/assets/pool-watch.png";
import { useWalletStore } from "@/lib/wallet-store";
import { useToast } from "@/hooks/use-toast";

const pools = [
  {
    id: 1,
    title: "Mua Nhà",
    target: 50000,
    monthly: 1000,
    progress: 68,
    participants: 142,
    apy: 8.5,
    date: "Thg 12, 2025",
    image: poolVilla,
  },
  {
    id: 2,
    title: "Mua Xe",
    target: 40000,
    monthly: 800,
    progress: 45,
    participants: 98,
    apy: 7.2,
    date: "Thg 8, 2024",
    image: poolCar,
  },
  {
    id: 3,
    title: "Du Thuyền",
    target: 40000,
    monthly: 900,
    progress: 22,
    participants: 61,
    apy: 9.1,
    date: "Thg 5, 2026",
    image: poolYacht,
  },
  {
    id: 4,
    title: "Đồng Hồ Rolex",
    target: 30000,
    monthly: 600,
    progress: 81,
    participants: 203,
    apy: 6.8,
    date: "Thg 3, 2024",
    image: poolWatch,
  }
];

export function InvestTab() {
  const { isConnected } = useWalletStore();
  const { toast } = useToast();
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleJoin = () => {
    if (!isConnected) {
      toast({
        title: "Chưa kết nối ví",
        description: "Vui lòng kết nối ví OKX để tham gia pool.",
        variant: "destructive"
      });
      return;
    }
    
    if (!depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
      toast({
        title: "Số tiền không hợp lệ",
        description: "Vui lòng nhập số tiền lớn hơn 0.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedPool(null);
        setDepositAmount("");
        toast({
          title: "Thành công",
          description: `Bạn đã tham gia pool ${selectedPool?.title} thành công.`,
        });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pool Đầu Tư</h2>
          <p className="text-muted-foreground mt-1">Tham gia cùng cộng đồng để đạt mục tiêu nhanh hơn.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pools.map((pool, index) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="overflow-hidden border-border/50 bg-card hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300">
              <div className="h-48 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                <img 
                  src={pool.image} 
                  alt={pool.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <Badge className="absolute top-4 right-4 z-20 bg-primary/20 text-primary border-primary/30 backdrop-blur-md">
                  APY {pool.apy}%
                </Badge>
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-2xl font-bold text-white">{pool.title}</h3>
                  <p className="text-gray-300 font-medium">Mục tiêu: ${pool.target.toLocaleString()}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tiến độ</span>
                      <span className="font-medium text-primary">{pool.progress}%</span>
                    </div>
                    <Progress value={pool.progress} className="h-2 bg-muted/50" indicatorClassName="bg-primary shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hàng tháng
                      </div>
                      <p className="font-medium">${pool.monthly.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Người tham gia
                      </div>
                      <p className="font-medium">{pool.participants}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        Dự kiến
                      </div>
                      <p className="font-medium">{pool.date}</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20"
                    onClick={() => setSelectedPool(pool)}
                  >
                    Tham gia Pool
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedPool} onOpenChange={(open) => !open && setSelectedPool(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Tham gia Pool: {selectedPool?.title}</DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-500">Tham gia thành công!</h3>
                <p className="text-muted-foreground text-center">Giao dịch của bạn đã được xác nhận trên ARC Network.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 py-4"
              >
                <div className="bg-muted/30 p-4 rounded-lg space-y-2 border border-border/50">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Số tiền đề xuất (tháng)</span>
                    <span className="font-medium">${selectedPool?.monthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">APY</span>
                    <span className="font-medium text-accent">{selectedPool?.apy}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Số tiền đầu tư (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="pl-8 bg-background border-border focus-visible:ring-primary"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs text-primary hover:text-primary"
                      onClick={() => setDepositAmount(selectedPool?.monthly.toString() || "0")}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <Button className="w-full" onClick={handleJoin}>
                  Xác nhận đầu tư
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
