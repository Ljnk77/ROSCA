import { useState, useEffect } from "react";

export function useWalletStore() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const restoreSession = async () => {
      const saved = localStorage.getItem("arc-wallet");
      if (!saved) return;

      try {
        const data = JSON.parse(saved);
        if (!data?.address) {
          localStorage.removeItem("arc-wallet");
          return;
        }

        const provider = window.okxwallet ?? window.ethereum;
        if (!provider) {
          localStorage.removeItem("arc-wallet");
          return;
        }

        const accounts = (await provider.request({
          method: "eth_accounts",
        })) as string[];

        const stillConnected =
          accounts &&
          accounts.length > 0 &&
          accounts[0].toLowerCase() === data.address.toLowerCase();

        if (stillConnected) {
          setIsConnected(true);
          setAddress(accounts[0]);
          setBalance(data.balance ?? "0");
        } else {
          localStorage.removeItem("arc-wallet");
        }
      } catch {
        localStorage.removeItem("arc-wallet");
      }
    };

    restoreSession();

    const handleAccountsChanged = (raw: unknown) => {
      const accounts = raw as string[];
      if (!accounts || accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
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
