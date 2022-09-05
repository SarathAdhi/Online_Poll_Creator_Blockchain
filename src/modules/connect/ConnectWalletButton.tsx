import LoadingAnimation from "@components/LoadingAnimation";
import { connectWallet } from "@lib/connect-wallet";
import React from "react";
import { useRecoilState } from "recoil";
import {
  isWalletConnecting as _isWalletConnecting,
  LoginDetails,
  loginDetails,
} from "utils/recoil";

const ConnectWalletButton: React.FC = () => {
  const [, setMetamaskDetails] = useRecoilState(loginDetails);
  const [isWalletConnecting, setIsWalletConnecting] =
    useRecoilState(_isWalletConnecting);

  const connectMyWallet = async () => {
    setIsWalletConnecting(true);

    const data = await connectWallet();

    if (data) {
      setMetamaskDetails(data as LoginDetails);
      setIsWalletConnecting(false);
      return;
    }
  };

  return (
    <button
      onClick={connectMyWallet}
      className="z-50 px-2 py-1 rounded-md bg-[#f99844] font-semibold"
    >
      {isWalletConnecting ? <LoadingAnimation /> : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;
