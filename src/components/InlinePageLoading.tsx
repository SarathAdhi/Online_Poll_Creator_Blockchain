import PageLayout from "@layouts/PageLayout";
import React from "react";
import LoadingAnimation from "./LoadingAnimation";

const InlinePageLoading = () => {
  return (
    <PageLayout title="" className="flex items-center mt-20">
      <LoadingAnimation className="mx-auto" />
    </PageLayout>
  );
};

export default InlinePageLoading;
