import MainLayout from "@/components/layout/MainLayout";
import { H1, H2, H3, P } from "@/components/layout/Typography";
import { Progress } from "@/components/ui/Progress";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/Carousel";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { Users, Target } from "lucide-react"; // Importing icons

const CardArray = [
  {
    avatar: "/assets/avatar-adjua-forrest.jpg",
    commitment: "I commit to: quit smoking for good.",
    name: "AdjuaForrest"
  },
  {
    avatar: "/assets/avatar-bryan-no-smoke.jpg",
    commitment:
      "I commit to: switch from smoking to nicotine-free alternatives before quitting completely.",
    name: "BryanNoSmoke"
  },
  {
    avatar: "/assets/avatar-charlie-less-smoke.jpg",
    commitment: "I commit to: reduce my cigarette intake daily.",
    name: "CharlieLessSmoke"
  },
  {
    avatar: "/assets/avatar-dana-nicotine-free.jpg",
    commitment: "I commit to: stay smoke-free for 30 days.",
    name: "DanaNicotineFree"
  },
  {
    avatar: "/assets/avatar-ethan-support.jpg",
    commitment: "I commit to: join a smoking cessation programme.",
    name: "EthanSupport"
  },
  {
    avatar: "/assets/avatar-fiona-healthy-lungs.jpg",
    commitment:
      "I commit to: track my health improvements after quitting smoking.",
    name: "FionaHealthyLungs"
  },
  {
    avatar: "/assets/avatar-greg-savings.jpg",
    commitment:
      "I commit to: save the money I used to spend on cigarettes and put it towards my CPF savings.",
    name: "GregSavings"
  },
  {
    avatar: "/assets/avatar-hannah-breathe-free.jpg",
    commitment:
      "I commit to: replace smoking with outdoor activities like brisk walking at East Coast Park.",
    name: "HannahBreatheFree"
  }
];

const journalEntries = [
  {
    avatar: "/assets/avatar-adjua-forrest.jpg",
    username: "notandy",
    date: "Feb 16, 2025, 8:58 AM",
    comment:
      "Day 1 Let's Go! I'm excited to take control and commit to living a healthier lifestyle!",
    commitmentLink: "/commitments/adjua-forrest"
  },
  {
    avatar: "/assets/avatar-bryan-no-smoke.jpg",
    username: "smokefreebrandon",
    date: "Feb 16, 2025, 9:10 AM",
    comment:
      "Excited to start my journey! No more cigarettes and no more stress!",
    commitmentLink: "/commitments/bryan-no-smoke"
  },
  {
    avatar: "/assets/avatar-charlie-less-smoke.jpg",
    username: "charlielesssmoke",
    date: "Feb 16, 2025, 9:30 AM",
    comment:
      "I'm cutting down one cigarette at a time. It's not easy, but I will stay strong.",
    commitmentLink: "/commitments/charlie-less-smoke"
  },
  {
    avatar: "/assets/avatar-dana-nicotine-free.jpg",
    username: "dananicotinefree",
    date: "Feb 16, 2025, 10:00 AM",
    comment:
      "30 days free from nicotine is my goal! Can't wait to see the benefits.",
    commitmentLink: "/commitments/dana-nicotine-free"
  },
  {
    avatar: "/assets/avatar-ethan-support.jpg",
    username: "ethansupport",
    date: "Feb 16, 2025, 10:30 AM",
    comment:
      "Joining a support group is my way of staying motivated. I believe in the power of community!",
    commitmentLink: "/commitments/ethan-support"
  },
  {
    avatar: "/assets/avatar-fiona-healthy-lungs.jpg",
    username: "fionahealthylungs",
    date: "Feb 16, 2025, 11:00 AM",
    comment:
      "Tracking my health is key to staying on track. I'm looking forward to better lung function!",
    commitmentLink: "/commitments/fiona-healthy-lungs"
  },
  {
    avatar: "/assets/avatar-greg-savings.jpg",
    username: "gregsavings",
    date: "Feb 16, 2025, 11:30 AM",
    comment:
      "I’m saving money every day by quitting. I plan to use it for something special!",
    commitmentLink: "/commitments/greg-savings"
  },
  {
    avatar: "/assets/avatar-hannah-breathe-free.jpg",
    username: "hannahbreathefree",
    date: "Feb 16, 2025, 12:00 PM",
    comment:
      "Replacing smoking with outdoor activities. Fresh air feels so much better!",
    commitmentLink: "/commitments/hannah-breathe-free"
  }
];

const ViewGoal = () => {
  const router = useRouter();
  const goalId = router.query.slug;
  return (
    <MainLayout
      title="HPB 'I quit' 28 Day Programme | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <Image
        src="/assets/quit-smoking.png"
        alt="Quit Smoking"
        layout="responsive"
        width={500}
        height={300}
      />
      <br />
      <div className="flex flex-row items-center text-center justify-evenly">
        <div className="flex flex-col items-center space-y-2">
          <Users className="w-36 h-36 text-gray-700 -ml-8" />{" "}
          {/* Moves icon more to the left */}
          <H1 className="text-xl font-semibold">103K</H1>
          <span className="text-sm text-gray-500">Participants</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Target className="w-36 h-36 text-gray-700 -mr-8" />{" "}
          {/* Moves icon more to the right */}
          <H1 className="text-xl font-semibold">425K</H1>
          <span className="text-sm text-gray-500">Successful Reports</span>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/dashboard/create-goal")}
        >
          <H3>
            <b>Pledge your Commitment!</b>
          </H3>
        </Button>
      </div>
      <H2 className="mt-8 mb-8">Who's in this with you</H2>
      <Carousel
        className="w-full"
        opts={{
          align: "start"
        }}
      >
        <CarouselContent className="-ml-1">
          {CardArray.map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1 h-full">
                <Card className="h-full flex flex-col">
                  <CardContent className="flex flex-col items-center justify-between h-full aspect-square p-6 space-y-3 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-12 w-12 hover:opacity-60 select-none">
                        <AvatarImage src={_.avatar} alt={_.name} />
                        <AvatarFallback>{_.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-lg font-semibold">{_.name}</span>
                    </div>
                    <P className="text-sm text-gray-600 flex-1">
                      {_.commitment}
                    </P>
                    <Button variant="outline" type="button" className="w-full">
                      Support them!
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <H2 className="mt-8 mb-8">Community Journal: Exercise & Fitness</H2>
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
                <Button
                  variant="link"
                  className="mt-2 p-0 text-blue-500 justify-start "
                  href={entry.commitmentLink}
                >
                  View my Commitment
                </Button>
              </div>
            </div>
            <hr className="w-full border-gray-200" />
          </>
        ))}
      </div>
    </MainLayout>
  );
};

export default ViewGoal;
