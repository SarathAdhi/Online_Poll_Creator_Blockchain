import { screenWidth } from "@constants/classname";
import LinkedItem from "@elements/LinkedItem";
import { H5 } from "@elements/Text";
import ConnectWalletButton from "@modules/connect/ConnectWalletButton";
import { loginDetails } from "@utils/recoil";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { pages } from "./page";

type NavlinksProps = {
  href: string;
  name: string;
  Icon: React.FC<React.ComponentProps<"svg">>;
};

const Navlinks: React.FC<NavlinksProps> = ({ href, name, Icon }) => {
  const currentPath = useRouter().pathname;

  return (
    <LinkedItem href={href} className="group relative duration-200 transition ">
      <H5 className="flex items-center gap-1">
        <Icon className="w-5 h-5" />
        {name}
      </H5>

      <span
        className={clsx(
          "absolute top-0 right-0 h-[2px] w-0 group-hover:w-full duration-200 bg-orange-300"
        )}
      />

      <span
        className={clsx(
          currentPath === href ? "w-full" : "w-0",
          "absolute left-0 h-[2px] group-hover:w-full duration-200 bg-orange-300"
        )}
      />
    </LinkedItem>
  );
};

const Navbar = () => {
  const [{ currentAccount }] = useRecoilState(loginDetails);
  const [isShowFullAddress, setIsShowFullAddress] = useState(false);

  const shortendAddress =
    currentAccount &&
    `${currentAccount.substring(0, 3)}...${currentAccount.substring(
      currentAccount.length - 3,
      currentAccount.length
    )}`;

  return (
    <header className="py-4 w-full flex flex-col items-center justify-center sticky top-0">
      <div
        className={clsx(
          "relative z-50 flex items-center justify-between",
          screenWidth
        )}
      >
        <LinkedItem href="/" className="z-50 flex items-center w-12 h-12">
          <img src="/assets/logo.jpg" className="rounded-full" />
        </LinkedItem>

        <div className="z-0 sm:absolute sm:w-full text-center justify-center flex items-center gap-6 text-orange-500">
          {pages.map((page) => (
            <Navlinks {...page} />
          ))}
        </div>

        {currentAccount ? (
          <button
            onClick={() => setIsShowFullAddress((pre) => !pre)}
            className="z-50 font-bold bg-orange-300 px-2 py-1 rounded-lg cursor-pointer hidden sm:block"
          >
            {isShowFullAddress ? currentAccount : shortendAddress}
          </button>
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </header>
  );
};

export default Navbar;