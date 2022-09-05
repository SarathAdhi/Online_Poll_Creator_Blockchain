import { atom } from "recoil";
import { PollProps } from "types/poll";

export type LoginDetails = {
  isCorrectNetwork: boolean;
  currentAccount: string;
};

export const loginDetails = atom({
  key: "loginDetails",
  default: { isCorrectNetwork: false, currentAccount: "" } as LoginDetails,
});

export const allCreatedPolls = atom({
  key: "allCreatedPolls",
  default: [] as PollProps[],
});

export const isWalletConnecting = atom({
  key: "isWalletConnecting",
  default: true as boolean,
});

export const isError = atom({
  key: "isError",
  default: false as boolean,
});
