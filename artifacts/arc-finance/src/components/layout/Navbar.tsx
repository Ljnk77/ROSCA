import { motion } from "framer-motion";
import { useWalletStore } from "@/lib/wallet-store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

const WALLETS = [
  {
    id: "okx" as const,
    name: "OKX Wallet",
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-8 h-8">
        <rect width="32" height="32" rx="8" fill="#000" />
        <rect x="6" y="6" width="8" height="8" fill="white" />
        <rect x="18" y="6" width="8" height="8" fill="white" />
        <rect x="12" y="12" width="8" height="8" fill="white" />
        <rect x="6" y="18" width="8" height="8" fill="white" />
        <rect x="18" y="18" width="8" height="8" fill="white" />
      </svg>
    ),
    check: () => !!window.okxwallet,
  },
  {
    id: "metamask" as const,
    name: "MetaMask",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect width="32" height="32" rx="8" fill="#F6851B" />
        <text x="4" y="24" fontSize="20">🦊</text>
      </svg>
    ),
    check: () => !!window.ethereum?.isMetaMask,
  },
  {
    id: "any" as const,
    name: "Ví khác (Browser)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect width="32" height="32" rx="8" fill="#6366f1" />
        <path d="M8 16a8 8 0 1 0 16 0A8 8 0 0 0 8 16z" stroke="white" strokeWidth="2" />
        <path d="M16 10v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    check: () => !!window.ethereum,
  },
];

export function Navbar() {
  const { isConnected, address, balance, connect, disconnect } = useWalletStore();
  const [showModal, setShowModal] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (walletId: "okx" | "metamask" | "any") => {
    setConnecting(walletId);
    setError(null);
    try {
      await connect(walletId);
      setShowModal(false);
    } catch (err: any) {
      if (err.message === "no_provider") {
        setError("Không tìm thấy ví này. Hãy cài extension trên trình duyệt.");
      } else if (err.code === 4001) {
        setError("Bạn đã từ chối kết nối ví.");
      } else {
        setError("Kết nối thất bại. Vui lòng thử lại.");
      }
    } finally {
      setConnecting(null);
    }
  };

  return (
    <>
      <nav className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">ROSCA</span>
          </div>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ARC Network
                </div>
                <div className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-medium">
                  ${Number(balance).toLocaleString()} USD
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-colors"
                  onClick={() => disconnect()}
                >
                  {address.slice(0, 6)}...{address.slice(-4)}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => { setShowModal(true); setError(null); }}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                Kết nối ví
              </Button>
            )}
          </div>
        </div>
      </nav>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Chọn ví để kết nối</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Chọn ví bạn muốn dùng. Ví phải được cài extension trên trình duyệt.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-4">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                disabled={!!connecting}
                className="flex items-center gap-4 w-full px-4 py-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/40 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {wallet.icon}
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {wallet.check() ? "Đã cài đặt" : "Chưa phát hiện"}
                  </div>
                </div>
                {connecting === wallet.id && (
                  <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center pb-2">{error}</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
