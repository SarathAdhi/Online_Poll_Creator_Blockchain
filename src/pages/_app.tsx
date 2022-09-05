import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </RecoilRoot>
  );
}

export default MyApp;
