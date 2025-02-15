import { useForm, Controller } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
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
            Maintain Weight
          </h1>
          <h3 className="leading-7 [&:not(:first-child)]:mt-6">
            Your privacy is important to us. You can adjust your privacy
            settings once you’re done creating your Commitment Contract.
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex flex-col space-y-1.5"></div>
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
                    Net Weight Loss:
                  </h2>
                  <p>1.6kg</p>
                </div>
                <div>
                  <h2 className="scroll-m-20 text-1xl font-extrabold tracking-tight lg:text-2xl">
                    Weekly Weight Loss:
                  </h2>
                  <p>0.4kg</p>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <h2 className="scroll-m-20 text-1xl font-extrabold tracking-tight lg:text-2xl">
                    Report are due on
                  </h2>
                  <p>
                    You are required to report weekly:
                    <br />
                    <b>Every Saturdays</b>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
