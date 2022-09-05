export type PollProps = {
  creator: string;
  id?: string;
  title: string;
  uuid: string;
  votingType: string;
  options: string[];
  // TODO: Add proper type for vvoteCount. Currently get as BigNumber
  option1Votes: string[];
  option2Votes: string[];
  option3Votes: string[];
  option4Votes: string[];
  allVotedMembers: string[];
  isClosed: boolean;
};
