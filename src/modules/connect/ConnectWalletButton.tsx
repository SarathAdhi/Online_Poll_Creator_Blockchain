import { connectWallet } from "@lib/connect-wallet";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginDetails, loginDetails } from "utils/recoil";

const ConnectWalletButton: React.FC = () => {
  const [, setMetamaskDetails] = useRecoilState(loginDetails);

  const connectMyWallet = async () => {
    const data = await connectWallet();

    if (data) {
      setMetamaskDetails(data as LoginDetails);
      return;
    }
  };

  return (
    <button
      onClick={connectMyWallet}
      className="z-50 px-2 py-1 rounded-md bg-[#f99844] font-semibold"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
