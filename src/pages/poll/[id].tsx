import InlinePageLoading from "@components/InlinePageLoading";
import PercentageBar from "@components/PercentageBar";
import Button from "@elements/Button";
import { H1, P } from "@elements/Text";
import { RefreshIcon, ShareIcon, TrashIcon } from "@heroicons/react/solid";
import PageLayout from "@layouts/PageLayout";
import { PollSection } from "@modules/polll";
import { showQuestionAlert, showWarningAlert } from "@utils/alert";
import { deletePoll, getPollById, votePoll } from "@utils/poll";
import { loginDetails } from "@utils/recoil";
import Error from "next/error";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { PollProps } from "types/poll";

const ViewPoll = () => {
  const router = useRouter();
  const id = router.query.id;

  const [poll, setPoll] = useState<PollProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [{ currentAccount }] = useRecoilState(loginDetails);

  const getPollByUuid = async (toastMessage: string) => {
    toastMessage &&
      toast.loading(toastMessage, {
        duration: 1000,
      });

    const data = await getPollById(id as string);

    setPoll(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchPollInterval = setInterval(() => getPollByUuid(""), 2000);

    return () => {
      clearInterval(fetchPollInterval);
    };
  }, [id]);

  if (isLoading || !poll) return <InlinePageLoading />;

  const isVoted = poll.allVotedMembers?.some(
    (address) => address.toLowerCase() === currentAccount.toLowerCase()
  );

  const isCreator =
    poll?.creator?.toLowerCase() === currentAccount.toLowerCase();

  const deleteThisPoll = async () => {
    await deletePoll(poll.id);
    // router.replace("/");
  };

  return (
    <PageLayout
      title={`${poll.title} | Poll`}
      className="text-white items-center gap-5"
    >
      <PollSection {...poll} isVoted={isVoted} />

      <div className="mt-10 flex gap-2 flex-wrap">
        {isVoted && (
          <Button
            Icon={RefreshIcon}
            onClick={() => {
              getPollByUuid("Refreshing result...");
            }}
            className="px-2 py-1 bg-indigo-500 rounded-md text-lg"
          >
            Refresh results
          </Button>
        )}

        <Button
          Icon={ShareIcon}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Copied to clipboard");
          }}
          className="px-2 py-1 bg-indigo-500 rounded-md text-lg"
        >
          Share
        </Button>
      </div>

      <div>
        {isCreator && (
          <Button
            Icon={TrashIcon}
            onClick={() => {
              showWarningAlert(
                "Are you sure the you want to permanently delete this Poll?",
                poll.title,
                () => deleteThisPoll()
              );
            }}
            className="flex items-center gap-1 bg-red-500 p-2 rounded-md text-white"
          >
            Delete
          </Button>
        )}
      </div>
    </PageLayout>
  );
};

export default ViewPoll;
