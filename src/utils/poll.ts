import { ethers } from "ethers";
import toast from "react-hot-toast";
import ShortUniqueId from "short-unique-id";
import PollAbi from "../../build/contracts/Voting.json";

const uid = new ShortUniqueId({ length: 6 });

const PollContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

const showErrorToast = (message: string) => {
  if (message.includes("user rejected transaction")) {
    toast.error("Transaction got rejected!!");
    return;
  }

  toast.error(message);

  return "error";
};

export const getContractDetails = () => {
  try {
    const { ethereum } = window as any;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const PollContract = new ethers.Contract(
        PollContractAddress,
        PollAbi.abi,
        signer
      );

      return PollContract;
    } else {
      showErrorToast("Ethereum object doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNewPoll = async (data: any) => {
  const PollContract = getContractDetails();

  return await PollContract?.createPoll(
    data.title,
    uid(),
    data.votingType,
    data.options
  )
    .then((data: any) => data)
    .catch((error: any) => showErrorToast(error.message));
};

export const deletePoll = async (id: any) => {
  const PollContract = getContractDetails();

  return await PollContract?.deleteTask(id)
    .then((data: any) => data)
    .catch((error: any) => showErrorToast(error.message));
};

export const getAllPolls = async () => {
  const PollContract = getContractDetails();

  return await PollContract?.getAllPolls()
    .then((data: any) => data)
    .catch((error: any) => showErrorToast(error.message));
};

export const getMyPolls = async () => {
  const PollContract = getContractDetails();

  return await PollContract?.getMyPolls()
    .then((data: any) => data)
    .catch((error: any) => showErrorToast(error.message));
};

export const getPollById = async (uuid: string) => {
  const PollContract = getContractDetails();

  return await PollContract?.getPollById(uuid)
    .then((data: any) => data)
    .catch((error: any) => showErrorToast(error.message));
};

export const votePoll = async (id: string, optionId: number) => {
  const PollContract = getContractDetails();

  return await PollContract?.vote(id, optionId)
    .then((data: any) => data)
    .catch((error: any) => showErrorToast(error.message));
};
