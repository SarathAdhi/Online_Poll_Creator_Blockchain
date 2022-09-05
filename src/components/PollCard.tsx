import LinkedItem from "@elements/LinkedItem";
import { H3, P } from "@elements/Text";
import React from "react";
import { PollProps } from "types/poll";

type Props = {} & PollProps;

const PollCard: React.FC<Props> = ({ id, title, uuid, allVotedMembers }) => {
  return (
    <LinkedItem
      href={`/poll/${uuid}`}
      className="group relative p-4 bg-slate-100 rounded-lg"
    >
      <H3 className="truncate">{title}</H3>

      <P className="italic">Total votes: {allVotedMembers?.length}</P>
    </LinkedItem>
  );
};

export default PollCard;
