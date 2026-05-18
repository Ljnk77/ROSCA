import { motion } from "framer-motion";
import { useWalletStore } from "@/lib/wallet-store";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export function Navbar() {
  const { isConnected, address, balance, connect, disconnect } = useWalletStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">ARC Finance</span>
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
                <Button variant="outline" className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-colors" onClick={() => disconnect()}>
                  {address.slice(0, 4)}...{address.slice(-4)}
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowModal(true)} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                Connect OKX Wallet
              </Button>
            )}
          </div>
        </div>
      </nav>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Connect Web3 Wallet</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Open the OKX app to scan the QR code or connect directly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="w-24 h-24 rounded-2xl bg-muted/50 flex items-center justify-center border border-border p-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-foreground">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
              onClick={() => {
                connect();
                setShowModal(false);
              }}
            >
              Approve Connection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
