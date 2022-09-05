import Navbar from "@components/Navbar";
import { connectWallet } from "@lib/connect-wallet";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginDetails, loginDetails } from "utils/recoil";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { screenWidth } from "@constants/classname";

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
  const [, setMetamaskDetails] = useRecoilState(loginDetails);

  const connectMyWallet = async () => {
    const data = await connectWallet();

    if (data) {
      setMetamaskDetails(data as LoginDetails);
      return;
    }

    router.replace("/error/4901");
  };

  useEffect(() => {
    toast.dismiss();

    return () => {
      if (checkAuth) connectMyWallet();

      const { ethereum } = window as any;

      ethereum.on("accountsChanged", async () => {
        const data = await connectWallet();

        if (data) {
          setMetamaskDetails(data as LoginDetails);
          return;
        }
      });
    };
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="min-h-screen bg-[#0c111f] flex flex-col items-center">
        <Navbar />

        <section
          className={clsx("flex flex-col flex-1", screenWidth, className)}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default PageLayout;
