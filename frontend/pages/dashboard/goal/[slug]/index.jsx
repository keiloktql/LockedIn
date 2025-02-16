import MainLayout from "@/components/layout/MainLayout";
import { H2, H3, P } from "@/components/layout/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

// Example journal entry
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
    if (!goalId) return;
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("goals")
        .select()
        .eq("id", goalId);
      if (error) {
        console.error(error);
        return;
      }
      setGoal(data[0]);
    };
    fetchDetails();
  }, [goalId, supabase]);

  // Display a loading indicator until the goal is fetched
  if (!goal) {
    return (
      <MainLayout
        title="View Goal | LockedIn"
        className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16"
      >
        <p>Loading...</p>
      </MainLayout>
    );
  }

  // Calculate the progress value (percentage) based on start and end dates.
  const totalDuration = new Date(goal.end_date) - new Date(goal.start_date);
  const elapsedTime = new Date() - new Date(goal.start_date);
  const progressValue = (elapsedTime / totalDuration) * 100;

  // Define milestone pins at 33%, 66%, and 100%
  const milestones = [
    { percentage: 33, reward: "1" },
    { percentage: 66, reward: "2" },
    { percentage: 100, reward: "3" }
  ];

  return (
    <MainLayout
      title="View Goal | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <H2 className="mt-8">{goal.description}</H2>
      <P>Staked amount: S${goal.stake_amount}</P>
      <Badge variant="pending" className="w-fit">
        In progress
      </Badge>

      {/* Progress Bar with Milestone Pins */}
      <div className="mt-4">
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          {/* Filled progress portion */}
          <div
            style={{ width: `${progressValue}%` }}
            className="h-2 bg-blue-500 rounded-full"
          />
          {/* Milestone pins */}
          {milestones.map((ms, idx) => {
            const reached = ms.percentage <= progressValue;
            return (
              <div
                key={idx}
                className="absolute -top-2 -translate-x-1/2"
                style={{ left: `${ms.percentage}%` }}
              >
                <div
                  className={`flex justify-center items-center w-6 h-6 rounded-full ${
                    reached ? "bg-yellow-500" : "bg-gray-400"
                  }`}
                >
                  <span className="text-white text-sm">
                    {/** Reward icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.622 4.99a1 1 0 00.95.69h5.262c.969 0 1.371 1.24.588 1.81l-4.27 3.103a1 1 0 00-.364 1.118l1.622 4.99c.3.921-.755 1.688-1.539 1.118L10 15.347l-4.27 3.103c-.783.57-1.838-.197-1.539-1.118l1.622-4.99a1 1 0 00-.364-1.118L.46 9.417c-.783-.57-.38-1.81.588-1.81h5.262a1 1 0 00.95-.69l1.622-4.99z" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Display start and end dates */}
        <span className="flex w-full justify-between mt-2">
          <P className="text-slate-500 text-sm">
            {new Date(goal.start_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </P>
          <P className="text-slate-500 text-sm">
            {new Date(goal.end_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </P>
        </span>
      </div>

      <p className="text-sm text-slate-500">Beneficiary: {goal.beneficiary}</p>

      <hr className="h-px my-8 max-w-screen-xl bg-gray-200 border-0" />
      <H3 className="mb-8">Journal</H3>
      <div className="space-y-6">
        {journalEntries.map((entry, index) => (
          <div key={index}>
            <div className="flex space-x-4 items-start">
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
          </div>
        ))}
      </div>
      <Button className="w-fit mt-8" variant="destructive">
        Quit
      </Button>
    </MainLayout>
  );
};

export default ViewGoal;
