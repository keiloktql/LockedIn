import MainLayout from "@/components/layout/MainLayout";
import { H1, H2, H3, P } from "@/components/layout/Typography";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";

import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { Users, Target } from "lucide-react"; // Importing icons

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

      <div className="flex flex-row items-center max-w-4xl text-center justify-evenly">
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

      <Button variant="outline" type="button">
        Make a Commitment
      </Button>

      Support me!
      
    </MainLayout>
  );
};

export default ViewGoal;
