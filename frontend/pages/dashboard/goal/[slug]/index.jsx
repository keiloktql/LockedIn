import MainLayout from "@/components/layout/MainLayout";
import { H2, H3, P } from "@/components/layout/Typography";
import { Progress } from "@/components/ui/Progress";

import { useRouter } from "next/router";
import React from "react";

const ViewGoal = () => {
  const router = useRouter();
  const goalId = router.query.slug;
  return (
    <MainLayout
      title="View Goal | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <H2>View Goal</H2>
      <hr className="h-px max-w-screen-xl bg-gray-200 border-0" />
      <H3>I will quit smoking</H3>
      <P>Staked amount: S$300</P>
      <span>
        <Progress value={33} />
        <span className="flex w-full justify-between">
          <P className="text-slate-500 text-sm">19 Dec, 2025</P>
          <P className="text-slate-500 text-sm">18 Jan, 2026</P>
        </span>
      </span>
      <p>Beneficiary: Singapore Cancer Society</p>
    </MainLayout>
  );
};

export default ViewGoal;
