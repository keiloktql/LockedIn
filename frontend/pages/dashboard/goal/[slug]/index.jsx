import MainLayout from "@/components/layout/MainLayout";
import { H2, H3, P } from "@/components/layout/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { createClient } from "@/utils/supabase/component";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/Chart";

// {
//   "id": 36,
//   "created_at": "2025-02-16T03:04:32.724683+00:00",
//   "stake_amount": 89.23,
//   "description": "I will not smoke a single cigarette for the next 90 days",
//   "start_date": "2025-02-16",
//   "end_date": "2025-05-16",
//   "beneficiary": "Anti-Charity",
//   "continue_url": "https://auth.interledger-test.dev/continue/6f007275-59b3-414b-b2b4-8187e0c6bf8d",
//   "quoteId": "https://ilp.interledger-test.dev/quotes/0766106f-8947-4d3d-8cc3-a800c92ebd7b"
// }

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
  const supabase = createClient();
  const goalId = router.query.slug;
  const [goal, setGoal] = React.useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("goals")
        .select()
        .eq("id", goalId);
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setGoal(data[0]);
    };
    fetchDetails();
  }, [goalId]);

  return (
    <MainLayout
      title="View Goal | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <H2 className="mt-8">{goal?.description}</H2>
      <P>Staked amount: S${goal?.stake_amount}</P>
      <Badge variant="pending" className="w-fit">
        In progress
      </Badge>
      <span className="mt-4">
        <Progress
          value={
            ((new Date() - new Date(goal?.start_date)) /
              (new Date(goal?.end_date) - new Date(goal?.start_date))) *
            100
          }
        />
        <span className="flex w-full justify-between">
          <P className="text-slate-500 text-sm">
            {new Date(goal?.start_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </P>
          <P className="text-slate-500 text-sm">
            {new Date(goal?.end_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </P>
        </span>
      </span>
      <p className="text-sm text-slate-500">Beneficiary: {goal?.beneficiary}</p>

      {/** Now i want you to create milestones every 1/3 of the way use @/components/ui/Chart */}


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
