import Input from "@elements/Input";
import ListInput from "@elements/ListInput";
import { H2 } from "@elements/Text";
import PageLayout from "@layouts/PageLayout";
import React, { useState } from "react";
import ShortUniqueId from "short-unique-id";
import { ListInputOption } from "@elements/ListInput";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { createNewPoll } from "@utils/poll";
import toast from "react-hot-toast";

const options = [
  {
    value: "yesOrNo",
    label: "Yes or No",
  },
  {
    value: "mcq",
    label: "Multiple choice",
  },
];

type PollDetails = {
  title: string;
  votingType: ListInputOption;
  options: {
    id: number;
    value: string;
  }[];
  optionsCount: number;
};

const initialValues = {
  title: "",
  votingType: options[0],
  optionsCount: 1,
  options: [],
};

const CreatePoll = () => {
  const [createPollDetails, setCreatePollDetails] =
    useState<PollDetails>(initialValues);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const PollDetails = {
      ...createPollDetails,
      votingType: createPollDetails.votingType.value,
      options:
        createPollDetails.votingType.value === "mcq"
          ? createPollDetails.options.map((e) => e.value)
          : ["Yes", "No"],
    };

    await createNewPoll(PollDetails);
    setCreatePollDetails(initialValues);
  };

  return (
    <PageLayout title="Create Poll" className="text-white items-center">
      <H2>Create a Poll</H2>

      <form onSubmit={handleSubmit} className="w-full grid gap-3">
        <Input
          label="Title"
          placeholder="Type your question"
          value={createPollDetails.title}
          onChange={({ target }) =>
            setCreatePollDetails({ ...createPollDetails, title: target.value })
          }
          required
        />

        <ListInput
          label="Voting Type"
          name="votingType"
          value={createPollDetails.votingType}
          options={options}
          onChange={(data) => {
            setCreatePollDetails({
              ...createPollDetails,
              votingType: data,
            });
          }}
          required
        />

        {createPollDetails.votingType.value === "mcq" &&
          [...Array(createPollDetails.optionsCount)].map((_, index) => (
            <div className="flex items-end  gap-2" key={index}>
              <Input
                type="text"
                label={`Option ${index + 1}`}
                placeholder="Type your question"
                onChange={({ target }) =>
                  setCreatePollDetails({
                    ...createPollDetails,
                    options: [
                      ...createPollDetails.options.filter(
                        (option) => option.id !== index + 1
                      ),
                      { id: index + 1, value: target.value },
                    ],
                  })
                }
                autoFocus
                required
              />

              <button
                type="button"
                className="bg-white rounded-full p-1 mb-0.5"
                onClick={() => {
                  if (createPollDetails.optionsCount === 4) {
                    toast.error("You can't add more than 4 options");
                    return;
                  }

                  if (index === createPollDetails.optionsCount - 1) {
                    setCreatePollDetails({
                      ...createPollDetails,
                      optionsCount: createPollDetails.optionsCount + 1,
                    });
                  } else {
                    setCreatePollDetails({
                      ...createPollDetails,
                      optionsCount: createPollDetails.optionsCount - 1,
                    });
                  }
                }}
              >
                {index === createPollDetails.optionsCount - 1 ? (
                  <PlusIcon className="h-6 w-6  text-black" />
                ) : (
                  <MinusIcon className="h-6 w-6  text-black" />
                )}
              </button>
            </div>
          ))}

        <button type="submit">Submit</button>
      </form>
    </PageLayout>
  );
};

export default CreatePoll;
