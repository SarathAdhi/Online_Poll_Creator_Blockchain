import { LoginDetails } from "@utils/recoil";
import Router from "next/router";
import { toast } from "react-hot-toast";

export const connectWallet = async () => {
  const router = Router;

  try {
    const { ethereum } = window as any;

    if (!ethereum) {
      toast.error("Metamask not detected.");
      return;
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    const rinkbyChainId = "0x4";

    if (chainId !== rinkbyChainId) {
      router.replace("/error/4901");
      toast.error("You are not connected to the Rinkeby Testnet!");
      return;
    }

    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (account.length === 0) {
      toast.error("No account found!");
      return;
    }

    const details: LoginDetails = {
      isCorrectNetwork: true,
      currentAccount: account[0],
    };

    return details;
  } catch (error) {
    return error;
  }
};