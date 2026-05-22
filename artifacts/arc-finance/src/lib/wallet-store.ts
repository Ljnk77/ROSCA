import { useState, useEffect } from "react";

export function useWalletStore() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const saved = localStorage.getItem("arc-wallet");
    if (saved) {
      const data = JSON.parse(saved);
      setIsConnected(data.isConnected);
      setAddress(data.address);
      setBalance(data.balance);
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
      }
    };

    if (window.ethereum) {
      (window.ethereum as any).on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        (window.ethereum as any).removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const connect = async (providerType?: "okx" | "metamask" | "any") => {
    try {
      let provider: any = null;

      if (providerType === "okx" && (window as any).okxwallet) {
        provider = (window as any).okxwallet;
      } else if (providerType === "metamask" && (window as any).ethereum?.isMetaMask) {
        provider = (window as any).ethereum;
      } else if (window.ethereum) {
        provider = window.ethereum;
      } else {
        throw new Error("no_provider");
      }

      const accounts: string[] = await provider.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) throw new Error("no_accounts");

      const addr = accounts[0];

      let bal = "0";
      try {
        const rawBal = await provider.request({
          method: "eth_getBalance",
          params: [addr, "latest"],
        });
        const eth = parseInt(rawBal, 16) / 1e18;
        bal = (eth * 2500).toFixed(2);
      } catch {
        bal = "0";
      }

      const data = { isConnected: true, address: addr, balance: bal };
      localStorage.setItem("arc-wallet", JSON.stringify(data));
      setIsConnected(true);
      setAddress(addr);
      setBalance(bal);
    } catch (err: any) {
      if (err.message === "no_provider") {
        throw new Error("no_provider");
      }
      throw err;
    }
  };

  const disconnect = () => {
    localStorage.removeItem("arc-wallet");
    setIsConnected(false);
    setAddress("");
    setBalance("0");
  };

  return { isConnected, address, balance, connect, disconnect };
}
