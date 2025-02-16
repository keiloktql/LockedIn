import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/Button";
import { createClient } from "@/utils/supabase/component";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/Popover";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log(data.user);
      console.log(error);
      setUser(data.user);
    })();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
      return;
    }
    router.replace("/");
  };

  return (
    <header className="sticky left-0 top-0 z-50 h-20 w-full justify-center bg-[#ffffffb8] backdrop-blur-[20px] backdrop-saturate-[180%]">
      <div className="m-auto flex h-full w-full max-w-screen-xl justify-between px-6 sm:px-16">
        {/* 1280px */}
        <div className="w-full items-center flex">
          <Link className={`text-black text-xl font-bold`} href="/">
            <Image
              className="w-full h-[30px]"
              src="/assets/logo.png"
              width={250}
              height={100}
              alt="logo"
            />
          </Link>
        </div>
        <nav className="w-full h-full justify-between items-center hidden md:flex">
          <Link
            className="font-semibold text-gray-600 text-sm hover:underline"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>
        <span className="flex h-full items-center">
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-9 w-9 hover:opacity-60 select-none">
                  <AvatarImage
                    src="/assets/avatar-apple-kim.jpg"
                    alt="Avatar"
                  />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <Link
                  className="text-sm font-medium text-slate-900 hover:opacity-60 hover:underline"
                  href="/settings"
                >
                  Settings
                </Link>
                <p
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-900 mt-1 cursor-pointer hover:opacity-60 hover:underline"
                >
                  Logout
                </p>
              </PopoverContent>
            </Popover>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
