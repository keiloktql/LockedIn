import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/Chart";
import { createClient } from "@/utils/supabase/component";

const chartData = [
  { month: "September", balance: 4002 },
  { month: "October", balance: 4554 },
  { month: "November", balance: 5088 },
  { month: "December", balance: 6103.4 },
  { month: "January", balance: 7110.2 },
  { month: "February", balance: 8127 }
];
const chartConfig = {
  balance: {
    label: "Balance",
    color: "#4338ca"
  }
};

const Dashboard = () => {
  const router = useRouter();
  const supabaseClient = createClient();
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const { data: data1, error: error1 } =
        await supabaseClient.auth.getUser();
      console.log(error1);
      console.log(data1);
      const { data: data2, error: error2 } = await supabaseClient
        .from("goals")
        .select()
        .eq("user_id", data1.user.id)
        .order("created_at", { ascending: false });
      console.log(data2);
      setData(data2);
    })();
  }, []);
  return (
    <MainLayout
      title="Dashboard | LockedIn"
      className="flex flex-col pb-20 max-w-screen-xl w-full mx-auto px-6 sm:px-16 bg-bg-hero bg-contain bg-no-repeat"
    >
      <span className="mb-4">
        <H2 className="text-indigo-700">S$5,127</H2>
        <p className="text-sm font-medium text-slate-300">Current Balance</p>
        <span className="flex gap-1">
          <p className="text-xs font-bold text-green-800">+0.52%</p>
          <p className="text-xs text-slate-400">this month</p>
        </span>

        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart accessibilityLayer data={chartData} margin={{}}>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-balance)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-balance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="balance"
              type="natural"
              fill="url(#fillBalance)"
              fillOpacity={0.4}
              stroke="var(--color-balance)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <span className="gap-2 mb-4 grid grid-cols-3 mt-4">
          <Stats
            title="Total Amt Staked"
            data="S$5,000"
            textColor="text-indigo-700"
            icon={<CircleDollarSign className="h-6 w-6 text-[#e4e4e7]" />}
          />
          <Stats
            title="% of goals completed"
            data="60%"
            textColor="text-indigo-700"
            icon={<Medal className="h-6 w-6 text-[#e4e4e7]" />}
          />
          <Stats
            title="P/L"
            data="+2.54%"
            textColor="text-green-700"
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
              <Button
                onClick={() => router.push("/dashboard/event/quit-smoking")}
              >
                More info
              </Button>
            </CardHeader>
          </Card>
        </span>
      </span>

      <hr className="h-px max-w-screen-xl bg-gray-200 border-0" />
      <span className="my-8">
        <span className="flex justify-between w-full">
          <H2>Your Goals</H2>
          <Button onClick={() => router.push("/dashboard/create-goal")}>
            Create Goal
          </Button>
        </span>

        <span className="grid mt-4 grid-cols-2 gap-2">
          {data.map((oneData, index) => (
            <Link key={index} href={`/dashboard/goal/${oneData.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{oneData.description}</CardTitle>
                  <CardDescription>
                    Staked amount: S${oneData.stake_amount}
                  </CardDescription>
                  <span>
                    <Progress
                      value={
                        ((new Date() - new Date(oneData?.start_date)) /
                          (new Date(oneData?.end_date) -
                            new Date(oneData?.start_date))) *
                        100
                      }
                    />
                    <span className="flex w-full justify-between">
                      <P className="text-slate-500 text-sm">
                        {oneData.start_date}
                      </P>
                      <P className="text-slate-500 text-sm">
                        {oneData.end_date}
                      </P>
                    </span>
                  </span>
                  <CardDescription>
                    Beneficiary: {oneData.beneficiary}
                  </CardDescription>
                  <Badge variant="pending" className="w-fit">
                    In progress
                  </Badge>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </span>
      </span>
    </MainLayout>
  );
};

export default Dashboard;
