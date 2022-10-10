import PercentageBar from "@components/PercentageBar";
import { H1, P } from "@elements/Text";
import { showQuestionAlert } from "@utils/alert";
import { votePoll } from "@utils/poll";
import React from "react";
import { PollProps } from "types/poll";

type Props = {
  isVoted: boolean;
} & PollProps;

export const PollSection: React.FC<Props> = ({
  id,
  title,
  options,
  isVoted,
  option1Votes,
  option2Votes,
  option3Votes,
  option4Votes,
  allVotedMembers,
}) => {
  const castVote = async (optionId: number) => {
    await votePoll(id as string, optionId);
  };

  const optionVotes = [
    option1Votes?.length,
    option2Votes?.length,
    option3Votes?.length,
    option4Votes?.length,
  ];

  const votePercentage = [
    ...optionVotes.map((e) => (e ? (e / allVotedMembers?.length) * 100 : 0)),
  ];

  return (
    <div className="w-full grid gap-4">
      <H1 className="mt-20 text-center">{title}</H1>

      <div className="p-5 w-full grid-cols-1 grid md:grid-cols-2 gap-6 bg-white/20 rounded-lg">
        {options?.map((option, index) => (
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
    </div>
  );
};
