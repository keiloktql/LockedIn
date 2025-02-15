import React from "react";
import MainLayout from "../layout/MainLayout";
import { H2, P } from "../layout/Typography";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Progress } from "../ui/progress";

const Dashboard = () => {
  return (
    <MainLayout
      title="Dashboard | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <span className="mb-4">
        <H2>Hello, Le Le</H2>
        <P>It's time to lock in</P>
      </span>

      <hr classname="h-px max-w-screen-xl bg-gray-200 border-0" />
      <span className="my-8">
        <H2>Events</H2>
        <span className="grid mt-4 grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <Image
                className="w-full max-h-32 rounded-md object-cover"
                src="/assets/event-hpb.jpg"
                width={250}
                height={50}
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

      <hr classname="h-px max-w-screen-xl bg-gray-200 border-0" />
      <span className="my-8">
        <H2>Your Goals</H2>
        <span className="grid mt-4 grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <CardTitle>I will quit smoking</CardTitle>
              <CardDescription>Staked amount: S$300</CardDescription>
              <span>
                <Progress value={33} />
                <span className="flex space-between">
                  <P>19 Dec, 2025</P>
                  <P>18 Jan, 2026</P>
                </span>
              </span>
            </CardHeader>
          </Card>
        </span>
      </span>
    </MainLayout>
  );
};

export default Dashboard;
