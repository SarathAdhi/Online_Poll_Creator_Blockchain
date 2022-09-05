import LoadingAnimation from "@components/LoadingAnimation";
import PollCard from "@components/PollCard";
import PageLayout from "layouts/PageLayout";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getMyPolls } from "utils/poll";
import { allCreatedPolls as _allCreatedPolls } from "utils/recoil";

const Home: NextPage = () => {
  const [allCreatedPolls, setAllCreatedPolls] =
    useRecoilState(_allCreatedPolls);

  const [isLoading, setIsLoading] = useState(true);

  const getMyCreatedPolls = async () => {
    const data = await getMyPolls();

    setIsLoading(false);
    setAllCreatedPolls(data);
  };

  useEffect(() => {
    setInterval(() => getMyCreatedPolls(), 2000);
  }, []);

  return (
    <PageLayout title="Home" className="mt-10">
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-wrap">
          {allCreatedPolls?.map((poll) => (
            <PollCard key={poll.uuid} {...poll} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
