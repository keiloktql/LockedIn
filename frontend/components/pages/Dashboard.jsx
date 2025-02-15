import React from "react";
import MainLayout from "../layout/MainLayout";
import { H1, H2 } from "../layout/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const Dashboard = () => {
  return (
    <MainLayout>
      <H1>Hello, Le Le</H1>
      <P>It's time to lock in</P>
      <hr className="flex max-w-screen-xl mx-auto" />
      <H2>Goals</H2>
      <span>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </span>
    </MainLayout>
  );
};

export default Dashboard;
