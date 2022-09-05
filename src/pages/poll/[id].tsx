import InlinePageLoading from "@components/InlinePageLoading";
import PercentageBar from "@components/PercentageBar";
import Button from "@elements/Button";
import { H1, P } from "@elements/Text";
import { RefreshIcon, ShareIcon, TrashIcon } from "@heroicons/react/solid";
import PageLayout from "@layouts/PageLayout";
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
  const [{ currentAccount }] = useRecoilState(loginDetails);

  const getPollByUuid = async (toastMessage: string) => {
    toast.loading(toastMessage, {
      duration: 1000,
    });

    const data = await getPollById(id as string);

    setPoll(data);
  };

  useEffect(() => {
    getPollByUuid("Fetching Poll...");
  }, [id]);

  const isLoading = !poll;

  if (isLoading) return <InlinePageLoading />;

  const castVote = async (optionId: number) => {
    await votePoll(poll?.id as string, optionId);
  };

  const isVoted = poll.allVotedMembers?.some(
    (address) => address.toLowerCase() === currentAccount.toLowerCase()
  );

  const isCreator = poll.creator.toLowerCase() === currentAccount.toLowerCase();

  const optionVotes = [
    poll.option1Votes.length,
    poll.option2Votes.length,
    poll.option3Votes.length,
    poll.option4Votes.length,
  ];

  const votePercentage = [
    ...optionVotes.map((e) =>
      e ? (e / poll.allVotedMembers.length) * 100 : 0
    ),
  ];

  const deleteThisPoll = async () => {
    await deletePoll(poll.id);
    // router.replace("/");
  };

  return (
    <PageLayout
      title={`${poll.title} | Poll`}
      className="text-white items-center gap-5"
    >
      {poll.isClosed || !poll.uuid ? (
        <Error statusCode={404} />
      ) : (
        <>
          <H1 className="mt-20 text-center">{poll?.title}</H1>

          <div className="p-5 w-full grid-cols-1 grid md:grid-cols-2 gap-6 bg-white/20 rounded-lg">
            {poll.options.map((option, index) => (
              <button
                key={option + index}
                disabled={isVoted}
                onClick={() => {
                  showQuestionAlert(
                    "Are you sure ?",
                    `Do you want to vote for the option ${option} ?`,
                    () => castVote(index + 1)
                  );
                }}
                className="w-full grid gap-1 p-3 rounded-lg bg-black/30"
              >
                <P className="w-full flex items-center justify-between">
                  <span>{`${option}`}</span>

                  {isVoted && (
                    <span>{`${votePercentage[index]}% (${optionVotes[index]} votes)`}</span>
                  )}
                </P>

                {isVoted && <PercentageBar value={votePercentage[index]} />}
              </button>
            ))}
          </div>

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
        </>
      )}
    </PageLayout>
  );
};

export default ViewPoll;
