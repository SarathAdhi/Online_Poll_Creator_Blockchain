import PageLayout from "@layouts/PageLayout";
import React from "react";
import LoadingAnimation from "./LoadingAnimation";

const InlinePageLoading = () => {
  return (
    <PageLayout title="" className="flex items-center mt-20">
      <LoadingAnimation />
    </PageLayout>
  );
};

export default InlinePageLoading;
