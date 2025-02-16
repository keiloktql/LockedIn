import React, { useState } from "react";
import { H1, H2, H3, P } from "@/components/layout/Typography";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { Geist, Geist_Mono } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { json } from "drizzle-orm/mysql-core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

// (Optional) DatePickerDemo remains unchanged
export function DatePickerDemo() {
  const [date, setDate] = React.useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left items-center flex font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function GoalSelection() {
  const { register, setValue, watch } = useFormContext();
  const commitmentFrequency = watch("commitmentFrequency");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select your goal</CardTitle>
        <CardDescription>
          Create a custom goal for your commitment contract.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/** Name */}
          <div className="grid grid-cols-12">
            <Label
              htmlFor="name"
              className="col-span-4 text-left flex items-center"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Create your own goal:"
              className="col-span-7"
              {...register("name")}
            />
          </div>
          {/** Reporting Status */}
          <div className="grid grid-cols-12">
            <Label
              htmlFor="reportingStatus"
              className="col-span-4 text-left flex items-center"
            >
              Reporting Status
            </Label>
            <RadioGroup
              className="flex flex-row col-span-7"
              value={commitmentFrequency} // Bind to form state
              onValueChange={(value) => setValue("commitmentFrequency", value)} // Update form state on change
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Daily" id="r1" />
                <Label htmlFor="r1">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Weekly" id="r2" />
                <Label htmlFor="r2">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Once, at the end</Label>
              </div>
            </RadioGroup>
          </div>
          {/** Description */}
          <div className="grid grid-cols-12">
            <Label
              htmlFor="description"
              className="col-span-4 text-left flex items-center"
            >
              Description
            </Label>
            <Input
              id="description"
              placeholder="Describe your goal"
              className="col-span-7"
              {...register("description")}
            />
          </div>
          {/** Commitment Start Date */}
          <div className="grid grid-cols-12">
            <Label
              htmlFor="commitmentStartDate"
              className="col-span-4 text-left flex items-center"
            >
              Commitment Start Date
            </Label>
            <Input
              id="commitmentStartDate"
              type="date"
              className="col-span-7"
              {...register("commitmentStartDate")}
            />
          </div>
          {/** Commitment End Date */}
          <div className="grid grid-cols-12">
            <Label
              htmlFor="commitmentEndDate"
              className="col-span-4 text-left flex items-center"
            >
              Commitment End Date
            </Label>
            <Input
              id="commitmentEndDate"
              type="date"
              className="col-span-7"
              {...register("commitmentEndDate")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Staking() {
  const { register, setValue, watch } = useFormContext();

  // Get the current value of 'recipientOfStakes'
  const recipientOfStakes = watch("recipientOfStakes");
  const amountAtStake = watch("amountAtStake");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Set the Stakes
          <br />
          (money is optional)
        </CardTitle>
        <CardDescription>
          Put money on the line - people who do are up to 3 times as successful!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/** Recipient of Stakes */}
          <div className="grid grid-cols-12">
            <Label
              htmlFor="recipientOfStakes"
              className="col-span-4 text-left flex items-center"
            >
              Recipient of Stakes:
            </Label>
            <RadioGroup
              className="flex flex-row col-span-7"
              value={recipientOfStakes} // Bind to form state
              onValueChange={(value) => setValue("recipientOfStakes", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Anti-Charity" id="r1" />
                <Label htmlFor="r1">Anti-Charity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Charity" id="r2" />
                <Label htmlFor="r2">Charity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="LockedIn" id="r3" />
                <Label htmlFor="r3">LockedIn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No money at stake" id="r4" />
                <Label htmlFor="r4">No money at stake</Label>
              </div>
            </RadioGroup>
          </div>
          {/** Render recipientOfStakes value */}
          {recipientOfStakes === "Anti-Charity" && (
            <div>
              <div>
                <b>
                  Select an organization you hate. Don’t worry, we won’t tell
                  them who sent it.
                </b>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <Label
                  htmlFor="recipientOfStakes"
                  className="col-span-4 text-left flex items-center"
                >
                  Pick an anti-charity:
                </Label>
                <Select>
                  <SelectTrigger className="w-[360px]">
                    <SelectValue placeholder="Please Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Please Choose</SelectLabel>
                      <SelectItem
                        value="Better Paperwork"
                        category="Bureaucracy"
                      >
                        Bureaucracy: The Society for Better Paperwork
                      </SelectItem>
                      <SelectItem
                        value="Unnecessary Meetings"
                        category="Corporate Culture"
                      >
                        Corporate Culture: The Bureau of Unnecessary Meetings
                      </SelectItem>
                      <SelectItem
                        value="Time Waster"
                        category="Productivity Failures"
                      >
                        Productivity Failures: The National Time Waster Fund
                      </SelectItem>
                      <SelectItem
                        value="Puddle Jumpers"
                        category="Outdoor Annoyances"
                      >
                        Outdoor Annoyances: The Global Puddle Jumpers
                        Association
                      </SelectItem>
                      <SelectItem value="Soggy Pizza" category="Food Disasters">
                        Food Disasters: The Institute of Soggy Pizza
                      </SelectItem>
                      <SelectItem
                        value="Silent Alarms"
                        category="Technology Fails"
                      >
                        Technology Fails: The Silent Alarm Club
                      </SelectItem>
                      <SelectItem
                        value="Slow Traffic"
                        category="Transportation Issues"
                      >
                        Transportation Issues: The Extremely Slow Traffic
                        Initiative
                      </SelectItem>
                      <SelectItem
                        value="Oversized Sweaters"
                        category="Fashion Fails"
                      >
                        Fashion Fails: The Global Oversized Sweater Fund
                      </SelectItem>
                      <SelectItem
                        value="Unfollow Me"
                        category="Social Media Trends"
                      >
                        Social Media Trends: The Unfollow Me Project
                      </SelectItem>
                      <SelectItem
                        value="Lost Socks"
                        category="Household Mysteries"
                      >
                        Household Mysteries: The Lost Socks Rescue Team
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <H3 className="border-b mt-8">Amount at Stake be donated</H3>
            </div>
          )}
        </div>
        <div className="grid grid-cols-12 mt-8">
          <Label
            htmlFor="amountAtStake"
            className="col-span-4 text-left flex items-center"
          >
            Amount at stake for each report:
          </Label>
          <Input
            id="amountAtStake"
            className="col-span-7"
            type="number"
            step="0.01"
            min="0"
            max="1000000"
            {...register("amountAtStake")}
          />
        </div>

        <div className="">
          <br />
          <br />
          You will be billed <b>${amountAtStake}</b> for any reporting period
          if:
          <br />
          1) You report that you were unsuccessful; or
          <br />
          2) Your Referee reports that you were unsuccessful; or
          <br />
          3) You fail to make a required report by the end of the second day
          (11:59 P.M.) following a required reporting day.
          <br />
          <br />
          All Forfeited Stakes will be sent to your designated recipient (e.g.
          Charity, Friend or Foe).
          <br />
          <br />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PaymentCompleteDialog({ open, onClose, onSubmit }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Have you confirmed the payment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm the payment to complete the transaction in the new
            tab.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="text-black">
            No
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Home() {
  const [refereeEmail, setRefereeEmail] = useState([]);
  // Initialize the global form with default values
  const methods = useForm({
    defaultValues: {
      name: "I commit to Quit Smoking",
      commitmentFrequency: "Weekly",
      description: "I will not smoke a single cigarette for the next 90 days",
      commitmentStartDate: "16/02/2025",
      commitmentEndDate: "16/05/2025",
      recipientOfStakes: "Anti-Charity",
      amountAtStake: "89.23"
    }
  });
  const amountAtStake = methods.watch("amountAtStake");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [goalId, setGoalId] = React.useState("");
  async function onSubmit(data) {
    // axios post to api /api/goal
    let jsonObj = {};
    jsonObj["userId"] = "ec99f125-700f-4620-b8a2-eeca29ef21e1";
    jsonObj["stakeAmount"] = data.amountAtStake;
    jsonObj["description"] = data.description;
    jsonObj["startDate"] = data.commitmentStartDate;
    jsonObj["endDate"] = data.commitmentEndDate;
    jsonObj["beneficiary"] = data.recipientOfStakes;
    console.log(jsonObj);
    const res = await fetch("/api/goal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonObj)
    });
    const responseData = await res.json();
    console.log("Submitted Data:", responseData);
    window.open(responseData.redirect_url);
    console.log(responseData.goalId);
    setGoalId(responseData.goalId);
    setOpenDialog(true);
  }

  return (
    <MainLayout title="Create Goal | LockedIn">
      <FormProvider {...methods}>
        <div
          className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Custom Goal
              </h1>
              <h3 className="leading-7 [&:not(:first-child)]:mt-6">
                Your privacy is important to us. You can
                <a href="#"> adjust your privacy settings</a> once you’re done
                creating your Commitment Contract.
              </h3>
            </div>
            {/** Global Form wrapping GoalSelection and Staking */}
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-5">
                  <GoalSelection />
                  <Staking />
                </div>
                <div className="col-span-1">
                  {/** An informational card (optional) */}
                  <Card className="w-full flex flex-col">
                    <CardContent className="flex flex-col items-center justify-between p-6 space-y-3 text-center">
                      <div
                        key={1}
                        className="flex flex-col justify-start items-center space-y-2"
                      >
                        {/* Referee label */}
                        <div className="flex items-center space-x-2 mt-4">
                          {/* Person Logo */}
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                            <span className="text-xl">👤</span>
                          </div>
                          <H3 className="text-lg font-medium">Referee</H3>
                        </div>

                        {/* Invite friends message */}
                        <div className="flex flex-row justify-between items-center space-x-2 w-full">
                          <Input placeholder="Invite a friend" />
                          <Button
                            variant="outline"
                            onClick={() =>
                              setRefereeEmail([
                                ...refereeEmail,
                                "tkl48@gmail.com"
                              ])
                            }
                          >
                            Invite
                          </Button>
                        </div>

                        {/* Referee email list */}
                        <div className="flex flex-col space-y-2 w-full">
                          <br />
                          {refereeEmail.map((email) => (
                            <div className="my-6 w-full overflow-y-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="m-0 border-t p-0 even:bg-muted">
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="m-0 border-t p-0 even:bg-muted">
                                    <td className="p-2">{email}</td>
                                    <td className="p-2">Pending</td>
                                    <td className="p-2">
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        Resend
                                      </Button>
                                      <br />
                                      <Button
                                        variant="destructive"
                                        className="w-full"
                                      >
                                        Remove
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </div>

                        <P className="text-sm text-gray-600 mt-2">
                          This person will be your referee. They will verify if
                          you have completed your goal.
                        </P>
                      </div>
                      <P className="text-sm text-gray-600 flex-1"></P>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <span className="flex gap-2 mt-8">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </span>
            </form>
          </main>
        </div>
      </FormProvider>
      <PaymentCompleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={() => {
          fetch(`/api/continue-grant?goalId=${goalId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
          setOpenDialog(false);
          window.location.href = "/dashboard";
        }}
      />
    </MainLayout>
  );
}
