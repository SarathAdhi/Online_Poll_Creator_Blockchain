import Navbar from "@components/Navbar";
import { connectWallet } from "@lib/connect-wallet";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  isError as _isError,
  isWalletConnecting as _isWalletConnecting,
  LoginDetails,
  loginDetails,
} from "utils/recoil";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { screenWidth } from "@constants/classname";
import LoadingAnimation from "@components/LoadingAnimation";
import { H4, P } from "@elements/Text";

type Props = {
  title: string;
  className?: string;
  children: React.ReactNode;
  checkAuth?: boolean;
};

const PageLayout: React.FC<Props> = ({
  title,
  children,
  checkAuth = true,
  className,
}) => {
  const router = useRouter();
  const [{ isCorrectNetwork }, setMetamaskDetails] =
    useRecoilState(loginDetails);

  const [isWalletConnecting, setIsWalletConnecting] =
    useRecoilState(_isWalletConnecting);

  const [isError, setIsError] = useRecoilState(_isError);

  const connectMyWallet = async () => {
    setIsWalletConnecting(true);

    const data = await connectWallet();

    if (data) {
      setMetamaskDetails(data as LoginDetails);
      setIsWalletConnecting(false);
      return;
    }

    setIsWalletConnecting(false);

    router.replace("/error/4901");
  };

  useEffect(() => {
    if (checkAuth) connectMyWallet();

    const { ethereum } = window as any;

    ethereum.on("accountsChanged", async () => {
      setIsWalletConnecting(true);

      const data = await connectWallet();

      if (data) {
        setMetamaskDetails(data as LoginDetails);
        setIsWalletConnecting(false);
        setIsError(false);
        return;
      }

      setIsError(true);
      setIsWalletConnecting(false);
    });

    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="min-h-screen bg-[#0c111f] flex flex-col items-center">
        <Navbar />

        {isWalletConnecting ? (
          <H4 className="mt-10 flex flex-col items-center !text-center text-white">
            <span className="flex items-center gap-2">
              Connecting Wallet <LoadingAnimation className="w-5 h-5" />
            </span>

            <span>
              If metamask is not opening automatically, open it manually.
            </span>
          </H4>
        ) : (
          <section
            className={clsx("flex flex-col flex-1", screenWidth, className)}
          >
            {children}
          </section>
        )}
      </main>
    </>
  );
};

export default PageLayout;
