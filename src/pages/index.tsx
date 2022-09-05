import LoadingAnimation from "@components/LoadingAnimation";
import PollCard from "@components/PollCard";
import PageLayout from "layouts/PageLayout";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getMyPolls } from "utils/poll";
import {
  allCreatedPolls as _allCreatedPolls,
  isError as _isError,
} from "utils/recoil";

const Home: NextPage = () => {
  const router = useRouter();

  const [allCreatedPolls, setAllCreatedPolls] =
    useRecoilState(_allCreatedPolls);

  const [isError] = useRecoilState(_isError);

  const [isLoading, setIsLoading] = useState(true);

  const getMyCreatedPolls = async () => {
    const data = await getMyPolls();

    if (data === "error") {
      router.reload();
    }

    if (data) {
      setAllCreatedPolls(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isError) {
      const fetchPollsInterval = setInterval(() => getMyCreatedPolls(), 2000);

      return () => {
        clearInterval(fetchPollsInterval);
      };
    }
  }, []);

  return (
    <PageLayout title="Home" className="mt-10">
      {isLoading ? (
        <LoadingAnimation className="mx-auto" />
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
