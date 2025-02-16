import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
              <div className="grid grid-cols-12">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Soccer </SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
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
          <AlertDialogTitle className="text-black">Have you confirmed the payment?</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm the payment to complete the transaction in the new tab.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="text-black">No</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Home() {
  // Initialize the global form with default values
  const methods = useForm({
    defaultValues: {
      name: "",
      commitmentFrequency: "Weekly",
      description: "",
      commitmentStartDate: "",
      commitmentEndDate: "",
      recipientOfStakes: "Anti-Charity"
    }
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [goalId, setGoalId] = React.useState("");
  async function onSubmit(data) {
    // axios post to api /api/goal
    let jsonObj = {}
    jsonObj["userId"] = "ec99f125-700f-4620-b8a2-eeca29ef21e1"
    jsonObj["stackAmount"] = 100
    jsonObj["description"] = data.description
    jsonObj["startDate"] = data.commitmentStartDate
    jsonObj["endDate"] = data.commitmentEndDate
    jsonObj["beneficiary"] = data.recipientOfStakes
    console.log(jsonObj)
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
    console.log(responseData.goalId) 
    setGoalId(responseData.goalId)
    setOpenDialog(true)
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
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>
                        Set the Stakes
                        <br />
                        (money is optional)
                      </CardTitle>
                      <CardDescription>
                        Put money on the line - people who do are up to 3 times
                        as successful!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h2 className="scroll-m-20 text-1xl font-extrabold tracking-tight lg:text-2xl">
                          Set the Stakes (money is optional)
                        </h2>
                      </div>
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
      <PaymentCompleteDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={() => {
        fetch(`/api/continue-grant?goalId=${goalId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        setOpenDialog(false);
        window.location.href = "/dashboard";
      }} />
    </MainLayout>
  );
}
