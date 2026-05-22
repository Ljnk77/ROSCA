import { useState, useEffect } from "react";

export function useWalletStore() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const saved = localStorage.getItem("arc-wallet");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setIsConnected(data.isConnected);
        setAddress(data.address);
        setBalance(data.balance);
      } catch {
        localStorage.removeItem("arc-wallet");
      }
    }

    const handleAccountsChanged = (accounts: unknown) => {
      const list = accounts as string[];
      if (!list || list.length === 0) {
        disconnect();
      } else {
        setAddress(list[0]);
      }
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    window.okxwallet?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.okxwallet?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connect = async (providerType?: "okx" | "metamask" | "any") => {
    let provider: EthereumProvider | undefined;

    if (providerType === "okx") {
      provider = window.okxwallet ?? window.ethereum;
    } else if (providerType === "metamask") {
      provider = window.ethereum?.isMetaMask ? window.ethereum : undefined;
    } else {
      provider = window.ethereum ?? window.okxwallet;
    }

    if (!provider) {
      throw new Error("no_provider");
    }

    const accounts = (await provider.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (!accounts || accounts.length === 0) {
      throw new Error("no_accounts");
    }

    const addr = accounts[0];

    let bal = "0";
    try {
      const rawBal = (await provider.request({
        method: "eth_getBalance",
        params: [addr, "latest"],
      })) as string;
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
  };

  const disconnect = () => {
    localStorage.removeItem("arc-wallet");
    setIsConnected(false);
    setAddress("");
    setBalance("0");
  };

  return { isConnected, address, balance, connect, disconnect };
}
