import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
} from "@/components/ui/popover";
import { Input } from "@/components/ui/Input";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

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

export default function Home() {
  const form = useForm({
    defaultValues: {
      weight: "",
      unit: "kg",
      height: { cm: "", feet: "", inches: "" },
      targetWeight: "", // Default value for target weight
      targetWeeks: "", // Added for weeks input
      commitmentStart: "" // Added for commitment start
    }
  });

  function onSubmit(data) {
    console.log({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
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
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Create goal</CardTitle>
                <CardDescription>
                  Create a custom goal for your commitment contract.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6">
                  {/** Name */}
                  <div className="grid grid-cols-12 ">
                    <Label
                      htmlFor="name"
                      className="col-span-4 text-left items-center flex"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Create your own goal:"
                      className="col-span-7"
                    />
                  </div>
                  {/** Reporting Status */}
                  <div className="grid grid-cols-12 gap-4">
                    <Label
                      htmlFor="commitmentFrequency"
                      className="col-span-4 text-left items-center flex"
                    >
                      Reporting Status
                    </Label>
                    <RadioGroup
                      className="flex flex-row col-span-7"
                      defaultValue="Weekly"
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
                  <div className="grid grid-cols-12 gap-4">
                    <Label
                      htmlFor="description"
                      className="col-span-4 text-left items-center flex"
                    >
                      Description
                    </Label>
                    <Input
                      id="description"
                      placeholder="Describe your goal"
                      className="col-span-7"
                    />
                  </div>
                  {/** Commitment end date */}
                  <div className="grid grid-cols-12 gap-4">
                    <Label
                      htmlFor="commitmentEndDate"
                      className="col-span-4 text-left items-center flex"
                    >
                      Commitment End Date
                    </Label>
                    <Input
                      id="commitmentEndDate"
                      type="date"
                      className="col-span-7"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-1">
            <Card className="w-full">
              <CardContent>
                <div>
                  <h2 className="scroll-m-20 text-1xl font-extrabold tracking-tight lg:text-2xl">
                    Goal category / community
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
