// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    event AddPoll(uint256 pollId);
    event Vote(uint256 pollId, uint256 optionId);
    event GetPollById(string uuid);
    event ClosePoll(uint256 pollId);

    struct Poll {
        address creator;
        uint256 id;
        string uuid;
        string title;
        string votingType;
        string[] options;
        address[] option1Votes;
        address[] option2Votes;
        address[] option3Votes;
        address[] option4Votes;
        address[] allVotedMembers;
        bool isClosed;
    }

    Poll[] private polls;

    mapping(uint256 => address) private pollToOwner;

    function createPoll(
        string memory title,
        string memory uuid,
        string memory votingType,
        string[] memory options
    ) external {
        uint256 pollId = polls.length;

        address[] memory emptyAddress;

        polls.push(
            Poll(
                msg.sender,
                pollId,
                uuid,
                title,
                votingType,
                options,
                emptyAddress,
                emptyAddress,
                emptyAddress,
                emptyAddress,
                emptyAddress,
                false
            )
        );

        pollToOwner[pollId] = msg.sender;
        emit AddPoll(pollId);
    }

    function vote(uint256 pollId, uint256 optionId) external {
        bool isVoted = false;

        for (uint256 i = 0; i < polls[pollId].allVotedMembers.length; i++) {
            if (polls[pollId].allVotedMembers[i] == msg.sender) {
                isVoted = true;
            }
        }

        if (!isVoted) {
            if (optionId == 1) {
                polls[pollId].option1Votes.push(msg.sender);
            } else if (optionId == 2) {
                polls[pollId].option2Votes.push(msg.sender);
            } else if (optionId == 3) {
                polls[pollId].option3Votes.push(msg.sender);
            } else if (optionId == 4) {
                polls[pollId].option4Votes.push(msg.sender);
            }

            polls[pollId].allVotedMembers.push(msg.sender);
        }

        emit Vote(pollId, optionId);
    }

    function getPollById(string memory uuid)
        external
        view
        returns (Poll memory)
    {
        Poll memory result;

        for (uint256 i = 0; i < polls.length; i++) {
            if (keccak256(bytes(polls[i].uuid)) == keccak256(bytes(uuid))) {
                result = polls[i];
            }
        }

        return result;
    }

    function deleteTask(uint256 pollId) external {
        if (pollToOwner[pollId] == msg.sender) {
            polls[pollId].isClosed = true;
            emit ClosePoll(pollId);
        }
    }

    function getMyPolls() external view returns (Poll[] memory) {
        Poll[] memory temporary = new Poll[](polls.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < polls.length; i++) {
            if (pollToOwner[i] == msg.sender && polls[i].isClosed == false) {
                temporary[counter] = polls[i];
                counter++;
            }
        }

        Poll[] memory result = new Poll[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }

        return result;
    }

    function getAllPolls() external view returns (Poll[] memory) {
        return polls;
    }
}
