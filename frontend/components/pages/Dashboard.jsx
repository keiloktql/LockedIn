import React from "react";
import MainLayout from "../layout/MainLayout";
import { H2, P } from "../layout/Typography";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Progress } from "../ui/Progress";
import { useRouter } from "next/router";
import Stats from "../ui/Stats";
import { Medal, CircleDollarSign, Banknote } from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  return (
    <MainLayout
      title="Dashboard | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <span className="mb-4">
        <H2>Hello, Le Le</H2>
        <P>It's time to lock in</P>
        <span className="flex gap-2 mb-4 grid grid-cols-3">
          <Stats
            title="Total Amt Staked"
            data="S$5,000"
            icon={<CircleDollarSign className="h-6 w-6 text-[#e4e4e7]" />}
          />
          <Stats
            title="% of goals completed"
            data="23"
            icon={<Medal className="h-6 w-6 text-[#e4e4e7]" />}
          />
          <Stats
            title="Total Amt Donated"
            data="S$123"
            icon={<Banknote className="h-6 w-6 text-[#e4e4e7]" />}
          />
        </span>
      </span>

      <hr className="h-px max-w-screen-xl bg-gray-200 border-0" />
      <span className="my-8">
        <H2>Events</H2>
        <span className="grid mt-4 grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <Image
                className="w-full max-h-32 rounded-md object-cover"
                src="/assets/events-hpb.png"
                width={250}
                height={100}
                alt="image"
              />
              <CardTitle>HPB 'I quit' 28 Day Programme</CardTitle>
              <CardDescription>
                Find out more about the multi-pronged approach used by HPB to
                help smokers kick the habit and quit smoking and prevent the
                public from picking up smoking
              </CardDescription>
              <Button>More info</Button>
            </CardHeader>
          </Card>
        </span>
      </span>

      <hr className="h-px max-w-screen-xl bg-gray-200 border-0" />
      <span className="my-8">
        <span className="flex justify-between w-full">
          <H2>Your Goals</H2>
          <Button onClick={() => router.push("/create-goal")}>
            Create Goal
          </Button>
        </span>

        <span className="grid mt-4 grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <CardTitle>I will quit smoking</CardTitle>
              <CardDescription>Staked amount: S$300</CardDescription>
              <span>
                <Progress value={33} />
                <span className="flex w-full justify-between">
                  <P className="text-slate-500 text-sm">19 Dec, 2025</P>
                  <P className="text-slate-500 text-sm">18 Jan, 2026</P>
                </span>
              </span>
              <CardDescription>
                Beneficiary: Singapore Cancer Society
              </CardDescription>
            </CardHeader>
          </Card>
        </span>
      </span>
    </MainLayout>
  );
};

export default Dashboard;
