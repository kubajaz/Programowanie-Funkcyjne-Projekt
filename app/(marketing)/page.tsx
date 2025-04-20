'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/learn");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image alt="Hero" src='/banner.jpg' width={400} height={400} unoptimized />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn practice and master new skills with ChessEZ
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size={"lg"} variant={"secondary"} className="w-full">
                GET STARTED
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button size={"lg"} variant={"primaryOutline"} className="w-full">
                I ALREADY HAVE AN ACCOUNT
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[400px] rounded-2xl p-8">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">Log In</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 mt-6">
                <Button variant="super" onClick={signIn}>
                  Log in with Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
