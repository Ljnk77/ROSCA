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
  }, []);

  const connect = () => {
    const data = {
      isConnected: true,
      address: "0x3a" + Math.random().toString(16).slice(2, 6) + "f7b2",
      balance: "12500",
    };
    localStorage.setItem("arc-wallet", JSON.stringify(data));
    setIsConnected(data.isConnected);
    setAddress(data.address);
    setBalance(data.balance);
  };

  const disconnect = () => {
    localStorage.removeItem("arc-wallet");
    setIsConnected(false);
    setAddress("");
    setBalance("0");
  };

  return { isConnected, address, balance, connect, disconnect };
}
