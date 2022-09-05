import { H1, H3 } from "@elements/Text";
import PageLayout from "@layouts/PageLayout";
import { errorMessages } from "@utils/constants/error-message";
import { loginDetails } from "@utils/recoil";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

const Error = () => {
  const router = useRouter();
  const [metamaskDetails] = useRecoilState(loginDetails);

  if (metamaskDetails.currentAccount) router.replace("/");

  const { code } = router.query;
  if (!code || metamaskDetails.currentAccount) return;

  // @ts-ignore
  const errorMessage = errorMessages[code];

  return (
    <PageLayout
      title={`Error | ${code}`}
      className="text-center !w-full !max-w-full bg-white items-center"
    >
      <img src="/assets/error.jpg" className="sm:w-1/2" />

      <H1 className="!font-extrabold mb-2">{code}</H1>

      <H3 className="whitespace-pre-wrap">{errorMessage}</H3>
    </PageLayout>
  );
};

export default Error;
