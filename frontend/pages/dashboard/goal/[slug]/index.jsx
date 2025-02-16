import MainLayout from "@/components/layout/MainLayout";
import { H2, H3, P } from "@/components/layout/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";

import { useRouter } from "next/router";
import React from "react";
const journalEntries = [
  {
    avatar: "/assets/avatar-adjua-forrest.jpg",
    username: "Le Le",
    date: "Dec 19, 2024, 9:10 AM",
    comment:
      "Excited to start my journey! No more cigarettes and no more stress!",
    commitmentLink: "/commitments/bryan-no-smoke"
  }
];
const ViewGoal = () => {
  const router = useRouter();
  const goalId = router.query.slug;
  return (
    <MainLayout
      title="View Goal | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <H2 className="mt-8">I will quit smoking</H2>
      <P>Staked amount: S$300</P>
      <Badge variant="pending" className="w-fit">
        In progress
      </Badge>
      <span className="mt-4">
        <Progress value={88} />
        <span className="flex w-full justify-between">
          <P className="text-slate-500 text-sm">19 Dec, 2024</P>
          <P className="text-slate-500 text-sm">20 Feb, 2025</P>
        </span>
      </span>
      <p className="text-sm text-slate-500">
        Beneficiary: Singapore Cancer Society
      </p>
      <hr className="h-px my-8 max-w-screen-xl bg-gray-200 border-0" />
      <H3 className="mb-8">Journal</H3>
      <div className="space-y-6">
        {journalEntries.map((entry, index) => (
          <>
            <div key={index} className="flex space-x-4 items-start">
              <Avatar className="w-12 h-12">
                <AvatarImage src={entry.avatar} alt={entry.username} />
                <AvatarFallback>{entry.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{entry.username}</span>
                <span className="text-sm text-gray-500">{entry.date}</span>
                <P className="mt-2">{entry.comment}</P>
              </div>
            </div>
            <hr className="w-full border-gray-200" />
          </>
        ))}
      </div>
      <Button className="w-fit mt-8" variant="destructive">
        Quit
      </Button>
    </MainLayout>
  );
};

export default ViewGoal;
